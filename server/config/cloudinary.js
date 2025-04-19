// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// (async function() {

//     // locating to where the image dir.
//     const uploadDir = path.join(__dirname, '..', 'uploads');
//     if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir);
//     }
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            uploadDir, {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);

//     const url = cloudinary.url('Anwarr_dssb6t', {
//         fetch_format: autoCropUrl,
//         quality: auto,
//     })
//     console.log("Cloudinary url: ", url);
    
//     const autoCropUrl = cloudinary.url('Anwarr_dssb6t', {
//         crop: 'fill',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();

module.exports = cloudinary;
