import { configureOpenAI } from "../config/openai-config.js";
import { OpenAI } from "openai"
import User from "../models/User.js"

export const generateChatCompletion = async (req, res) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).json({ message: "User not registred OR Token Malfunctioned" })
        }

        const chats = user.chats.map(({ role, content }) => ({ role, content }))
        chats.push({ content: message, role: "user" })
        user.chats.push({ content: message, role: "user" })
        const config = configureOpenAI()
        const openai = new OpenAI(config);
        const chatResponse = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages: chats, })

        user.chats.push(chatResponse.choices[0].message)
        await user.save();
        return res.status(200).json({ chats: user.chats })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Something wrong" })
    }

}

export const sendChatToUser = async (req, res) => {
    try {

        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registred OR Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Premissions didn't match");
        }

        return res.status(200).json({ message: "OK", chats:user.chats })
    } catch (err) {
        return res.status(404).json({ message: "ERROR", cause: err.message })
    }
}
export const deleteChats = async (req, res) => {
    try {

        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).send("User not registred OR Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Premissions didn't match");
        }
        user.chats = []
        await user.save();

        return res.status(200).json({ message: "OK"})
    } catch (err) {
        return res.status(404).json({ message: "ERROR", cause: err.message })
    }
}