// const jwt = require('jsonwebtoken');//generated token to identify the user
// const damiData = "hellonice to meet you";


// const fetchUser = (req, res, next) => {
//     let token = req.header("token");
//     if (!token) {
//         return res.status(400).json({ error: "token not found" });
//     }
//     console.log("token" + token);
//     try {
//         const varifytoken = jwt.verify(token, damiData);
//         console.log(varifytoken);
//         req.user = varifytoken.user;//this user define which user note to be fetch
//         // console.log("user.req"+ req.user)
//         next();
//     } catch (error) {
//         return res.status(400).json({ error: "not found" });

//     }
// };
// module.exports = fetchUser;

const jwt = require('jsonwebtoken');//generated token to identify the user
const damiData = "hellonice to meet you";


const fetchUser = (req, res, next) => {
    let token = req.header("token");
    if (!token) {
        return res.status(400).json({ error: "token found" });
    }
    // console.log(token)
    try {
        const varifytoken = jwt.verify(token, damiData);
        // console.log(varifytoken)
        req.user = varifytoken;
        console.log( req.user)
        next();
    } catch (error) {
        return res.status(400).json({ error: "not found" });

    }
};
module.exports = fetchUser;