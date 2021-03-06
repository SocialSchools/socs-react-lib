/**
 *  Handle different types of files
 */

import { css } from 'styled-components';
import colors from 'material-colors';
import { createImageFile, rotateImageFile } from './imageFile';

export const FileIconMixin = css`
  &.ss-file-word-o { color: ${colors.blue[500]}; }
  &.ss-file-excel-o { color: ${colors.green[500]}; }
  &.ss-file-powerpoint-o { color: ${colors.amber[700]}; }
  &.ss-file-pdf-o { color: ${colors.red[500]}; }le-audio-o { color: ${colors.purple[500]}; }
`;

const docTypes = [
  { id: 'doc', icon: 'ss-file-word-o', extensions: ['doc', 'docx', 'dotx', 'odt', 'rtf'] },
  { id: 'xls', icon: 'ss-file-excel-o', extensions: ['xls', 'xlsx', 'ods'] },
  { id: 'ppt', icon: 'ss-file-powerpoint-o', extensions: ['ppt', 'pptx', 'pps', 'ppsx', 'odp'] },
  { id: 'pdf', icon: 'ss-file-pdf-o', extensions: ['pdf'] },
  { id: 'txt', icon: 'ss-file-text-o', extensions: ['txt', 'eml', 'epub'] },
  { id: 'audio', icon: 'ss-file-audio-o', extensions: ['aac', 'amr', 'mp3', 'wav', 'm4a', 'wma', 'mod', 'ogg'] },
];

const documentExtensions = docTypes.reduce((acc, item) => acc.concat(item.extensions), []);

export const mediaTypes = {
  list: ['image', 'video', 'document'],
  info: {
    image: { id: 1, icon: 'ss-camera', pattern: 'image/*,.heic,.heif' },
    video: { id: 2, icon: 'ss-playvideo', pattern: 'video/*,.mp4,.mov,.ts,.mkv,.3gp' },
    document: { id: 3, icon: 'ss-file', pattern: documentExtensions.map((ext) => `.${ext}`).join(',') },
  },
};

mediaTypes.byId = mediaTypes.list
  .reduce((acc, key) => ({ ...acc, [mediaTypes.info[key].id]: key }), {});

export function typeTest(type, file) {
  if (type === file.type) {
    return true;
  }
  const { info } = mediaTypes;
  if (typeof file.type === 'number') {
    return info[type.id] === file.type;
  }
  const patterns = info[type].pattern.split(',');
  return patterns.some((pat) => {
    const match = pat.match(/(\w+\/)\*/);
    const result = match
      ? (file.type && file.type.startsWith(match[1]))
      : (file.name || file.fileName).toLowerCase().endsWith(pat);
    return result;
  });
}

export function fileType(file) {
  if (typeof file.type === 'number') {
    return mediaTypes.list[file.type - 1];
  }
  const type = ['image', 'video'].find((t) => typeTest(t, file));
  return type || 'document';
}

export function isAllowedFile(file, allowVideo) {
  return mediaTypes.list.some((type) => (type !== 'video' || allowVideo) && typeTest(type, file));
}

/**
 * Get icon corresponding to fileType
 * @param type
 * @returns {string}
 */
export function getExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}

export function getFileIcon(filename) {
  const extension = getExtension(filename);
  const iconInfo = docTypes.find((item) => item.extensions.includes(extension));
  return iconInfo ? iconInfo.icon : 'ss-file-o';
}

export function getTypeIcon(file) {
  switch (fileType(file)) {
    case 'image':
      return 'ss-camera';
    case 'video':
      return 'ss-playvideo';
    default:
      return getFileIcon(file.fileName);
  }
}

/**
 * count number of files by fileType
 * @param files
 */
export function getTypeCounts(files) {
  return files.reduce((sums, file) => {
    const tp = fileType(file);
    return {
      ...sums,
      [tp]: (sums[tp] || 0) + 1,
    };
  }, {});
}

/**
 * Set orientation for files, only for images, does not work on IE/Edge,
 * @param files
 * @returns {Promise.<*>}
 */

export function imageOnly(file, method) {
  if (!typeTest('image', file)) {
    return Promise.resolve(file);
  }
  return method(file);
}

export function setOrientation(files) {
  const promises = files.map((file) => imageOnly(file, createImageFile));
  return Promise.all(promises);
}

export function rotateFile(file) {
  return imageOnly(file, rotateImageFile);
}
