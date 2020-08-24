const userModel = require("../models/user");

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10, () => {
        try {
            const user = await userModel.createUser(username, hashedPassword);
            res.json("Created user succesfully").status(200);
        } catch (error) {
            res.json({ error: error.message });
        }
    })
};