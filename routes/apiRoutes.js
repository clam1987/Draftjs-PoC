const router = require("express").Router();
const db = require("../model/");

router.get("/announcements", async (req,res) => {
    try {
        const response = await db.Announcements.findAll()
        res.json(response);
    } catch (err) {
        console.error(err);
    }; 
});

router.post("/announcements", async (req, res) => {
    try {
        const { subject, body } = req.body;
        const str = JSON.stringify(body);
        await db.Announcements.create({subject, body: str});
        res.json(true);
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;
