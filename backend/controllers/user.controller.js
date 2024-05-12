const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");


require("dotenv").config();
const jwt = require('jsonwebtoken');
const { blacklistModel } = require("../models/blacklist.model");

const registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }
        const users=await UserModel.find();
        let id=1;
        if(users&&users.length>0){
          users.sort((a, b) => a.userId - b.userId)
             id=users[users.length-1].userId;
             id=id+1;
        }
    const userId=id;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({ userId,email, password: hashedPassword, name });
        await newUser.save();

        // Send success response
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


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