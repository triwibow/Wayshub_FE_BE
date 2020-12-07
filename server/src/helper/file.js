const fs = require('fs');
const path  = require('path');

const moveFile = (dest, fileName) => {
    const destinationPath = path.join(__dirname, `../../uploads/tmp/${dest}/`);
    const newDestionation = path.join(__dirname, `../../uploads/${dest}/`)
   
    fs.readdir(destinationPath, (err, files) => {
        files.forEach(file => {
           if(file === fileName){
               fs.rename(`${destinationPath}/${file}`, `${newDestionation}/${fileName}`, (err) => {
                   if(err){
                       console.log(err);
                       return;
                   }
                   console.log('move file');
               })
           }
        });
    });
}

const deleteFile = (dest, fileName) => {
    const destinationPath = path.join(__dirname, '../../uploads/');

    fs.unlink(`${destinationPath}/${dest}/${fileName}`, (err) => {
        if(err) {
            console.log(err);
            return;
        }

        console.log("delete file");
    })
}

exports.moveFile = moveFile;
exports.deleteFile = deleteFile;