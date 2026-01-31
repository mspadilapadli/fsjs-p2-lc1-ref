// req : model table
const { User, Voucher, Gift } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { where } = require("sequelize");
// req : model table

class Controller {
    static async register(req, res, next) {
        try {
            console.log(req.body);
            let user = await User.create(req.body);
            // let notif = {
            //     id: user.id,
            //     email: user.email,
            // };

            res.status(201).json({
                id: user.id,
                email: user.email,
            });
        } catch (error) {
            // console.log(error.name);
            next(error);
            // console.log(error);
        }
    }
}

module.exports = Controller;
