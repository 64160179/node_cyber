const fs = require('fs');

const db = require('../models');
const Image = db.images;

const uploadFiles = async (req, res) => {

    try {
        console.log(req.file);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __basedir + '/resources/static/assets/uploads/' + req.file.filename
            )
        }).then(image => {
            fs.writeFileSync(
                __basedir + '/resources/static/assets/tmp/' + image.name, image.data
            )
            return res.send({ message: "File uploaded successfully!" });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${error}`
        });
    }
};

module.exports = {
    uploadFiles
}