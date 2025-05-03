module.exports = function makePatchOnProjectData({
    Project,
    checkNameAlreadyExists,
    getProjectById,
    Joi,
    UnknownError,
    ValidationError,
    AlreadyExistsError,
    ObjectNotFoundError,
}) {
    return async function patchOnProjectData({
        projectId,
        projectDetail,
        logger,
    }) {

        logger.debug(`
            @*****************patchOnProjectData***************
            @projectId : ${projectId}
            @projectDetail : ${JSON.stringify(projectDetail)}`)

        validateProjectDetail({
            projectId,
            name: projectDetail.name,
            description: projectDetail.description
        })

        await getProjectById({
            projectId,
            logger,
        })


        if (projectDetail && projectDetail.name) {

            projectDetail['name'] = projectDetail.name.trim()

            const existingProject = await checkNameAlreadyExists({
                name: projectDetail.name,
                logger,
            })
            if (existingProject) {
                throw new AlreadyExistsError('PA-00008', 'Project name already exists')
            }
        }

        try {
            return await Project.findByIdAndUpdate(projectId, { $set: projectDetail }, { new: true });
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateProjectDetail({ projectId, name, description }) {
        const schema = Joi.object().keys({
            projectId: Joi.string().guid().required().label('projectId'),
            name: Joi.string().optional().trim().label('name'),
            description: Joi.string().optional().label('description'),
        });
        const { error } = schema.validate({ projectId, name, description });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}