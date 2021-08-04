const userAgent = navigator.userAgent || navigator.vendor || window.opera;

export const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

export const isAndroid = /android/i.test(userAgent);

export const isMobile = isIOS || isAndroid;
