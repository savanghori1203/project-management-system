module.exports = function makeVerifyProject({
    Project,
    Joi,
    UnknownError,
    ValidationError,
}) {
    return async function verifyProject({
        projectId,
        fields = [],
        logger,
    }) {
        logger.debug(`
            @*************verifyProject*************
            @projectId : ${projectId}
        `)

        validateProjectId({ projectId })

        try {
            return await Project.findById(projectId).select(fields ? fields.join(' ') : '');
        } catch (err) {
            logger.debug(err)
            throw UnknownError()
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