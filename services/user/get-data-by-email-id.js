module.exports = function makeGetDataByEmailId({
    User,
    UnknownError,
}) {
    return async function getDataByEmailId({
        email,
        logger,
    }) {
        try {
            const user = await User.findOne({ email }).select('+password'); // Explicitly include password

            if (!user) {
                return null;
            }
            return user
        } catch (err) {
            logger.debug(err);
            throw new UnknownError();
        }
    }
}