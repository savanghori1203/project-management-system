module.exports = function makeDeleteUser({
    User,
    getUserById,
    Joi,
    UnknownError,
    ValidationError,
}) {
    return async function deleteUser({
        userId,
        logger,
    }) {
        logger.debug(`
            @***************deleteUser***********
            @userId : ${userId}
            `)

        validateUserId({ userId })

        await getUserById({
            userId,
            logger,
        })

        try {
            return await User.findByIdAndDelete(userId)
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateUserId({ userId }) {
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
