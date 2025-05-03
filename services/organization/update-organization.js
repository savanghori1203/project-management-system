module.exports = function makeUpdateOrganization({
    Organization,
    checkNameAlreadyExists,
    getOrganizationById,
    Joi,
    UnknownError,
    ValidationError,
    AlreadyExistsError,
}) {
    return async function updateOrganization({
        organizationId,
        organizationDetail,
        logger,
    }) {

        logger.debug(`
            @*****************updateOrganization***************
            @organizationId : ${organizationId}
            @organizationDetail : ${JSON.stringify(organizationDetail)}`)

        validateOrganizationDetail({
            organizationId,
            name: organizationDetail.name,
        })

        await getOrganizationById({
            organizationId,
            logger,
        })

        if (organizationDetail && organizationDetail.name) {

            organizationDetail['name'] = organizationDetail.name.trim()

            const existingOrganization = await checkNameAlreadyExists({
                name: organizationDetail.name,
                logger,
            })
            if (existingOrganization) {
                throw new AlreadyExistsError('PA-00013', 'Organization name already exists')
            }
        }

        try {
            return await Organization.findByIdAndUpdate(organizationId, { $set: organizationDetail }, { new: true });
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateOrganizationDetail({ organizationId, name }) {
        const schema = Joi.object().keys({
            organizationId: Joi.string().guid().required().label('organizationId'),
            name: Joi.string().optional().trim().label('name'),
        });
        const { error } = schema.validate({ organizationId, name });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}