const download = require('image-downloader');
const localConfig = require('../config/headers').localConfig;

async function getImage() {
    const options = {
        url: localConfig.imageDownloadUrl,
        dest: localConfig.imageDestinationPath               // Save to /path/to/dest/image.jpg
    }

    try {
        const { filename, image } = await download.image(options)
        console.log(filename) // => /path/to/dest/image.jpg
        return true
    } catch (e) {
        console.error(e)
    }
    return false

}

exports.getImage = getImage;
