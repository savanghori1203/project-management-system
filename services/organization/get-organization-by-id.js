module.exports = function makeGetOrganizationById({
    Organization,
    Joi,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
}) {
    return async function getOrganizationById({
        organizationId,
        fields = [],
        logger,
    }) {
        logger.debug(`
            @*************getOrganizationById*************
            @organizationId : ${organizationId}
        `)

        validateOrganizationId({ organizationId })

        let organizationDetail
        try {
            organizationDetail = await Organization.findById(organizationId).select(fields ? fields.join(' ') : '');

        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
        if (!organizationDetail) {
            throw new ObjectNotFoundError('PA-00014', 'Organization does not exists.');
        }

        return organizationDetail
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