const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const taskSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },
        id: {
            type: String,
            default: function () { return this._id; },
            unique: true
        },
        project_id: {
            type: String,
            required: true,
            ref: "Project" // Reference to Project model
        },
        organization_id: {
            type: String,
            required: true,
            ref: "Organization" // Reference to Organization model
        },
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 50,
        },
        description: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: ["To Do", "In Progress", "Review", "Completed", "Blocked"],
            default: "To Do"
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium"
        },
        assigned_engineer_id: {
            type: String,
            required: true,
            ref: "User" // Reference to the User model
        },
        assigned_by: {
            type: String,
            required: false,
            ref: "User"
        },
        due_date: {
            type: Date
        },
        estimated_hours: {
            type: Number
        },
        actual_hours: {
            type: Number,
            default: 0
        },
        dependencies: {
            type: [String], // Array of task IDs (UUID)
            ref: "Task"
        },
        comments: [
            {
                comment_id: {
                    type: String,
                    default: uuidv4
                },
                user_id: {
                    type: String,
                    ref: "User"
                },
                message: {
                    type: String,
                    trim: true
                },
                timestamp: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        attachments: [
            {
                file_id: {
                    type: String,
                    default: uuidv4
                },
                file_url: {
                    type: String,
                    required: true
                },
                uploaded_by: {
                    type: String,
                    ref: "User"
                },
                uploaded_at: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        task_tags: {
            type: [String],
            default: []
        },
        reminders: {
            type: [Date]
        },
        is_overdue: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
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
);

module.exports = mongoose.model("Task", taskSchema);
