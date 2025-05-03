module.exports = function makeDeleteOrganization({
    Organization,
    getOrganizationById,
    Joi,
    UnknownError,
    ValidationError,
}) {
    return async function deleteOrganization({
        organizationId,
        logger,
    }) {
        logger.debug(`
            @***************deleteOrganization***********
            @organizationId : ${organizationId}
            `)

        validateOrganizationId({ organizationId })

        await getOrganizationById({
            organizationId,
            logger,
        })

        try {
            return await Organization.findByIdAndDelete(organizationId)
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateOrganizationId({ organizationId }) {
        const schema = Joi.object().keys({
            organizationId: Joi.string().guid().required().label('organizationId'),
        });
        const { error } = schema.validate({ organizationId });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}
