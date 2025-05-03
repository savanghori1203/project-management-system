module.exports = function makeGetUserById({
    User,
    Joi,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
}) {
    return async function getUserById({
        userId,
        fields = [],
        logger,
    }) {
        logger.debug(`
            @*************getUserById*************
            @userId : ${userId}
        `)

        validateUserId({ userId })

        let userDetail
        try {
            userDetail = await User.findById(userId).select(fields ? fields.join(' ') : '');

        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
        if (!userDetail) {
            throw new ObjectNotFoundError('PA-00010', 'User does not exists.');
        }

        return userDetail
    }

    function validateUserId({ userId }) {
        const schema = Joi.object().keys({
            userId: Joi.string().uuid().required().label('userId'),
        });
        const { error } = schema.validate({ userId });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}