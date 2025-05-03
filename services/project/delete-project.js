module.exports = function makeDeleteProject({
    Project,
    getProjectById,
    Joi,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
}) {
    return async function deleteProject({
        projectId,
        logger,
    }) {
        logger.debug(`
            @***************deleteProject***********
            @projectId : ${projectId}
            `)

        validateProjectId({ projectId })

        await getProjectById({
            projectId,
            logger,
        })

        try {
            return await Project.findByIdAndDelete(projectId)
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
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
