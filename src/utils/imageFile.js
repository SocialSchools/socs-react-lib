/**
 *  Handle image files
 */

import { asyncLoad } from './imageFile.lib';

/* eslint-disable no-param-reassign */
export function createImageFile(file) {
  delete file.orientation;
  const options = {
    orientation: true,
    canvas: true,
  };
  return asyncLoad(file, options);
}

export function rotateImageFile(file) {
  const orientationIndexes = [0, 6, 3, 8];
  file.orientation = ((file.orientation || 0) + 1) % 4;
  const options = {
    orientation: orientationIndexes[file.orientation],
    canvas: true,
  };
  return asyncLoad(file, options);
}

export function cropImageFile(file, crop) {
  const options = {
    ...crop,
    orientation: true,
    canvas: true,
  };
  return asyncLoad(file, options);
}

/* eslint-enable no-param-reassign */
