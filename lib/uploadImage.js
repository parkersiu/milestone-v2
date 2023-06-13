import { ID, storage } from "@/appwrite";

const uploadImage = async (file) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    '6483841e00af98137202',
    ID.unique(),
    file
  );
  return fileUploaded;
}

export default uploadImage;
