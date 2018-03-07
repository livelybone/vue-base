/**
 * dataURL to blob
 **/
export function dataURLtoBlob (dataUrl) {
  let arr = dataUrl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let blobStr = atob(arr[1]);
  let n = blobStr.length;
  let uArr = new Uint8Array(n);
  while (n--) {
    uArr[n] = blobStr.charCodeAt(n)
  }
  return new Blob([uArr], {type: mime})
}

/**
 * blob to dataURL
 **/
export function blobToDataURL (blob, callback) {
  let a = new FileReader();
  a.onload = e => {
    callback(e.target.result)
  };
  a.readAsDataURL(blob)
}
