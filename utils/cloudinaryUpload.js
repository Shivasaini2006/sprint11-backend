const cloudinary = require('../config/cloudinary');

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'cinestream' },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    stream.end(buffer);
  });
};

module.exports = { streamUpload };
