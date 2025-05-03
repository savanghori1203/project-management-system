config = {
    servicePort: 9091,
    serviceHost: '127.0.0.1',
    loggingOptions: {
        'console': {
            enabled: true,
            level: 'debug',
        },
    },
    mongodb: {
        host: '127.0.0.1',
        port: 27017,
        dbName: 'projectsdb',
        maxPoolSize: 10,
        minPoolSize: 2,
        serverSelectionTimeoutMS: 5000,
    },
    caching: {
        enabled: 'Y',
        server_type: 'redis',
        options: {
            host: '127.0.0.1',
            port: '6379',
        },
    },
}
module.exports = config