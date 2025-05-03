module.exports = function makeVerifyUser({
    User,
    Joi,
    UnknownError,
    ValidationError,
}) {
    return async function verifyUser({
        userId,
        fields = [],
        logger,
    }) {
        logger.debug(`
            @*************verifyUser*************
            @userId : ${userId}
        `)

        validateProjectId({ userId })

        try {
            return await User.findById(userId).select(fields ? fields.join(' ') : '');
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateProjectId({ userId }) {
        const schema = Joi.object().keys({
            userId: Joi.string().guid().required().label('userId'),
        });
        const { error } = schema.validate({ userId });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}