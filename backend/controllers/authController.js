const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

exports.register = async (req, res) => {
    try {
        const { name, username, password } = req.body.data;
        const exists = await UserModel.findOne({ username });

        console.log(name, username)
        
        if (!exists) {
            const user = await UserModel.create({ name, username, password });
            const token = jwt.sign({ id: user._id.toString() }, "JWT_SECRET");
            return res.send({ success: true, message: "User created", token });
        }

        return res.json({ success: false, message: "User already exists!" });
    } catch (error) {
        console.error(error.message);
        return res.send({ success: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body.data;
        const findUser = await UserModel.findOne({ username });

        if (!findUser) {
            return res.send({ success: false, message: 'No user exists' });
        }

        if (password === findUser.password) {
            const token = jwt.sign({ id: findUser._id }, "JWT_SECRET");
            return res.send({ 
                success: true, 
                message: 'Login success', 
                token, 
                name: findUser.name, 
                username: findUser.username, 
                userId: findUser._id.toString(), 
                isAdmin: findUser.isAdmin 
            });
        } 

        return res.send({ success: false, message: 'Wrong password' });
    } catch (error) {
        return res.send({ success: false, message: error.message });
    }
};
