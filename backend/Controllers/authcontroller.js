const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usermodel = require("../Models/user");
require("dotenv").config();


const signup = async (req, res) => {

    try {
        const { name, email, password , role} = req.body;
        const user = await usermodel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User is already exist", success: false })
        }
        const userm = new usermodel({ name, email, password , role});
        userm.password = await bcrypt.hash(password, 10);
        role: userm.role = role || "user";
        await userm.save();
        const token = jwt.sign(
  { id: userm._id, role: userm.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.status(201).json({
  message: "Signup successfully",
  success: true,
  token
});
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

const login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "auth failed", success: false })
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(409).json({ message: "auth failed", success: false })
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.status(201).json(
            {
                message: "login successfully",
                success: true,
                jwtToken,
                email,
                name:user.name
                
            }
        )
    }
    catch (error) {
        console.log("Login error:", error);
        res.status(500).json({
            message: "Internal server error",error,
            success: false
        });
    }
}
module.exports = { signup, login };