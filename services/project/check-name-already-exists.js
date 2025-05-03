module.exports = function makeCheckNameAlreadyExists({
    Project,
    UnknownError,
}) {
    return async function checkNameAlreadyExists({
        name,
        logger,
    }) {
        try {
            return await Project.findOne({ name })
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }
}