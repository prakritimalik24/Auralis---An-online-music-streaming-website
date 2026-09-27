const {ImageKit} = require("@imagekit/nodejs")

const imagekitclient = new ImageKit({
 privateKey : process.env.PRIVATE_KEY,
})

async function uploadfile(file){
    const result = await imagekitclient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder : "musicsite/music"

    })

    return result ;
}

async function uploadimg(image){
    const img = await imagekitclient.files.upload({
file : image,
fileName: "cover_"+ Date.now() ,
folder: "musicsite/covers"
    });

    return img;
}

module.exports = {uploadfile , uploadimg}
