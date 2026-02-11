// req : model table
const { User, Voucher, Gift } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { where } = require("sequelize");
// req : model table

class Controller {
    static async register(req, res, next) {
        try {
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
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) throw { name: `InvalidInput` };

            let user = await User.findOne({ where: { email } });
            if (!user) throw { name: `InvalidUser` };

            let compare = comparePass(password, user.password);
            if (!compare) throw { name: `InvalidUser` };

            let token = signToken({ id: user.id });

            res.status(200).json({
                access_token: token,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getVouchers(req, res, next) {
        try {
            let data = await Voucher.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async postGiftVoucherId(req, res, next) {
        try {
            let voucher = await Voucher.findByPk(req.params.voucherId);
            if (!voucher) throw { name: `notFound` };

            const { message, amount, receiverId } = req.body;
            let addData = {
                message,
                senderId: req.user.id,
                amount,
                voucherId: req.params.voucherId,
                receiverId,
            };
            let data = await Gift.create(addData);
            console.log(data);
            res.status(201).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getGifts(req, res, next) {
        try {
            let data = await Gift.findAll({
                where: { receiverId: req.user.id },
            });

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteGift(req, res, next) {
        try {
            const { id } = req.params;

            const gift = await Gift.findOne({
                where: { id },
            });
            if (!gift) throw { name: "notFound" };
            await Gift.destroy({
                where: { id },
            });

            res.status(200).json({ message: "Gift has been deleted" });
        } catch (error) {
            next(error);
        }
    }

    static async patchGiftsClaim(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id, "<<<<id");
            let gift = await Gift.findOne({
                where: { id },
            });

            if (!gift) throw { name: "notFound" };
            await Gift.update(
                { status: "claimed" },
                {
                    where: { id },
                },
            );

            const update = await Gift.findOne({
                where: { id },
            });

            res.status(200).json(update);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = Controller;
