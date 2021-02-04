/**
 *  Handle image files
 */

import loadImage from 'blueimp-load-image';
import 'blueimp-canvas-to-blob';

function promiseLoadImage(file, options) {
  return new Promise((resolve, reject) => {
    try {
      const loadingImage = loadImage(file, resolve, options);
      if (!loadingImage) {
        reject(new Error('Can not use loadImage'));
      }
    } catch (err) {
      reject(err);
    }
  });
}

function promiseToBlob(canvas) {
  return new Promise((resolve, reject) => {
    if (canvas.toBlob) {
      canvas.toBlob(resolve);
    } else {
      reject(new Error('Cannot use canvas.toBlob'));
    }
  });
}

function createObjectURL(blob) {
  return window.URL && window.URL.createObjectURL && window.URL.createObjectURL(blob);
}

// For options, see https://github.com/blueimp/JavaScript-Load-Image/blob/8def72724a432c74536471da3cbac11596231ede/js/load-image-orientation.js#L54
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export
export async function asyncLoad(file, options) {
  try {
    const canvas = await promiseLoadImage(file, options);
    if (canvas) {
      const blob = await promiseToBlob(canvas);
      file.blob = blob;
      const preview = createObjectURL(blob);
      if (preview) {
        file.preview = preview;
        file.canRotate = true;
      }
    }
  } catch (error) {
    file.preview = createObjectURL(file);
  }
  return file;
}
