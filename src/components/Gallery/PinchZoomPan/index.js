/**
 *
 * PinchZoomPan
 * Based on https://gist.github.com/iammerrick/c4bbac856222d65d3a11dad1c42bdcca
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Helmet from 'react-helmet';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const SETTLE_RANGE = 0.001;
const ADDITIONAL_LIMIT = 0.1;
const DOUBLE_TAP_THRESHOLD = 300;
const ANIMATION_SPEED = 0.4;
const RESET_ANIMATION_SPEED = 0.8;
const INITIAL_X = 0;
const INITIAL_Y = 0;
const INITIAL_SCALE = 1;

/* eslint no-unused-expressions: 0 */
const PzpStyle = createGlobalStyle`
  .pzp-rel {
    position: relative;
    overflow: hidden;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    max-width: 100%;
    max-height: 100%;
  }
`;

const AbsDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ff0;
`;

const settle = (val, target, range) => {
  const lowerRange = val > target - range && val < target;
  const upperRange = val < target + range && val > target;
  return lowerRange || upperRange ? target : val;
};

const inverse = (x) => x * -1;

const getPointFromTouch = (touch, element) => {
  const rect = element.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  };
};

const getMidpoint = (pointA, pointB) => ({
  x: (pointA.x + pointB.x) / 2,
  y: (pointA.y + pointB.y) / 2,
});

const getDistanceBetweenPoints = (pointA, pointB) => (
  Math.sqrt(((pointA.y - pointB.y) ** 2) + ((pointA.x - pointB.x) ** 2))
);

const between = (min, max, value) => Math.min(max, Math.max(min, value));

const checkBetween = (m1, m2, value) => (m1 < m2 ? between(m1, m2, value) : between(m2, m1, value));

class PinchZoomPan extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  getInitialState() {
    const { width, height } = this.props;
    return {
      x: INITIAL_X,
      y: INITIAL_Y,
      scale: INITIAL_SCALE,
      width,
      height,
    };
  }

  zoomTo(scale, midpoint) {
    const frame = () => {
      if (this.state.scale === scale) {
        return;
      }

      const distance = scale - this.state.scale;
      const targetScale = this.state.scale + (ANIMATION_SPEED * distance);

      this.zoom(settle(targetScale, scale, SETTLE_RANGE), midpoint);
      this.animation = requestAnimationFrame(frame);
    };

    this.animation = requestAnimationFrame(frame);
  }

  reset() {
    const frame = () => {
      if (this.state.scale === INITIAL_SCALE
        && this.state.x === INITIAL_X
        && this.state.y === INITIAL_Y) {
        return;
      }
      const distance = INITIAL_SCALE - this.state.scale;
      const distanceX = INITIAL_X - this.state.x;
      const distanceY = INITIAL_Y - this.state.y;

      const targetScale = settle(this.state.scale
        + (RESET_ANIMATION_SPEED * distance), INITIAL_SCALE, SETTLE_RANGE);
      const targetX = settle(this.state.x
        + (RESET_ANIMATION_SPEED * distanceX), INITIAL_X, SETTLE_RANGE);
      const targetY = settle(this.state.y
        + (RESET_ANIMATION_SPEED * distanceY), INITIAL_Y, SETTLE_RANGE);

      const nextWidth = this.props.width * targetScale;
      const nextHeight = this.props.height * targetScale;

      this.setState({
        x: targetX,
        y: targetY,
        scale: targetScale,
        width: nextWidth,
        height: nextHeight,
      }, () => {
        this.animation = requestAnimationFrame(frame);
      });
    };

    this.animation = requestAnimationFrame(frame);
  }

  handleTouchStart(event) {
    event.preventDefault();
    if (this.animation) {
      cancelAnimationFrame(this.animation);
    }
    if (event.touches.length === 2) {
      this.handlePinchStart(event);
    }
    if (event.touches.length === 1) {
      this.handleTapStart(event);
    }
  }

  handleTouchMove(event) {
    event.preventDefault();
    if (event.touches.length === 2) {
      this.handlePinchMove(event);
    }
    if (event.touches.length === 1) {
      this.handlePanMove(event);
    }
  }

  handleTouchEnd(event) {
    event.preventDefault();
    if (event.touches.length > 0) {
      return;
    }

    if (this.state.scale > MAX_SCALE) {
      this.zoomTo(MAX_SCALE, this.lastMidpoint);
    }
    if (this.state.scale < MIN_SCALE) {
      this.zoomTo(MIN_SCALE, this.lastMidpoint);
    }
    if (this.lastTouchEnd && this.lastTouchEnd + DOUBLE_TAP_THRESHOLD > event.timeStamp) {
      this.reset();
    }
    this.lastTouchEnd = event.timeStamp;
  }

  handleTapStart(event) {
    this.lastPanPoint = getPointFromTouch(event.touches[0], this.container);
  }

  handlePanMove(event) {
    if (this.state.scale === 1) {
      return;
    }

    event.preventDefault();

    const point = getPointFromTouch(event.touches[0], this.container);
    const nextX = this.state.x + (this.lastPanPoint ? (point.x - this.lastPanPoint.x) : 0);
    const nextY = this.state.y + (this.lastPanPoint ? (point.y - this.lastPanPoint.y) : 0);

    this.setState({
      x: between(this.props.width - this.state.width, 0, nextX),
      y: between(this.props.height - this.state.height, 0, nextY),
    });

    this.lastPanPoint = point;
  }

  handlePinchStart(event) {
    const pointA = getPointFromTouch(event.touches[0], this.container);
    const pointB = getPointFromTouch(event.touches[1], this.container);
    this.lastDistance = getDistanceBetweenPoints(pointA, pointB);
  }

  handlePinchMove(event) {
    event.preventDefault();
    const pointA = getPointFromTouch(event.touches[0], this.container);
    const pointB = getPointFromTouch(event.touches[1], this.container);
    const distance = getDistanceBetweenPoints(pointA, pointB);
    const midpoint = getMidpoint(pointA, pointB);
    const scale = between(MIN_SCALE - ADDITIONAL_LIMIT, MAX_SCALE + ADDITIONAL_LIMIT,
      this.state.scale * (distance / this.lastDistance));

    this.zoom(scale, midpoint);

    this.lastMidpoint = midpoint;
    this.lastDistance = distance;
  }

  zoom(scale, midpoint) {
    const nextWidth = this.props.width * scale;
    const nextHeight = this.props.height * scale;
    const nextX = this.state.x
      + (inverse(midpoint.x * scale) * ((nextWidth - this.state.width) / nextWidth));
    const nextY = this.state.y
      + (inverse(midpoint.y * scale) * ((nextHeight - this.state.height) / nextHeight));

    this.setState({
      width: nextWidth,
      height: nextHeight,
      x: checkBetween(0, this.props.width - nextWidth, nextX),
      y: checkBetween(0, this.props.height - nextHeight, nextY),
      scale,
    });
  }

  render() {
    const { width, height } = this.props;
    const ref = (id) => {
      this.container = id;
    };
    return (
      <div
        className="pzp-rel"
        ref={ref}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        width={width}
        height={height}
      >
        <Helmet
          meta={[
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
            },
          ]}
        />
        <PzpStyle />
        {this.props.children(this.state.x, this.state.y, this.state.scale)}
        {this.state.debug
        && (
        <AbsDiv>
          x:
          {' '}
          {this.state.x.toFixed(0)}
          {' '}
&nbsp;
          y:
          {' '}
          {this.state.y.toFixed(0)}
          {' '}
&nbsp;
          scale:
          {' '}
          {this.state.scale.toFixed(2)}
          {' '}
&nbsp;
          w:
          {' '}
          {this.state.width.toFixed(0)}
          {' '}
&nbsp;
          h:
          {' '}
          {this.state.height.toFixed(0)}
          <br />
          w:
          {' '}
          {this.props.width.toFixed(0)}
          {' '}
&nbsp;
          h:
          {' '}
          {this.props.height.toFixed(0)}
        </AbsDiv>
        )}
      </div>
    );
  }
}

PinchZoomPan.propTypes = {
  children: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default PinchZoomPan;
