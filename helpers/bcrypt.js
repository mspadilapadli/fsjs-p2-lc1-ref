const { hashSync, compareSync } = require("bcryptjs");

let hashPass = (password) => hashSync(password);
let comparePass = (passwordInput, passwordDb) =>
    compareSync(passwordInput, passwordDb);

module.exports = { hashPass, comparePass };
