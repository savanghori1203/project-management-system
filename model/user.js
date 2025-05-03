const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4
        },
        id: {
            type: String,
            default: function () { return this._id; },
            unique: true
        },
        first_name: {
            type: String,
            required: true,
            trim: true
        },
        last_name: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        password: {
            type: String, // Hashed password
            required: true,
            select: false
        },
        is_verified: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' },
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

module.exports = mongoose.model('User', userSchema);
