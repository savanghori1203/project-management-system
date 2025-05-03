module.exports = function makePatchOnUserData({
    User,
    checkEmailAlreadyExists,
    encryptPassword,
    getUserById,
    Joi,
    UnknownError,
    ValidationError,
    AlreadyExistsError,
    PASSWORD_REGEX,
}) {
    return async function patchOnUserData({
        userId,
        userDetail,
        logger,
    }) {

        logger.debug(`
            @*****************patchOnUserData***************
            @userId : ${userId}
            @userDetail : ${JSON.stringify(userDetail)}`)

        validateUserDetail({
            userId,
            firstName: userDetail.first_name,
            lastName: userDetail.last_name,
            email: userDetail.email,
            password: userDetail.password,
        })

        await getUserById({
            userId,
            logger,
        })

        for (let [key, value] of Object.entries(userDetail)) {
            userDetail[key] = value.trim()
        }

        if (userDetail && userDetail.email) {
            const userData = await checkEmailAlreadyExists({
                email: userDetail.email,
                logger,
            })

            if (userData) {
                throw new AlreadyExistsError('PA-00011', 'Email already exist!')
            }
        }

        if (userDetail && userDetail.password) {
            const password = userDetail.password.trim()

            const encryptedPassword = await encryptPassword(password);
            userDetail['password'] = encryptedPassword
        }

        try {
            return await User.findByIdAndUpdate(userId, { $set: userDetail }, { new: true });
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateUserDetail({ userId, firstName, lastName, email, password }) {
        const schema = Joi.object().keys({
            userId: Joi.string().guid().required().label('userId'),
            firstName: Joi.string().trim().min(1).max(20).optional().label('first_name'),
            lastName: Joi.string().trim().min(1).max(20).optional().allow('', null).label('last_name'),
            email: Joi.string().email().trim().optional(),
            password: Joi.string().trim()
                .regex(PASSWORD_REGEX).optional(),
        });
        const { error } = schema.validate({ userId, firstName, lastName, email, password });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}