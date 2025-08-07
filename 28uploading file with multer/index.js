const path = require('path');
const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Extract the file extension
        const baseName = path.basename(file.originalname, ext); // Extract the base name without extension
        return cb(null, `${Date.now()}-${baseName}${ext}`); // Preserve the original extension
    },
});

const upload = multer({ storage }); // Use the storage configuration

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    return res.render("homepage");
});

app.post('/upload', upload.single("profileImage"), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/');
});

app.listen(PORT, () => {
    return console.log(`Server is running on http://localhost:${PORT}`);
});