
const response = (res, statusCode, status, message, data = null) => {

    const responseData = {
        status,
        message,
        data
    }
    return res.status(statusCode).json(responseData);
}

const Success = (res, message, data) => response(res, 200, 1, message, data)
const BadRequest = (res, message, data) => response(res, 400, 0, message, data)
const Unauthorized = (res, message, data) => response(res, 401, 0, message, data)
const NotFound = (res, message, data) => response(res, 404, 0, message, data)
const AlreadyExists = (res, message, data) => response(res, 409, 0, message, data)
const ServerError = (res, message, data) => response(res, 500, 0, message, data)
const HttpError = (res, status = 500, message, data = false) => response(res, status, message, data)


module.exports = {
    Success,
    BadRequest,
    Unauthorized,
    NotFound,
    AlreadyExists,
    ServerError,
    HttpError
}