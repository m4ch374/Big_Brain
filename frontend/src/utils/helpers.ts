import { useEffect } from 'react';

// From assignment 3
export function fileToDataUrl (file: Blob) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

export const useInterval = (callback: () => void, delay: number) => {
  useEffect(() => {
    callback()

    const interval = setInterval(callback, delay)

    return () => clearInterval(interval)
  }, [callback, delay])
}
