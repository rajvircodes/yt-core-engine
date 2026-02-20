import {v2 as cloudinary} from 'cloudinary';
require('dotenv').config(); 


const uploadImage = async (localPath)=>{


    try {
        if(!localPath) return null;
        // upload files
        const result = await cloudinary.uploader.upload(localPath,{
            resource_type:"auto"
        })

        console.log("file uploaded successfully!",result.url);
        
    } catch (error) {
        console.log("ERROR: ", error);
        fs.unlinkSync(localPath)
        return null
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:    process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    secure: true
})