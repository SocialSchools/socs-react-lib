import { fileType, typeTest } from '../../utils/files';

const MEDIAFILE_STATUS_QUEUED = 20;

function parseFiles(files) {
  const images = [];
  const other = [];
  const videos = [];
  files.forEach((f) => {
    console.log('parseFiles', f);
    const fileProps = f.file ? {
      preview: f.file.preview,
      fullview: f.file.preview,
      fileName: f.file.name,
      type: fileType(f.file),
    } : {
      preview: f.thumb_md || f.thumb_sm || f.fullPath,
      fullview: (typeTest('image', f) && f.fullPath) || f.thumb_md || f.thumb_sm,
      type: fileType(f),
    };
    const file = { ...f, ...fileProps, processing: fileProps.type !== 'document' && f.status === MEDIAFILE_STATUS_QUEUED };
    if (file.type === 'image') {
      images.push(file);
    } else if (file.type === 'video') {
      file.mp4 = file.mp4 || file.fullPath;
      videos.push(file);
    } else {
      other.push(file);
    }
  });
  return { images, videos, other };
}

export default parseFiles;
