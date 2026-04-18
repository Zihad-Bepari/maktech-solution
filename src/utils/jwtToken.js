import jwt from "jsonwebtoken";

export const generateToken = (user,res) => {
    if (!user || !user.id) throw new Error("User ID missing for token");
    //console.log(user.id)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
}     
