module.exports = function makeCheckEmailAlreadyExists({
    User,
    UnknownError,
}) {
    return async function checkEmailAlreadyExists({
        email,
        logger,
    }) {
        try {
            return await User.findOne({ email })
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }
}