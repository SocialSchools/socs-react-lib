/* eslint-disable react/destructuring-assignment */
/**
*
* Gallery
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Swipeable from 'react-swipeable';
import PinchZoomPan from './PinchZoomPan';
import boundDimensions from './boundDimensions';
import Video from '../Video';

const defaultSize = {
  imgWidth: 400,
  imgHeight: 400,
};

const LightBox = styled.div`
  /** Based on http://codepen.io/gschier/pen/HCoqh */

  /** Position and style */
  position: fixed;
  z-index: 999999;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.8);

  /** Remove default browser outline */
  outline: none;
`;

const CloseDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Wrapper = styled.div`
  padding-top: 50px;
  @media (max-width: ${(props) => props.theme.screenXsMax}) {
    padding-top: 30px;
  }
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentDiv = styled.div`
  width: ${(props) => props.width};
  max-width: calc(100% - 80px);
  transition: transform 0.3s ease;
  overflow: hidden; // in case of IE/Edge
  
  img, video {
    max-width: 100%;
    max-height: 90vh;
    margin: auto;
    background-color: white;
  }
  .swipe-up {
    transform: translate(0, -10px);
  }
  
  .swipe-down {
    transform: translate(0, 10px);
  }
  
  .swipe-left {
    transform: translate(-10px, 0);
  }
  
  .swipe-right {
    transform: translate(10px, 0);
  }
`;

const Caption = styled.div`
  color: ${(props) => props.theme.grayLighter};
  float: right;
`;

const ButtonIcon = styled.i.attrs({
  role: 'button',
  tabIndex: 0,
})`
  display: inline-block;
  font-size: 40px;
  padding: 10px;
  @media (max-width: ${(props) => props.theme.screenXsMax}) {
    font-size: ${(p) => p.theme.iconSizeLarge};
    padding: 5px;
  }
  color: ${(props) => props.theme.grayLighter};
  &[disabled] {
    cursor: default;
    color: ${(props) => props.theme.gray};
  }
`;

class Gallery extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultSize,
      currentIndex: props.startIndex,
      swipeDir: '',
    };
  }

  componentDidMount() {
    // Prevent scrolling of background
    this.scrollTop = document.documentElement.scrollTop;
    const { body } = document;
    body.style.overflow = 'hidden';
    document.getElementById('next-button').focus();
  }

  componentWillUnmount() {
    const { body } = document;
    body.style.overflow = 'visible';
    document.documentElement.scrollTop = this.scrollTop;
  }

  onKeyDown = (event) => {
    const { items, onClose } = this.props;
    switch (event.key) {
      case 'ArrowLeft':
        this.onPrevious();
        break;
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        this.onNext();
        break;
      case 'Home':
        this.setState({ currentIndex: 0 });
        break;
      case 'End':
        this.setState({ currentIndex: items.length - 1 });
        break;
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  }

  onSwiping = (newSwipeDir) => {
    const swipeDir = this.state;
    const result = () => {
      if (newSwipeDir !== swipeDir) {
        this.setState({ swipeDir: newSwipeDir });
      }
    };
    return result.bind(this);
  }

  onSwiped = () => {
    this.setState({ swipeDir: '' });
  }

  onPrevious = () => {
    if (this.hasPrevious()) {
      this.setState((prevState) => ({ currentIndex: prevState.currentIndex - 1 }));
    }
  }

  onNext = () => {
    if (this.hasNext()) {
      this.setState((prevState) => ({ currentIndex: prevState.currentIndex + 1 }));
    }
  }

  hasPrevious = () => this.state.currentIndex > 0

  hasNext = () => this.state.currentIndex < this.props.items.length - 1

  imageLoaded = (ev) => {
    const img = ev.target;
    this.setState({
      imgWidth: img.naturalWidth,
      imgHeight: img.naturalHeight,
    });
  }

  render() {
    const { items, startIndex, onClose } = this.props;
    const { currentIndex } = this.state;
    if (startIndex === -1 || currentIndex === -1 || items.length === 0) return null;
    const { imgWidth, imgHeight } = this.state;
    const bounded = boundDimensions(imgWidth, imgHeight,
      window.innerWidth - 80, window.innerHeight - 80);
    const disablePrevious = !this.hasPrevious();
    const disableNext = !this.hasNext();
    const item = items[currentIndex];
    return (
      <LightBox tabIndex="0" onKeyDown={this.onKeyDown}>
        <CloseDiv>
          <ButtonIcon className="ss-delete" onClick={onClose} />
        </CloseDiv>
        <Wrapper>
          <ButtonIcon
            className="ss-navigateleft"
            disabled={disablePrevious}
            onClick={this.onPrevious}
          />
          <ContentDiv width={bounded.w}>
            <PinchZoomPan width={bounded.w} height={bounded.h} key={currentIndex}>
              {(x, y, scale) => (
                <Swipeable
                  className={`swipe-${this.state.swipeDir}`}
                  onSwiped={this.onSwiped}
                  onSwipedUp={onClose}
                  onSwipedDown={onClose}
                  onSwipedLeft={this.onNext}
                  onSwipedRight={this.onPrevious}
                  onSwipingUp={this.onSwiping('up')}
                  onSwipingDown={this.onSwiping('down')}
                  onSwipingLeft={this.onSwiping('left')}
                  onSwipingRight={this.onSwiping('right')}
                  delta={20}
                  style={{
                    width: '100%',
                    pointerEvents: scale === 1 ? 'auto' : 'none',
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    transformOrigin: '0 0',
                  }}
                >
                  <div className="lb-media">
                    {item.type === 'image'
                      ? <img src={item.fullPath || item.preview} alt="" onLoad={this.imageLoaded} />
                      : <Video video={item} />}
                  </div>
                </Swipeable>
              )}
            </PinchZoomPan>
            <Caption>
              {currentIndex + 1}
              {' '}
              /
              {items.length}
            </Caption>
          </ContentDiv>
          <ButtonIcon
            id="next-button"
            className="ss-navigateright"
            disabled={disableNext}
            onClick={this.onNext}
          />
        </Wrapper>
      </LightBox>
    );
  }
}

Gallery.propTypes = {
  items: PropTypes.array.isRequired,
  startIndex: PropTypes.number,
  onClose: PropTypes.func,
};

Gallery.defaultProps = {
  startIndex: 0,
};

export default Gallery;
