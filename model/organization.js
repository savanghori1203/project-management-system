const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const organizationSchema = new mongoose.Schema(
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
            required: true,
            trim: true
        },
        link_name: {
            type: String,
            required: true,
            unique: true,
            trim: true
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

module.exports = mongoose.model("Organization", organizationSchema);
