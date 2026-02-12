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
    }

    res.status(status).json({ message });
}
module.exports = errorHandler;
