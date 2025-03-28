const express = require('express');
const router = express.Router();
const User = require("../schema/userSchema");
const { validationResult, body } = require('express-validator');
const bcrypt = require("bcryptjs");//import for encrpt password
const jwt = require('jsonwebtoken');//generated token to identify the user
const fetchUser = require('../middleware/fetchUser');

const damiData = "hellonice to meet you";

//@@@@@@@@@@@@@@@@ added new user with post /user/add
router.post('/add', [
    body('name', "name can not empty").notEmpty(),
    body('email', "enter correct email").isEmail(),
    body('address', "address can not empty").notEmpty(),
    body('mobile', "enter only 10 digit").isLength({ min: 10, max: 10 }),
    body('city', "citycan not empty").notEmpty(),
    body('password', "password  enter 5 charachter").isLength({ min: 5 })], async (req, res) => {

        let result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const { name, email, address, mobile, city, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        try {
            const user = await User.create({
                name: name,
                email: email,
                address: address,
                mobile: mobile,
                city: city,
                password: hash,
            });

            const data = {
                id: user.id
            };
            const token = jwt.sign(data, damiData);

            res.json({ user, token });
        } catch (error) {
            return res.status(400).json({ error: "server error found" });
        }
        // const user = User(req.body);
        // user.save();
        // res.send(req.body);
        // console.log(req.body);
    });


//@@@@@@@@@@@@@@@@ login user post /user/login
router.post('/login', [
    body('email', "enter correct email").isEmail(),
    body('password', "password  enter 5 charachter").exists()
],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const { email, password } = req.body;
        try {
            const useremail = await User.findOne({ email });
            if (!useremail) {
                return res.status(400).json({ error: "email not found" });
            }
            console.log("user found" + useremail);

            const compare = await bcrypt.compare(password, useremail.password);//this user come from above of added user
            if (!compare) {
                return res.status(400).json({ error: "enter correct password" });
            }
            const data = {
                id: useremail.id
            };
            const token = jwt.sign(data, damiData);

            res.json({ useremail, token });

        } catch (error) {
            return res.status(400).json({ error: "server error found" });
        }
    });


//@@@@@@@@@@@@@@@@ fetch user get /user/fetchUser create a middleware
router.get('/fetchUser', fetchUser, async (req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findById(id).select("-password");
        res.json({ user });
        console.log(id);
    } catch (error) {
        res.status(500).send(" Server Error");
    }
});


//@@@@@@@@@@@@@@@@ delete user delete /user/delete/id
router.delete('/delete/:id', fetchUser, async (req, res) => {

    try {

        let deleteid = User.findById(req.params.id);
        console.log(deleteid);
        if (!deleteid) {
            return res.status(400).json({ error: "id  not found" });
        }
        deleteid = await User.findByIdAndDelete(req.params.id);
        res.json({ deleteid });
    } catch (error) {
        res.status(500).send(" Server Error");
    }
});

//@@@@@@@@@@@@@@@@ update user put /user/update/id
router.put('/update/:id', fetchUser, async (req, res) => {
   try {
     const { name, email, address, mobile, city, password } = req.body;
    const newobj = {};
    if (name) { newobj.name = name; };
    if (email) { newobj.email = email; };
    if (address) { newobj.address = address; };
    if (mobile) { newobj.mobile = mobile; };
    if (city) { newobj.city = city; };
    if (password) { newobj.password = password; };

    let updateid =await User.findById(req.params.id);
    if (!updateid) {
        return res.status(401).json({ error: "id not found" });
    }
    updateid =await User.findByIdAndUpdate(req.params.id, { $set: newobj }, { new: true });
    res.json({ updateid });
   } catch (error) {
    
   }

});

module.exports = router;