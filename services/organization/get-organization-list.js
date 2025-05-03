module.exports = function makeGetAllOrganizationList({
    Organization,
    UnknownError,
}) {
    return async function getAllOrganizationList({
        fields,
        logger,
    }) {
        logger.debug(`
            @********************getAllOrganizationList******************
        `)
        try {
            const organizationList = await Organization.find().select(fields?.length ? fields.join(' ') : '');
            return organizationList || [];
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }
}