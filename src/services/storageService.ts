import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  type FirebaseStorage,
  type UploadMetadata,
} from 'firebase/storage';
import { storage } from '../lib/firebase';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function requireStorage(): FirebaseStorage {
  if (!storage) {
    throw new Error(
      import.meta.env.DEV
        ? 'Firebase no disponible en este modo. Usa: npm run dev:firebase'
        : 'Firebase Storage no está configurado.',
    );
  }
  return storage;
}

export async function getPublicFileUrl(path: string): Promise<string> {
  const fileRef = ref(requireStorage(), path);
  return getDownloadURL(fileRef);
}

export async function listCarouselImages(folder = 'carrusel'): Promise<string[]> {
  const folderRef = ref(requireStorage(), folder);
  const result = await listAll(folderRef);

  const imageItems = result.items.filter((item) =>
    IMAGE_EXTENSIONS.some((ext) => item.name.toLowerCase().endsWith(ext)),
  );

  const urls = await Promise.all(imageItems.map((item) => getDownloadURL(item)));
  return urls;
}

export async function getProfileImageUrl(folder = 'profile'): Promise<string | null> {
  const folderRef = ref(requireStorage(), folder);
  const result = await listAll(folderRef);

  const pngItem = result.items.find((item) => item.name.toLowerCase().endsWith('.png'));
  const imageItem =
    pngItem ??
    result.items.find((item) => IMAGE_EXTENSIONS.some((ext) => item.name.toLowerCase().endsWith(ext)));

  if (!imageItem) return null;

  return getDownloadURL(imageItem);
}

export async function uploadFile(
  path: string,
  file: Blob | Uint8Array | ArrayBuffer,
  metadata?: UploadMetadata,
): Promise<string> {
  const fileRef = ref(requireStorage(), path);
  await uploadBytes(fileRef, file, metadata);
  return getDownloadURL(fileRef);
}
