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
        const note = new Note({
            title: title,
            description: description,
            tag: tag,
            user:req.user.id //add user id in notes
        });
        await note.save();
        res.json({ note });

    } catch (error) {
        return res.status(400).json({ error: "server error found" });
    }
});


//@@@@@@@@@@@@@@@@ fetch note with get /note/fetchnote
router.get('/fetchnote', fetchUser, async (req, res) => {
    // try {
        let userid = await Note.find({ user: req.user.id});//req.user come from fetchUser middleware
        res.json({ userid });
        console.log(userid)
    // } catch (error) {
    //     return res.status(400).json({ error: "server error found" });
    // }
});


//@@@@@@@@@@@@@@@@ delete note with delete /note/deletenote
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let deleteid = await Note.findById(req.params.id);
        if (!deleteid) {
            return res.json({ error: "id not found" });
        }
        deleteid = await Note.findByIdAndDelete(req.params.id);
        res.json({ deleteid });
    } catch (error) {
        return res.status(400).json({ error: "server error found" });
    }
});

//@@@@@@@@@@@@@@@@ update note with put /note/updatenote
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newobj = {};
        if (title) { newobj.title = title; }
        if (description) { newobj.description = description; }
        if (tag) { newobj.tag = tag; }

        let updateid = await Note.findById(req.params.id);
        if (!updateid) {
            return res.status(404).json({ error: "id not found" });
        }
        // the user can't update other user data so it used
        // if (updateid.user !== req.user.id) { return res.status(404).send("can't update data of other user data"); };

        updateid = await Note.findByIdAndUpdate(req.params.id, { $set: newobj }, { new: true });
        res.json({ updateid });
        
    } catch (error) {
        console.log(updateid.user !== req.user.id);
        return res.status(400).json({ error: "server error found" });
    }
});


module.exports = router;
