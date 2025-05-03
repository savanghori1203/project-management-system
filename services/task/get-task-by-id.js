module.exports = function makeGetTaskById({
    Task,
    Joi,
    UnknownError,
    ValidationError,
    ObjectNotFoundError,
}) {
    return async function getTaskById({
        taskId,
        fields = [],
        logger,
    }) {
        logger.debug(`
            @*************getTaskById*************
            @taskId : ${taskId}
        `)

        validateProjectId({ taskId })

        let taskDetail
        try {
            taskDetail = await Task.findById(taskId).select(fields ? fields.join(' ') : '');

        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
        if (!taskDetail) {
            throw new ObjectNotFoundError('PA-00017', 'Task does not exists.');
        }

        return taskDetail
    }

    function validateProjectId({ taskId }) {
        const schema = Joi.object().keys({
            taskId: Joi.string().guid().required().label('taskId'),
        });
        const { error } = schema.validate({ taskId });
        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}