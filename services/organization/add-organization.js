module.exports = function makeAddOrganization({
    Organization,
    checkNameAlreadyExists,
    generateRandomString,
    Joi,
    UnknownError,
    AlreadyExistsError,
    ValidationError,
}) {
    return async function addOrganization({
        organizationDetail,
        logger,
    }) {

        logger.debug(`
            @*******************addOrganization******************
            @ organizationDetail: ${JSON.stringify(organizationDetail)}
        `)

        validateOrganizationInput({
            name: organizationDetail.name,
        })

        const existingOrganization = await checkNameAlreadyExists({
            name: organizationDetail.name.trim(),
            logger
        })

        if (existingOrganization) {
            throw new AlreadyExistsError('PA-00013', 'Organization name already exists')
        }

        const linkName = generateRandomString()

        organizationDetail['link_name'] = linkName

        if (organizationDetail && organizationDetail.name) {
            organizationDetail['name'] = organizationDetail.name.trim()
        }

        try {
            const organization = new Organization(organizationDetail)
            return await organization.save()
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateOrganizationInput({ name }) {
        const schema = Joi.object().keys({
            name: Joi.string().required().trim().label('name'),
        });

        const { error } = schema.validate({ name });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}