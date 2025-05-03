module.exports = function makeGetAllTaskList({
    Task,
    UnknownError,
}) {
    return async function getAllTaskList({
        fields,
        filter = {},
        skip,
        limit,
        orderBy,
        sortBy,
        logger,
    }) {
        logger.debug(`
            @********************getAllTaskList******************
            @filter: ${JSON.stringify(filter)}
            @skip: ${skip}
            @limit: ${limit}
            @sortBy: ${sortBy}
            @orderBy: ${orderBy}
        `);

        try {
            const total_count = await Task.countDocuments(filter);

            const taskList = await Task.find(filter)
                .select(fields?.length ? fields.join(' ') : '')
                .sort({ [sortBy]: parseInt(orderBy) })
                .skip(skip)
                .limit(limit)

            return { total_count, data: taskList || [] }
        } catch (err) {
            logger.debug(err);
            throw new UnknownError();
        }
    };
};
