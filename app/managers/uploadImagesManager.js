const uniqId = require('nanoid');
const fs = require('fs');
const Sharp = require('sharp');

const TRANSPARENT_BACKGROUND = {
  r: 0, g: 0, b: 0, alpha: 0,
};
const makePathToImages = ({ fileName }) => `${__dirname}/../public/images/${fileName}`;
const transformer = (width, height, quality) => new Sharp()
  .rotate()
  .resize(width, height, { fit: 'contain', background: TRANSPARENT_BACKGROUND })
  .webp({ quality });

const writeFileToFs = ({
  width, height, modelId, colorId, file, quality,
}) => new Promise((res) => {
  const fileDimension = width && height ? `${width}x${height}` : 'original';
  const fileName = `${modelId}-${colorId}-${uniqId(5)}-${fileDimension}`;
  file
    .pipe(transformer(width, height, quality))
    .pipe(fs.createWriteStream(makePathToImages({ fileName })))
    .on('finish', () => {
      res(fileName);
    });
});

const smallImg = { height: 240, width: 320, quality: 50 };
const mediumImg = { height: 480, width: 640, quality: 50 };
const bigImg = { height: 768, width: 1024, quality: 80 };

const saveImage = async ({ file, modelId, colorId }) => {
  const [fileName320, fileName640, fileName1024] = await Promise.all([
    writeFileToFs({
      modelId, colorId, file, ...smallImg,
    }),
    writeFileToFs({
      modelId, colorId, file, ...mediumImg,
    }),
    writeFileToFs({
      modelId, colorId, file, ...bigImg,
    }),
  ]);
  return { fileName320, fileName640, fileName1024 };
};

const deleteImageFS = (fileName) => fs
  .unlink(makePathToImages({ fileName }), ((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('deleted');
  }));

module.exports = {
  saveImage, deleteImageFS,
};
