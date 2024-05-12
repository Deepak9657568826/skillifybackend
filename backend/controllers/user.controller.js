const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");


require("dotenv").config();
const jwt = require('jsonwebtoken');
const { blacklistModel } = require("../models/blacklist.model");

const registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        //before creating user we have to check if user is present or not
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(401).json({ message: "user is already registered" });
        }
        bcrypt.hash(password, 10, async (err, data) => {
            if (err) {
                throw new Error(err.message);
            }
            const newUser = new UserModel({ email, password: data, name })
            await newUser.save();
            return res.status(200).json({ message: "user registered successfully" });
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });


        if (!user) {
            return res.status(401).send("user is not found try to login");
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw new Error(err.message);
            if (result) {

                const access_token = jwt.sign(
                    { userId: user.userId, email, role: user.role },
                    "masai",
                    { expiresIn: "1h" }
                );
                const refresh_token = jwt.sign(
                    { userId: user.userId, email, role: user.role },
                    "masai",
                    { expiresIn: "1h" }
                );
                return res.json({ message: 'user login successfully', accessToken: access_token, refreshToken: refresh_token })
            } else {
                return res.status(401).json({ message: "user credential is wrong" })
            }
        })

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
const logoutUser = async (req, res) => {
    const header = req.headers['authorization'];
    const token = header.split(" ")[1];
    try {
        if (!token) {
            return res.status(401).send("token is not provided");
        }
        const userToken = new blacklistModel({ token });
        await userToken.save();
        res.status(200).send('user logout successfully');
    } catch (err) {
        return res.status(400).json({ message: err.message });

    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser

}