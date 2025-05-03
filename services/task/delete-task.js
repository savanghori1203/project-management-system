module.exports = function makeDeleteTask({
    Task,
    getTaskById,
    Joi,
    UnknownError,
    ValidationError,
}) {
    return async function deleteTask({
        taskId,
        logger,
    }) {
        logger.debug(`
            @***************deleteTask***********
            @taskId : ${taskId}
            `)

        validateProjectId({ taskId })

        await getTaskById({
            taskId,
            logger,
        })

        try {
            return await Task.findByIdAndDelete(taskId)
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
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
