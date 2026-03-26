const express = require('express');
const multer = require('multer');

console.log("File routes loaded");

const router = express.Router();
const File = require('../models/file');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
});

// ✅ TEST ROUTE (IMPORTANT)
router.get('/test', (req, res) => {
    res.send("Routes working");
});

// ✅ UPLOAD ROUTE
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = new File({
            filename: req.file.originalname,
            originalname: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer,
            size: req.file.size
        });

        await file.save();

        res.status(201).json({
            message: "File uploaded successfully",
            fileId: file._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading file" });
    }
});

// ✅ GET ALL FILES
router.get('/allfiles', async (req, res) => {
    const files = await File.find().select('-data');
    res.json(files);
});

module.exports = router;