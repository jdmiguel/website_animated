import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

class LettersCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: {
        delay: 5.5,
        duration: 1.1
      },
      chars: null,
      totalChars: 0
    };

    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
  }

  componentDidMount() {
    const { intro } = this.state;
    const { duration, delay } = intro;
    const tl = new TimelineMax();
    const mySplitText = new SplitText('.letters', { type: 'words,chars' });
    const { chars } = mySplitText;

    this.setState({
      chars,
      totalChars: chars.length
    });

    tl.staggerFrom(
      chars,
      duration,
      {
        delay,
        opacity: 0,
        rotationY: 120,
        transformOrigin: '50% 50%',
        ease: Power1.easeOut
      },
      0.08,
      '+=0'
    );
  }

  getDistance(index) {
    const { totalChars } = this.state;
    const factor = totalChars / 2;
    const distance =
      index < totalChars / 2
        ? (Math.sin(index) - totalChars) * (factor - index)
        : (Math.sin(index) + totalChars) * (index - factor);
    return distance;
  }

  mouseOverHandler() {
    const { chars, totalChars } = this.state;
    const { inLogoAnimation } = this.props;

    chars.forEach((char, i) => {
      if (i < totalChars / 2)
        TweenMax.to(char, 1, {
          x: `${this.getDistance(i)}`,
          ease: Power1.easeOut
        });
      if (i > totalChars / 2)
        TweenMax.to(char, 1.2, {
          x: `${this.getDistance(i)}`,
          ease: Power1.easeOut
        });
    });

    inLogoAnimation();
  }

  mouseOutHandler() {
    const { chars } = this.state;
    const { outLogoAnimation } = this.props;

    chars.forEach(char => {
      TweenMax.to(char, 1, {
        x: 0,
        ease: Power1.easeOut
      });
    });

    outLogoAnimation();
    // TweenMax.killDelayedCallsTo(this.animLetters);
  }

  render() {
    const { txt, isVisible, isReadyOverMenuLetters } = this.props;
    const getLettersContainerClasses = () =>
      isVisible ? 'letters_container' : 'letters_container invisible';
    const getLettersClasses = () =>
      !isReadyOverMenuLetters ? 'letters' : 'letters active';

    return (
      <div className={getLettersContainerClasses()}>
        <h2
          className={getLettersClasses()}
          onMouseEnter={() => {
            if (isReadyOverMenuLetters) this.mouseOverHandler();
          }}
          onMouseLeave={this.mouseOutHandler}
        >
          {txt}
        </h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isReadyOverMenuLetters: state.isReadyOverMenuLetters
});

const mapDispatchToProps = dispatch => ({
  inLogoAnimation: () => dispatch({ type: actionTypes.MENU_LOGO_ANIMATION_IN }),
  outLogoAnimation: () =>
    dispatch({ type: actionTypes.MENU_LOGO_ANIMATION_OUT })
});

LettersCharacter.propTypes = {
  txt: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isReadyOverMenuLetters: PropTypes.bool.isRequired,
  inLogoAnimation: PropTypes.func.isRequired,
  outLogoAnimation: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LettersCharacter);
