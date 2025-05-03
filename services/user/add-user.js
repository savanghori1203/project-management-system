module.exports = function makeAddUser({
    User,
    encryptPassword,
    checkEmailAlreadyExists,
    Joi,
    UnknownError,
    AlreadyExistsError,
    ValidationError,
    PASSWORD_REGEX,
}) {
    return async function addUser({
        userData,
        logger,
    }) {

        logger.debug(`
            @*******************addUser******************
            @ userData: ${JSON.stringify(userData)}
        `)

        validateUserInputData({
            firstName: userData.first_name,
            lastName: userData.last_name,
            email: userData.email,
            password: userData.password,
        })

        for (let [key, value] of Object.entries(userData)) {
            userData[key] = value.trim()
        }

        const userDetail = await checkEmailAlreadyExists({
            email: userData.email,
            logger,
        })

        if (userDetail) {
            throw new AlreadyExistsError('PA-00011', 'Email already exist!')
        }

        const encryptedPassword = await encryptPassword(userData.password);
        userData['password'] = encryptedPassword

        try {
            const user = new User(userData)
            return await user.save()
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateUserInputData({ firstName, lastName, email, password }) {
        const schema = Joi.object({
            firstName: Joi.string().trim().min(1).max(20).required().label('first_name'),
            lastName: Joi.string().trim().min(1).max(20).optional().allow('', null).label('last_name'),
            email: Joi.string().email().trim().required(),
            password: Joi.string().trim()
                .regex(PASSWORD_REGEX).required(),
        });
        const { error } = schema.validate({ firstName, lastName, email, password });
        if (error) {
            throw new ValidationError('EX-00002', error.message);
        }
        return true;
    }
}