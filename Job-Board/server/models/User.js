const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: ["candidate", "admin"],
            default: "candidate",
        },
    },
    {
        timestamps: true,
    }
);

/* Hash password before saving */

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/* Compare login password */

userSchema.methods.comparePassword = async function (
    enteredPassword
) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;