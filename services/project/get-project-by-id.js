module.exports = function makeGetProjectById({
    Project,
    Joi,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
}) {
    return async function getProjectById({
        projectId,
        fields = [],
        logger,
    }) {
        logger.debug(`
            @*************getProjectById*************
            @projectId : ${projectId}
        `)

        validateProjectId({ projectId })

        let projectDetail
        try {
            projectDetail = await Project.findById(projectId).select(fields ? fields.join(' ') : '');

        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
        if (!projectDetail) {
            throw new ObjectNotFoundError('PA-00009', 'Project does not exists.');
        }

        return projectDetail
    }

    function validateProjectId({ projectId }) {
        const schema = Joi.object().keys({
            projectId: Joi.string().guid().required().label('projectId'),
        });
        const { error } = schema.validate({ projectId });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}