import jwt from "jsonwebtoken";
import database from "../database/db.js"
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    const user = await database.query(
        "SELECT * FROM users WHERE id = $1 LIMIT 1",
        [decoded.id]
    );
    req.user = user.rows[0];
    next();
});

export const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(
            new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource`,
                403
            )
        );
    }
    next();
};

