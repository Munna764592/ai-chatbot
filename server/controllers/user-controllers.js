
import User from "../models/User.js"
import { hash, compare } from 'bcrypt'
import { createToken } from "../utils/token-manger.js"
import { COOKIE_NAME } from "../utils/contants.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(201).json({ message: "OK", users })
    } catch (err) {
        return res.status(404).json({ message: "ERROR", cause: err.message })
    }
}
export const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(401).send("User already exist")
        }
        const hashedPassword = await hash(password, 10)
        const user = new User({ name, email, password: hashedPassword })
        await user.save();

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            path: "/",
            domain: "localhost",
            signed: true,
        })

        const expires = new Date();

        expires.setDate(expires.getDate() + 7)
        const token = createToken(user.id.toString(), user.email, "7d")
        res.cookie(COOKIE_NAME, token, {
            path: "/", domain: "localhost", expires, httpOnly: true,
            signed: true,
        })

        return res.status(200).json({ message: "OK", name: user.name, email: user.email })
    } catch (err) {
        return res.status(404).json({ message: "ERROR", cause: err.message })
    }
}
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send("User not registred");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password")
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            path: "/",
            domain: "localhost",
            signed: true,
        })

        const expires = new Date();

        expires.setDate(expires.getDate() + 7)
        const token = createToken(user.id.toString(), user.email, "7d")
        res.cookie(COOKIE_NAME, token, {
            path: "/", domain: "localhost", expires, httpOnly: true,
            signed: true,
        })


        return res.status(200).json({ message: "OK", id: user._id.toString() })
    } catch (err) {
        return res.status(404).json({ message: "ERROR", cause: err.message })
    }
}
export const verifyUser = async (req, res) => {
    try {

        const user = await User.findById( res.locals.jwtData.id )
        if (!user) {
            return res.status(401).send("User not registred OR Token Malfunctioned");
        }
        if(user._id.toString()!== res.locals.jwtData.id){
            return res.status(401).send("Premissions didn't match");
        }

        return res.status(200).json({ message: "OK", id: user._id.toString(),name:user.name,email:user.email })
    } catch (err) {
        return res.status(404).json({ message: "ERROR", cause: err.message })
    }
}
export const userLogout = async (req, res) => {
    try {

        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registred OR Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Premissions didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            path: "/",
            domain: "localhost",
            signed: true,
        })

        return res.status(200).json({ message: "OK", id: user._id.toString(), name: user.name, email: user.email })
    } catch (err) {
        return res.status(404).json({ message: "ERROR", cause: err.message })
    }
}