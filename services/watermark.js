const Jimp = require('jimp');

module.exports = () => {
  var methods = {};

  methods.addWatermark = async (data, text) => {
    const main = await Jimp.read(data);
    const maxHeight = main.getHeight();
    const maxWidth = main.getWidth();
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    const X = 0;
    const Y = 0;
    const finalImage = await main.print(font, X, Y, {
        text: text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, maxWidth, maxHeight, (err, image) => {
        image.print(font, X, Y+20, {
            text: 'Watermark by payrollah, please complete task to get full image',
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        }, maxWidth, maxHeight);
    });
    return new Promise((resolve, reject)=>{
        finalImage.quality(100).getBuffer(Jimp.MIME_PNG, (err, buffer) => {
            if(err){
                reject(err);
            }else{
                resolve(buffer);
            }

        });
    });
  }

  
  return methods;
}
