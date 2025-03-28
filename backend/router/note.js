const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Note = require("../schema/noteSchema");
const router = express.Router();
const { validationResult, body } = require('express-validator');

//@@@@@@@@@@@@@@@@ added new note with post /note/addnote
router.post('/addnote', fetchUser, [
    body('title').notEmpty(),
    body('description').notEmpty().isLength({ min: 5 }),
    body('tag').notEmpty().isLength({ min: 5 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const note = await Note({
            title: title,
            description: description,
            tag: tag
        });
        note.save();
        res.json({ note });

    } catch (error) {
        return res.status(400).json({ error: "server error found" });
    }
});


//@@@@@@@@@@@@@@@@ fetch note with get /note/fetchnote
router.post('/addnote', fetchUser, async (req, res) => {
    try {
        let userid = await Note.find({ user: req.user.id });//req.user come from fetchUser middleware
        res.json({ userid });
    } catch (error) {
        return res.status(400).json({ error: "server error found" });
    }
});


module.exports = router;
