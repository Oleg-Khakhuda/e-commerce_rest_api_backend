import { v2 as cloudinary } from 'cloudinary'
import { promisify } from 'util'
import { unlink } from 'fs/promises'
import GenderCategories from '../../repository/genderCategory.js'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
})

const cloudStorage = async (cloudFolders, file, owner) => {
  const genderCategoryId = owner.id
  const filePath = file
  const idFileCloud = owner.idFileCloud
  const folderFiles = cloudFolders
  const uploadCloud = promisify(cloudinary.uploader.upload)

  const { public_id: returnedIdFileCloud, secure_url: fileUrl } =
    await uploadCloud(filePath, {
      public_id: idFileCloud,
      folder: `${folderFiles}/${genderCategoryId}`,
    })

  const newIdFileCloud = returnedIdFileCloud.replace(
    `${folderFiles}/`, '',
  )

  await GenderCategories.updateFile(genderCategoryId, fileUrl, newIdFileCloud)
  
  await removeUploadFile(filePath)

  return fileUrl
}

const removeUploadFile = async (filePath) => {
  try {
    await unlink(filePath)
  } catch (error) {
    console.error(error.message)
  }
}

export default cloudStorage;