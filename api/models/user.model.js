import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[a-z0-9_.-]+$/.test(v);
                },
                message: (props) =>
                    `${props.value} is not valid. Use lowercase letters, numbers, '_', '.', or '-'.`,
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
        avatar: {
            type: String,
            default:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAMFBMVEXk5ueutLeor7Lg4+Tn6eqrsbXq7O3d4OHLz9Ha3d64vcDGyszW2duxt7q1ur28wcNvKgfhAAADf0lEQVR4nO2by3bjIAxAeQiDef7/3w7G6SRp0hhkC7LgLrvpPUIILBTGJpPJZDKZTCaTyWQymUy+DNgYLfFAlpGrN845Y7yW7BvcYPHOBiVUQaiYjF4Gi4E2XCn+hBLRyIFewBz/pbSTvUbFC5gRb51KwLgfogXS/ulUvNwIKfPRadNS+vukNjqvIiRRIcVFVy1wVVJ9owWuZvn2aK29tMDXRioTZCcrXe+Ud2LsE6zlc5160TI9tMA0rF9h7WAlQ6OUsgu5VMP++6FD1YLW9cskcqn2UOU1pM4saduluErEmeURocqZRZtYkFBWxDVrQUnlfCe10ogduBEpT8O6u947KHchJKSU8IRWqLqwoRxhYsmItOKUZ6FuPZn/EwitVqwU55RW2C3IFWFe4a0oz5wvtcJK0a4g2ooy2/GVIRJa4Ws76b0Pew6SXrBQt/ZiRXk6A+6CnCFtsEnkrc9SSrEFtwlJLzLoyyjppY81donuUHcaMLVB0C5gY5/vh0De4kbku6L9Giy0lyxB7pRpPQuJy8KN1koaOzg1H4a9Ou5NjZk+61dokCLvPt6pvin3egO4adVlvCLtEL0AVdFSsfMYAej37+BPUrS3qvccPVx23H0PgPkUrlGP9Axk+j1hcXcyQ5R2L53exCurOj10KAW0sepx2EIJnoYOpNy8mPYp7reuEKLz3zFVtM0VLUyuq9cSRo8T7eyTYPL3H8e55f9dpsFSsnkB9/krHmJK23SYZP3NyniaSaFsuJf5q/KHYF1ftQW8seHvKaf7brTOSPpH5y1K0tuX8bQPFZ5Hr4k3JYB3vPWDUKhkGF3EQLpQHaWniCmeiAK26OyEUPoRS/76eOUTDxWmR7Hgr40XMHfWqXjZC283wMwVTsUrXXWZWHy8yGnTCuaK9NoW7zKn4mXPf0yDbpu2qtFSZ7ML/yj/CXHugxrd9T/g3DdZ3VQoygu/Fy9PqQcCNucvLAhvwOU8UEaqgFhEeinEkxPV7nuitWPaPhSKobERD8jnmmattidW9JROIy0N5i5JtWPrrU6MLbRSv4bIQUcktVKVDeJrqO1T9g1VbS31XZ1qf03UbwPuhCqrvk6V4++Yh+VT1Ez2LNgBHTw1P47pddg8cDyDsaIHv9Ac13f81NAJq8PaQPMBeMDxEd27WhUOY2XFAA43oRzBkdRkMplMJpPR/APGLSuxGs9R3QAAAABJRU5ErkJggg==',
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
