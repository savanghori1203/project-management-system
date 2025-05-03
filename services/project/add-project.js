module.exports = function makeAddProject({
    Project,
    checkNameAlreadyExists,
    generateRandomString,
    Joi,
    UnknownError,
    AlreadyExistsError,
    ValidationError,
}) {
    return async function addProject({
        projectDetail,
        logger,
    }) {

        logger.debug(`
            @*******************addProject******************
            @ projectDetail: ${JSON.stringify(projectDetail)}
        `)

        validateProjectInput({
            name: projectDetail.name,
            organizationId: projectDetail.organization_id,
            description: projectDetail.description
        })

        const existingProject = await checkNameAlreadyExists({
            name: projectDetail.name,
            logger
        })

        if (existingProject) {
            throw new AlreadyExistsError('PA-00008', 'Project name already exists')
        }

        const projectLink = generateRandomString()

        projectDetail['project_link'] = projectLink

        if (projectDetail && projectDetail.name) {
            projectDetail['name'] = projectDetail.name.trim()
        }

        try {
            const project = new Project(projectDetail)
            return await project.save()
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateProjectInput({ name, organizationId, description }) {
        const schema = Joi.object().keys({
            name: Joi.string().required().trim().label('name'),
            organizationId: Joi.string().guid().required().label('organizationId'),
            description: Joi.string().optional().label('description').allow('', null),
        });

        const { error } = schema.validate({ name, organizationId, description });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}