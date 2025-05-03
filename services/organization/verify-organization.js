module.exports = function makeVerifyOrganization({
    Organization,
    Joi,
    UnknownError,
    ValidationError,
}) {
    return async function verifyOrganization({
        organizationId,
        fields = [],
        logger,
    }) {
        logger.debug(`
            @*************verifyOrganization*************
            @organizationId : ${organizationId}
        `)

        validateOrganizationId({ organizationId })

        try {
            return await Organization.findById(organizationId).select(fields ? fields.join(' ') : '');
        } catch (err) {
            logger.debug(err)
            throw UnknownError()
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