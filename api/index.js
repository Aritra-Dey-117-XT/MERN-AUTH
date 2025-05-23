import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config()

const app = express()
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB Database!")
    }).catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log("Server Listening on Port 3000!")
})

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/client/dist')))

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error!"
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})