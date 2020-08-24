const userModel = require("../models/user");

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
        try {
            const user = await userModel.createUser(username, hashedPassword);
            res.json("Created user succesfully").status(200);
        } catch (error) {
            res.json({ error: error.message });
        }
    })
};