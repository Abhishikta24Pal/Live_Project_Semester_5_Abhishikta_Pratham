// frontend/src/lib/cloudinaryUpload.js
export function uploadToCloudinary(file, onProgress = () => {}) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const unsignedPreset = import.meta.env.VITE_CLOUDINARY_UNSIGNED_PRESET;

  if (!cloudName || !unsignedPreset) {
    return Promise.reject(new Error('Missing Cloudinary env vars'));
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    fd.append('upload_preset', unsignedPreset);
    fd.append('file', file);

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        onProgress(pct);
      }
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const resp = JSON.parse(xhr.responseText);
            resolve(resp);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.status} ${xhr.responseText}`));
        }
      }
    };

    xhr.open('POST', url, true);
    xhr.send(fd);
  });
}
