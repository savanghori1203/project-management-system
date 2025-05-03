module.exports = function makeGetAllProjectList({
    Project,
    UnknownError,
}) {
    return async function getAllProjectList({
        fields,
        logger,
    }) {
        logger.debug(`
            @********************getAllProjectList******************
        `)
        try {
            const projectDetailList = await Project.find().select(fields?.length ? fields.join(' ') : '');
            return projectDetailList || [];
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }
}