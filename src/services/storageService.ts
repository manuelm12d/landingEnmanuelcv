import { getDownloadURL, ref, uploadBytes, type UploadMetadata } from 'firebase/storage';
import { storage } from '../lib/firebase';

export async function getPublicFileUrl(path: string): Promise<string> {
  const fileRef = ref(storage, path);
  return getDownloadURL(fileRef);
}

export async function uploadFile(
  path: string,
  file: Blob | Uint8Array | ArrayBuffer,
  metadata?: UploadMetadata,
): Promise<string> {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file, metadata);
  return getDownloadURL(fileRef);
}
