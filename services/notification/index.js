const ejs = require("ejs");
const path = require("path");
const nodemailer = require("nodemailer");
const { verifyUser } = require('../user')
const { getProjectById } = require('../project')
const { updateTask } = require('../task')
const config = require('../../config')
const { UnknownError } = require('../../exceptions')

const makeSendOverdueNotification = require('./send-over-due-notification')
const sendOverdueNotification = makeSendOverdueNotification({
    verifyUser,
    getProjectById,
    updateTask,
    config,
    ejs,
    path,
    nodemailer,
    UnknownError,
})

module.exports = Object.freeze({
    sendOverdueNotification
})