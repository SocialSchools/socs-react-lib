/**
 *  Handle different types of files
 */

import { css } from 'styled-components';
import colors from 'material-colors';

export const FileIconMixin = css`
  &.ss-file-word-o { color: ${colors.blue[500]}; }
  &.ss-file-excel-o { color: ${colors.green[500]}; }
  &.ss-file-powerpoint-o { color: ${colors.amber[700]}; }
  &.ss-file-pdf-o { color: ${colors.red[500]}; }
  &.ss-file-audio-o { color: ${colors.purple[500]}; }
`;

export const docTypes = [
  { id: 'doc', icon: 'ss-file-word-o', extensions: ['doc', 'docx', 'odt', 'rtf'] },
  { id: 'xls', icon: 'ss-file-excel-o', extensions: ['xls', 'xlsx', 'ods'] },
  { id: 'ppt', icon: 'ss-file-powerpoint-o', extensions: ['ppt', 'pptx', 'pps', 'ppsx', 'odp'] },
  { id: 'pdf', icon: 'ss-file-pdf-o', extensions: ['pdf'] },
  { id: 'txt', icon: 'ss-file-text-o', extensions: ['txt'] },
  { id: 'audio', icon: 'ss-file-audio-o', extensions: ['mp3', 'wav', 'm4a', 'wma'] },
];

const documentExtensions = docTypes.reduce((acc, item) => acc.concat(item.extensions), []);

export const mediaTypes = {
  list: ['image', 'video', 'document'],
  info: {
    image: { icon: 'ss-camera', pattern: 'image/*,.heic,.heif' },
    video: { icon: 'ss-playvideo', pattern: 'video/*,.mp4,.mov,.ts,.mkv' },
    document: { icon: 'ss-file', pattern: documentExtensions.map((ext) => `.${ext}`).join(',') },
  },
};

/**
 * Return image/video/document, depending on mime-type
 * @param type
 * @returns {string}
 */
export function docType(type) {
  if (typeof type === 'number') {
    return ['image', 'video', 'document'][type - 1];
  }
  const match = type && type.match(/^(image|video)\//);
  return match ? match[1] : 'document';
}

/**
 * Get icon corresponding to docType
 * @param type
 * @returns {string}
 */
function getExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}

function getFileIcon(filename) {
  const extension = getExtension(filename);
  const iconInfo = docTypes.find((item) => item.extensions.includes(extension));
  return iconInfo ? iconInfo.icon : 'ss-file-o';
}

export function getTypeIcon(file) {
  switch (docType(file.type)) {
    case 'image':
      return 'ss-camera';
    case 'video':
      return 'ss-playvideo';
    default:
      return getFileIcon(file.fileName);
  }
}
