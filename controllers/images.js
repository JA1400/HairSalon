const Image = require('../models/image');
const ImageKit = require("imagekit")

const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

module.exports.imageIndex = async (req, res) => {
    const images = await Image.find();
    const size = '?tr=w-600,h-600';
    res.render('admin/gallery', { images, size });
}

module.exports.saveImage = async (req, res) => {
    console.log(req.file.orginalname);
    if (req.file) {
        imageKit.upload({
            file: req.file.buffer.toString('base64'),
            fileName: req.file.originalname,
            folder: 'Hair_Salon'
        }, async function (error, result) {
            if (error) console.log(error);
            else {
                console.log(result)
                const { url, fileId } = result;
                const image = new Image({ image: url, fileId: fileId })
                await image.save();
                res.redirect('/admin/gallery')
            };
        });
    }
}

module.exports.deleteImage = async (req, res) => {
    const { id } = req.params;
    const img = await Image.findById(id)
    console.log(`file id: ${img.fileId}`);
    imageKit.deleteFile(img.fileId, async function (error, result) {
        if (error) {
            req.flash('error', 'Problem uploading image!')
            res.redirect('/admin/gallery')
        } else {
            console.log(result);
            req.flash('success', 'Image deleted!')
            await Image.findByIdAndDelete(id)
            res.redirect('/admin/gallery')
        }
    });
}
