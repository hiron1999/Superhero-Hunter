
const apiKey = '4f0956f0f9a5aa18eb6bea16f1c5bdb2';
const privateKey = '3c63e60fc43f7750f9bf9f50621810839671828f';
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
export{hash, apiKey, ts};