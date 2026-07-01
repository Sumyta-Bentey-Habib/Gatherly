export class AppError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(404, message);
    }
}
export class BadRequestError extends AppError {
    constructor(message = "Bad request") {
        super(400, message);
    }
}
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(403, message);
    }
}
// Wrapper for async Express route handlers to automatically pass errors to next()
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
