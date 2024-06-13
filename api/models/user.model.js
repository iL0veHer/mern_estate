import mongoose from 'mongoose';

const userSchenma = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[a-z0-9_.-]+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid username!`,
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


const User = mongoose.model('User', userSchema);

export default User;
