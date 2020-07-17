/**
 * Reduce width and height so they fit in box, keeping aspect ratio
 * @param w   Initial width
 * @param h   Initial height
 * @param wMax  Maximum width
 * @param hMax  Maximum height
 * @returns {{w: *, h: *}}
 */

function boundDimensions(w, h, wMax, hMax) {
  const a = h / w;
  return {
    w: Math.min(w, wMax, hMax / a),
    h: Math.min(h, hMax, wMax * a),
  };
}

export default boundDimensions;
