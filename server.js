const express = require('express')
const config = require('./config')
const { connectDB, closeDB } = require('./db');
const {
    projectRoutes,
    userRoutes,
    organizationRoutes,
    taskRoutes,
} = require('./routes')
require('dotenv').config();

const app = express();
const port = config.servicePort;

//this is cron job if you want to don't run then comment it out
// require('./crons/over-due-task-checking')

app.use(express.json());

app.use((req, res, next) => {
    req.user = {
        role: req.headers['x-role'] || 'engineer'
    }
    next()
})

app.use('/api/projects/', projectRoutes)
app.use('/api/users/', userRoutes)
app.use('/api/organization/', organizationRoutes)
app.use('/api/task', taskRoutes)


connectDB().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => {
    console.error("Failed to start server:", err);
});

process.on('SIGINT', async () => {
    console.log("Shutting down server...");
    await closeDB();
    process.exit(0);
});


