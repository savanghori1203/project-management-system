module.exports = function makeCheckNameAlreadyExists({
    Organization,
    UnknownError,
}) {
    return async function checkNameAlreadyExists({
        name,
        logger,
    }) {
        try {
            return await Organization.findOne({ name })
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }
}