import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body
    const hashedPassword = await bcryptjs.hash(password, 15)
    const newUser = new User({username, email, password: hashedPassword})
    try {
        await newUser.save()
        return res.status(201).json({message: "User Created Successfully!"})
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, "User Not Found, Make Sure Email is Correct or Sign Up!"))
        const authenticated = await bcryptjs.compare(password, validUser.password)
        if(!authenticated) return next(errorHandler(401, "User Not Authenticated, Password didn't Match!"))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
        const {password: _, ...userdata} = validUser._doc
        return res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: "strict",
        })
        .status(200)
        .json(userdata)
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
            const { password:_, ...userData } = user._doc
            return res.cookie("access_token", token, {
                httpOnly: true,
                maxAge: 3600000,
                sameSite: true
            })
            .status(201)
            .json(userData)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = await bcryptjs.hash(generatedPassword, 15)
            const username = req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString()
            const newUser = new User({
                username,
                email: req.body.email,
                password: hashedPassword,
                profileImage: req.body.photo
            })
            await newUser.save()
            const {password:_, ...userData} = newUser._doc
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
            return res.cookie("access_token", token, {
                httpOnly: true,
                maxAge: 3600000,
                sameSite: true
            })
            .status(201)
            .json(userData)
        }
    } catch (error) {
        next(error)
    }
}

export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
}