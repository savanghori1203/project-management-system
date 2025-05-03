module.exports = function makeLoginUser({
    User,
    getDataByEmailId,
    decryptPassword,
    UnknownError,
    ValidationError,
    AuthenticationFailed,
    Joi,
}) {
    return async function loginUser({
        userDetail,
        logger,
    }) {
        logger.debug(`
        @*********************logInUser******************
        @userDetail : ${JSON.stringify(userDetail)}
        `)

        validateUserDetail({
            email: userDetail.email,
            password: userDetail.password
        })

        const userData = await getDataByEmailId({
            email: userDetail.email.trim(),
            logger,
        })

        if (!userData) {
            throw new AuthenticationFailed('PA-00012', 'Invalid username and password')
        }

        let decryptPass
        if (userData && userData.password) {
            decryptPass = await decryptPassword(userData.password)
        }

        if (decryptPass !== userData.password) {
            throw new AuthenticationFailed('PA-00012', 'Invalid username and password')
        }

        return true
    }

    function validateUserDetail({ email, password }) {
        const schema = Joi.object().keys({
            email: Joi.string().email().trim().required().label('email'),
            password: Joi.string().trim().required(),
        });
        const { error } = schema.validate({ email, password });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}