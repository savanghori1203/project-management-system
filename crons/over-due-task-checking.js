const SERVICE_NAME = 'over-due-task-checking-cron-job';
const cron = require('node-cron');
const BaseCron = require('./base-cron');
const { taskService } = require('../services');
const { sendOverdueNotification } = require('../services/notification')

class OverdueTaskNotificationCron extends BaseCron {
    constructor() {
        super({ serviceName: SERVICE_NAME });
    }

    async performJob() {

        const overdueTasks = await taskService.getOverDueTask({
            fields: ['id', 'assigned_engineer_id', 'title', 'project_id', 'organization_id', 'due_date'],
            logger: this.logger,
        })

        if (!overdueTasks || !overdueTasks.length) {
            this.logger.info('No overdue tasks found.');
        }

        this.logger.info(`Processing ${overdueTasks.length} overdue tasks...`);

        if (overdueTasks && overdueTasks.length) {
            try {
                await Promise.all(
                    overdueTasks.map(async (task) => {
                        try {
                            this.logger.info(`Sending notification for task: ${task.id}`);
                            await sendOverdueNotification({
                                taskDetail: task,
                                logger: this.logger,
                            });
                        } catch (error) {
                            this.logger.error(`Error processing task ${task.id}:`, error);
                        }
                    })
                );

                this.logger.info('Overdue task notifications processed.');
            } catch (error) {
                this.logger.error('Error processing overdue tasks:', error);
            }
        }

    }
}

// Schedule the cron job to run every minute
const overdueTaskNotificationCron = new OverdueTaskNotificationCron();
cron.schedule('* * * * *', async () => {
    await overdueTaskNotificationCron.start();
    overdueTaskNotificationCron.logger.info(`[OverdueTaskNotificationCron] Executed at:`, new Date().toISOString());
});
