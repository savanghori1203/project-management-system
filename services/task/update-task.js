module.exports = function makeUpdateTask({
    Task,
    Joi,
    getTaskById,
    validStatus,
    validPriority,
    UnknownError,
    ValidationError,
}) {
    return async function updateTask({
        taskId,
        taskDetail,
        logger,
    }) {

        logger.debug(`
            @*****************updateTask***************
            @taskId : ${taskId}
            @taskDetail : ${JSON.stringify(taskDetail)}`)

        validateTaskInput({
            taskId,
            projectId: taskDetail.project_id,
            organizationId: taskDetail.organization_id,
            title: taskDetail.title,
            description: taskDetail.description,
            status: taskDetail.status,
            priority: taskDetail.priority,
            assignedEngineerId: taskDetail.assigned_engineer_id,
            assignedBy: taskDetail.assigned_by,
            dueDate: taskDetail.due_date,
            estimatedHours: taskDetail.estimated_hours,
            actualHours: taskDetail.actual_hours,
            dependencies: taskDetail.dependencies,
            comments: taskDetail.comments,
            attachments: taskDetail.attachments,
            taskTags: taskDetail.task_tags,
            reminders: taskDetail.reminders
        });

        //don't update the project and organization id 
        if (taskDetail) {
            if (taskDetail.project_id) {
                delete taskDetail.project_id;
            }
            if (taskDetail.organization_id) {
                delete taskDetail.organization_id;
            }
        }

        await getTaskById({
            taskId,
            logger
        })

        try {
            return await Task.findByIdAndUpdate(taskId, { $set: taskDetail }, { new: true });
        } catch (err) {
            logger.debug(err)
            throw new UnknownError()
        }
    }

    function validateTaskInput({
        taskId,
        projectId,
        organizationId,
        title,
        description,
        status,
        priority,
        assignedEngineerId,
        assignedBy,
        dueDate,
        estimatedHours,
        actualHours,
        dependencies,
        comments,
        attachments,
        taskTags,
        reminders
    }) {
        const schema = Joi.object({
            taskId: Joi.string().guid().required().label('taskId'),
            projectId: Joi.string().guid().required().label("project_id"),
            organizationId: Joi.string().guid().required().label("organization_id"),
            title: Joi.string().trim().min(1).max(50).optional().label("title"),
            description: Joi.string().trim().optional().allow("", null).label("description"),
            status: Joi.string().valid(...validStatus).label("status"),
            priority: Joi.string().valid(...validPriority).label("priority"),
            assignedEngineerId: Joi.string().guid().optional().label("assigned_engineer_id"),
            assignedBy: Joi.string().guid().optional().label("assigned_by"),
            dueDate: Joi.date().optional().label("due_date"),
            estimatedHours: Joi.number().optional().label("estimated_hours"),
            actualHours: Joi.number().optional().label("actual_hours"),
            dependencies: Joi.array().items(Joi.string().guid()).optional().label("dependencies"),
            comments: Joi.array().items(
                Joi.object({
                    comment_id: Joi.string().guid().required().label("comment_id"),
                    user_id: Joi.string().guid().required().label("user_id"),
                    message: Joi.string().trim().required().label("message")
                })
            ).optional().label("comments"),

            attachments: Joi.array().items(
                Joi.object({
                    file_id: Joi.string().guid().required().label("file_id"),
                    file_url: Joi.string().uri().required().label("file_url"),
                    uploaded_by: Joi.string().guid().required().label("uploaded_by")
                })
            ).optional().label("attachments"),
            taskTags: Joi.array().items(Joi.string().trim()).optional().label("task_tags"),
            reminders: Joi.array().items(Joi.date()).optional().label("reminders"),
        });

        const { error } = schema.validate({
            taskId,
            projectId,
            organizationId,
            title,
            description,
            status,
            priority,
            assignedEngineerId,
            assignedBy,
            dueDate,
            estimatedHours,
            actualHours,
            dependencies,
            comments,
            attachments,
            taskTags,
            reminders
        });

        if (error) {
            throw new ValidationError('PA-00004', error.message);
        }
        return true;
    }
}