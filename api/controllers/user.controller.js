import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({
        message: "API is Working Fine!"
    })
}

export const updateUser = async (req, res, next) => {
    if(req.user.id != req.params.id) return next(errorHandler(401, "You can only Update Your Account Details!"))

    const updatedFields = {
        username: req.body.username,
        profileImage: req.body.profileImage
    }

    if(req.body.password) {
        updatedFields.password = await bcryptjs.hash(req.body.password, 15)
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, 
            { $set: updatedFields },
            { new: true }
        )
        const {password:_, ...userdata} = updatedUser._doc
        return res.status(200).json(userdata)
    } catch (error) {
        console.log(error)
        next(error)
    }
}