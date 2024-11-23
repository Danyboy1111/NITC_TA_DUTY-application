import User from "../models/User.model.js";
import jwt from 'jsonwebtoken';

export const Login=async (req, res, next) => {
    let { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        console.error("Error fetching user:", error.message);
        return next(new Error("Error! Something went wrong."));
    }

    if (!existingUser || existingUser.password !== password) {
        return next(new Error("Wrong details, please check again."));
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: existingUser.id,
                email: existingUser.email,
                name: existingUser.name,
                


            },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
    } catch (err) {
        console.error("Error generating token:", err.message);
        return next(new Error("Error! Something went wrong."));
    }

    res.status(200).json({
        success: true,
        data: {
            userId: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            token: token,
            roll:existingUser.roll,
            image:existingUser.image,
        },
    });
}


export const Signup= async (req, res, next) => {
    const {
        name,
        image,
        roll,
        email,
        password
    } = req.body;
    const newUser =
        User({
            name,
            image,
            roll,
            email,
            password,
        });

    try {
        await newUser.save();
    } catch {
        const error =
            new Error("Error! Something went wrong.");
        return next(error);
    }
    let token;
    try {
        token = jwt.sign(
            {
                userId: newUser.id,
                email: newUser.email
            },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
    } catch  {
        const error =
            new Error("Error! Something went wrong.");
        return next(error);
    }
    res
        .status(201)
        .json({
            success: true,
            data: {
                userId: newUser.id,
                email: newUser.email,
                token: token
            },
        });
}