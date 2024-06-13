import { v2 as cloudinary } from 'cloudinary'
import { promisify } from 'util'
import { unlink } from 'fs/promises'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

const save = async (cloudFolders, filePath, ownerId) => {
  const idFileCloud = null
  const uploadCloud = promisify(cloudinary.uploader.upload)

  const { public_id: returnedIdFileCloud, secure_url: fileUrl } =
    await uploadCloud(filePath, {
      public_id: idFileCloud,
      folder: `${cloudFolders}/${ownerId}`,
    })
  
  await removeUploadFile(filePath)

  return {fileUrl, returnedIdFileCloud}
};

const removeUploadFile = async (filePath) => {
  try {
    await unlink(filePath)
  } catch (error) {
    console.error(error.message)
  }
}

const removeFiles = async (idFileCloud) => {
  const deleteFiles = promisify(cloudinary.uploader.destroy)
  const result = deleteFiles(idFileCloud)
.then((data) => {
  return data
}).catch((error) => {
  console.log(error)
});
return result;
};

const removeFolder = async (cloudFolder, idFolderCloud) => {
  const deleteFolder = promisify(cloudinary.api.delete_folder)
  const folderPath = `${cloudFolder}/${idFolderCloud}`
  const result = deleteFolder(folderPath)
.then((data) => {
  return data
}).catch((error) => {
  console.log(error)
});
return result;
};

export default {
  save, 
  removeFiles, 
  removeFolder
};