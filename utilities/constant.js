const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const SECRET_KEY = 'project_management_system000000'

const IV = '1234567890123456'

module.exports = Object.freeze({
    PASSWORD_REGEX,
    SECRET_KEY,
    IV,
})