module.exports = function makeUpdateProject({
    Project,
    checkNameAlreadyExists,
    getProjectById,
    Joi,
    UnknownError,
    ValidationError,
    AlreadyExistsError,
    ObjectNotFoundError,
}) {
    return async function updateProject({
        projectId,
        projectDetail,
        logger
    }) {

        logger.debug(`
            @**********************updateProject*******************
            @projectId : ${projectId}
            @projectDetail: ${JSON.stringify(projectDetail)}
            `)

        validateProjectDetail({
            projectId,
            name: projectDetail.name,
            description: projectDetail.description
        })

        await getProjectById({
            projectId,
            logger
        })

        const existingProject = await checkNameAlreadyExists({
            name: projectDetail.name.trim(),
            logger,
        })

        if (existingProject) {
            throw new AlreadyExistsError('PA-00008', 'Project name already exists')
        }

        if (projectDetail && projectDetail.name) {
            projectDetail['name'] = projectDetail.name.trim()
        }

        try {
            return await Project.findByIdAndUpdate(projectId, projectDetail, { new: true })
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateProjectDetail({ projectId, name, description }) {
        const schema = Joi.object().keys({
            projectId: Joi.string().guid().required().label('projectId'),
            name: Joi.string().required().trim().label('name'),
            description: Joi.string().required().label('description'),
        });
        const { error } = schema.validate({ projectId, name, description });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}