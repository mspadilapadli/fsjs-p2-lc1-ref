function errorHandler(error, req, res, next) {
    let status = error.status;
    let message = error.message;
    switch (error.name) {
        case `SequelizeValidationError`:
            status = 400;
            message = error.errors.map((e) => e.message);
            break;

        case `notFound`:
            status = 404;
            message = "Data not found";
            break;

        case `Forbidden`:
            status = 403;
            message = "You are not authorized";
            break;

        case `SequelizeUniqueConstraintError`:
            status = 400;
            message = error.errors.map((e) => e.message);
            break;

        case `InvalidInput`:
            status = 400;
            message = `Email or Password is required`;
            break;

        case `InvalidUser`:
            status = 400;
            message = `Invalid email/password`;
            break;
        case `Unauthorized`:
            status = 401;
            message = `Invalid Token`;
            break;
        case `Forbidden`:
            status = 403;
            message = `You're not authorized`;
            break;
        default:
            console.log(error);
            status = 500;
            message = "Internal Server Error";
            break;
    }

    res.status(status).json({ message });
}
module.exports = errorHandler;
