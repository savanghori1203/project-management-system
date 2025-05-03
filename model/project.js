const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const projectSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },
        id: {
            type: String,
            default: function () { return this._id },
            unique: true
        },
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String
        },
        project_link: {
            type: String,
            require: true,
        },
        organization_id: {
            type: String,
            required: true,
            default: uuidv4
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id; // Keep `id` but not `_id`
                delete ret._id; // Just removes it from response
            }
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
)

module.exports = mongoose.model('Project', projectSchema)