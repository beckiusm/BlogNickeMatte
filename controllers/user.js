const userModel = require("../models/user");

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.createUser(username, password);
        res.json("Created user succesfully").status(200);
    } catch (error) {
        res.json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await userModel.loginUser(username);
        res.json(
            { 
                message: "login success",
                token: token
            }
        ).status(200); 
    } catch (error) {
        res.json({ error: "username not found" });
    }
};


