/**
 * dataURL to blob
 * */
export function dataURLtoBlob(dataUrl) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const blobStr = atob(arr[1]);
  let n = blobStr.length;
  const uArr = new Uint8Array(n);
  while (n) {
    uArr[n] = blobStr.charCodeAt(n);
    n -= 1;
  }
  return new Blob([uArr], { type: mime });
}

/**
 * blob to dataURL
 * */
export function blobToDataURL(blob, callback) {
  const a = new FileReader();
  a.onload = (e) => {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
}

/**
 * blob to url
 * */
export function blobToURL(blob) {
  return {
    url: window.URL.createObjectURL(blob),
    revokeFn: () => window.URL.revokeObjectURL(blob),
  };
}
