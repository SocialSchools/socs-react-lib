/**
*
* Video
* Gallery example from react-images
* https://github.com/jossmac/react-images/blob/master/examples/src/components/Gallery.js
*/

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Video(props) {
  const { video } = props;
  const playerElem = useRef(null);
  const playing = useRef();
  const onTouch = () => {
    if (!playerElem.current) {
      return;
    }
    if (playing.current) {
      playerElem.current.pause();
    } else {
      playerElem.current.play();
    }
  };
  const togglePlaying = (ev) => {
    playing.current = ev.type !== 'pause';
  };
  const types = ['mp4', 'webm', 'ogg'];
  useEffect(() => {
    const player = playerElem.current;
    player.addEventListener('touchend', onTouch);
    player.addEventListener('pause', togglePlaying);
    player.addEventListener('playing', togglePlaying);
  }, []);
  return (
    <video // eslint-disable-line jsx-a11y/media-has-caption
      controls
      ref={playerElem}
      key={video.id}
      poster={video.thumbnail}
    >
      {types.filter((type) => video[type]).map((type) => (
        <source
          key={type}
          type={`video/${type}`}
          src={video[type]}
        />
      ))}
      <span>This browser does not support the video player.</span>
    </video>
  );
}

Video.propTypes = {
  video: PropTypes.object.isRequired,
};

export default Video;
