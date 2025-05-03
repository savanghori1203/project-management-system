require('dotenv').config

module.exports = function makeSendOverdueNotification({
    verifyUser,
    getProjectById,
    updateTask,
    config,
    ejs,
    path,
    nodemailer,
    UnknownError,
}) {
    return async function sendOverdueNotification({
        taskDetail,
        logger,
    }) {
        logger.debug(`
            @*****************sendOverdueNotification***************
            @taskDetail: ${JSON.stringify(taskDetail)}
           `);


        if (new Date(taskDetail.due_date) >= new Date()) {
            logger.debug('Task is not overdue');
        }

        const project = await getProjectById({
            projectId: taskDetail.project_id,
            fields: ['name'],
            logger,
        });

        const assignedEngineerData = await verifyUser({
            userId: taskDetail.assigned_engineer_id,
            logger
        })

        if (!assignedEngineerData) {
            logger.debug('Assigned engineer dose not exists.')
        }

        try {
            const emailTemplatePath = path.join(__dirname, '..', '..', 'templates', 'overdue-task-email.ejs');

            const emailBody = await ejs.renderFile(emailTemplatePath, {
                platformName: "Project Manager",
                userName: assignedEngineerData.first_name,
                userEmail: assignedEngineerData.email,
                logoURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dproject%2Bmanagement%2Blogo&psig=AOvVaw1Q2HSmF0_IeCg9Gc7qJmKd&ust=1741586328952000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPjh7eeo_IsDFQAAAAAdAAAAABAE",
                projectName: project.name,
                taskTitle: taskDetail.title,
                dueDate: taskDetail['due_date'].toDateString(),
                taskURL: `http://${config.serviceHost}:${config.servicePort}/task/${taskDetail.id}`,
                supportURL: "https://example.com/support",
            });

            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'savanghori1203@gmail.com',
                    pass: 'gcpo luxt qghe xqol'
                },
            });

            await transporter.sendMail({
                from: `Project Manager Support <no-reply@project-manager-dev.app>`,
                to: assignedEngineerData.email,
                subject: `Overdue Task: ${taskDetail.title}`,
                html: emailBody,
            });

            await updateTask({
                taskId: taskDetail.id,
                taskDetail: {
                    is_overdue: true,
                    project_id: taskDetail.project_id,
                    organization_id: taskDetail.organization_id
                },
                logger,
            });

            logger.debug(`Overdue notification sent to ${assignedEngineerData.email}`);
            return { success: true, message: 'Overdue notification sent' };
        } catch (err) {
            logger.debug(err);
            throw new UnknownError();
        }
    };
};
