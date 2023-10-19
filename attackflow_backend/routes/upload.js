const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploadedFiles'));
    },
    filename: function (req, file, cb) {
        // Set the filename for the uploaded file (e.g., timestamp + original name)
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

function extractTextFromPDF(filePath) {
    return pdf(filePath).then(data => {
        return data.text;
    });
}

// Define the route to handle file uploads
router.post('/', upload.single('file'), async (req, res) => {

    //res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    //console.log(req.file);
    const filePath = req.file.path;
    const filename = req.file.filename;

    if (path.extname(filePath) === '.pdf') {
        try {
            await extractTextFromPDF(filePath);
            res.json({ message: 'PDF file uploaded successfully', filePath: filePath ,filename:filename});
        } catch (err) {
            return res.status(500).json({ error: 'Error extracting text from PDF' });
        }
    } else {
        res.json({ message: 'File uploaded successfully', filePath: filePath });
    }
});

router.get('/getFileContent', async (req, res) => {
    const filePath = req.query.filePath;

    if (path.extname(filePath) === '.pdf') {
        try {
            const fileContent = await extractTextFromPDF(filePath);
            res.json({ fileContent: fileContent });
        } catch (err) {
            return res.status(500).json({ error: 'Error extracting text from PDF' });
        }
    } else {
        fs.readFile(filePath, 'utf8', (err, fileContent) => {
            if (err) {
                return res.status(500).json({ error: 'Error reading file' });
            }
            res.json({ fileContent: fileContent });
        });
    }
});

router.use('/uploadedFiles', express.static(path.join(__dirname, 'uploadedfiles')));

module.exports = router;
