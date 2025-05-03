module.exports = function makeGetAllUserList({
    User,
    UnknownError,
}) {
    return async function getAllUserList({
        fields,
        logger,
    }) {
        logger.debug(`
            @********************getAllUserList******************
        `)
        try {
            const userList = await User.find().select(fields?.length ? fields.join(' ') : '');
            return userList || [];
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }
}