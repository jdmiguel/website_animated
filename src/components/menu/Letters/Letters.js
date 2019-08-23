import React from 'react';
import PropTypes from 'prop-types';

/* Reducer */
import { reducer, initialState } from '../../../store/reducer';

/* Actions */
import { setMenuState } from '../../../store/actions';

const Letters = ({
  superheroAlias,
  superheroClass,
  superheroActive,
  superheroBreakpoint,
  menuDirection,
  overLetters,
  endLettersAnimation
}) => {
  // Reducers
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { menuState } = state;
  // Props
  const { inHero, outHero } = menuDirection;

  // Refs
  const lettersRef = React.useRef(null);
  const charsRef = React.useRef(null);

  // States
  const [classes, setClasses] = React.useState(['letters-wrapper']);
  const [allowMouseOver, setAllowMouseOver] = React.useState(false);
  const [allowMouseMove, setAllowMouseMove] = React.useState(false);

  // Utils
  const getDistance = React.useCallback((index, splitFactor) => {
    const totalChars = superheroAlias.length;
    const distance =
      index < superheroBreakpoint
        ? (Math.asinh(index) - totalChars) *
          (superheroBreakpoint - index) *
          splitFactor
        : (Math.asinh(index) + totalChars) *
          (index - superheroBreakpoint) *
          splitFactor;

    return distance;
  });

  const separatingAnimation = React.useCallback((factor, callback = false) => {
    TweenMax.staggerTo(
      charsRef.current,
      1,
      {
        cycle: {
          x: i => getDistance(i, factor)
        },
        ease: Power1.easeOut
      },
      0,
      () => {
        if (callback) {
          console.log('is callback');
          setMenuState(dispatch, false);
        }
      }
    );
  });

  // Animations
  const entryAnimation = React.useCallback(() => {
    setClasses([...classes, 'active', 'visible']);

    TweenMax.staggerFromTo(
      charsRef.current,
      0.7,
      {
        alpha: 0,
        rotationY: -120,
        scaleX: 0
      },
      {
        alpha: 1,
        rotationY: 0,
        scaleX: 1,
        ease: Power1.easeOut
      },
      0.05,
      () => {
        setAllowMouseOver(true);
        endLettersAnimation();
      }
    );
  });

  const inLeftAnimation = React.useCallback(() => {
    setClasses([...classes, 'active']);

    TweenMax.staggerFromTo(
      charsRef.current,
      0.6,
      {
        alpha: 0,
        cycle: {
          x: i => -250 + i * 20
        }
      },
      {
        delay: 0.35,
        x: 0,
        alpha: 1,
        ease: Power1.easeOut
      },
      0.012,
      () => {
        setAllowMouseOver(true);
        setAllowMouseMove(true);
        overLetters(false);
        endLettersAnimation();
      }
    );
  });

  const inRightAnimation = React.useCallback(() => {
    setClasses([...classes, 'active']);

    TweenMax.staggerFromTo(
      charsRef.current,
      0.6,
      {
        alpha: 0,
        cycle: {
          x: i => 50 + i * 40
        }
      },
      {
        delay: 0.35,
        x: 0,
        alpha: 1,
        ease: Power1.easeOut
      },
      0.012,
      () => {
        setAllowMouseOver(true);
        setAllowMouseMove(true);
        overLetters(false);
        endLettersAnimation();
      }
    );
  });

  const outLeftAnimation = React.useCallback(() => {
    setClasses(classes.filter(item => item !== 'active'));

    TweenMax.staggerFromTo(
      charsRef.current,
      0.47,
      {
        alpha: 1,
        x: 0
      },
      {
        cycle: {
          x: i => -250 + i * 20
        },
        alpha: 0,
        ease: Power1.easeInOut
      },
      0.015
    );
  });

  const outRightAnimation = React.useCallback(() => {
    setClasses(classes.filter(item => item !== 'active'));

    TweenMax.staggerFromTo(
      charsRef.current,
      0.47,
      {
        alpha: 1,
        x: 0
      },
      {
        cycle: {
          x: i => 50 + i * 40
        },
        alpha: 0,
        ease: Power1.easeInOut
      },
      0.015
    );
  });

  // Handlers
  const mouseOverHandler = () => {
    if (allowMouseOver) {
      overLetters(true);
      separatingAnimation(0.45);
    }
  };

  const mouseOutHandler = () => {
    if (allowMouseOver) {
      overLetters(false);
      TweenMax.staggerTo(charsRef.current, 1, {
        x: 0,
        ease: Power1.easeOut
      });
    }
  };

  const mouseMoveHandler = () => {
    if (allowMouseOver && allowMouseMove) {
      overLetters(true);
      separatingAnimation(0.45);
      setAllowMouseMove(false);
    }
  };

  const clickHandler = () => {
    if (superheroActive) {
      separatingAnimation(1.4, true);
    }
  };

  // UseEffects
  React.useEffect(() => {
    const mySplitText = new SplitText(lettersRef.current, {
      type: 'chars'
    });
    const { chars } = mySplitText;

    charsRef.current = chars;

    TweenMax.set(charsRef.current, {
      alpha: 0
    });

    setClasses([...classes, 'visible']);
  }, []);

  React.useEffect(() => {
    if (superheroActive) {
      if (inHero) {
        const inAnimation =
          inHero === 'left' ? inLeftAnimation : inRightAnimation;
        inAnimation();
      } else {
        entryAnimation();
      }
    } else if (outHero) {
      setAllowMouseOver(false);
      const outAnimation =
        outHero === 'left' ? outLeftAnimation : outRightAnimation;
      outAnimation();
    }
  }, [superheroActive]);

  return (
    <div className={classes.join(' ')}>
      <button
        type="button"
        onMouseOver={mouseOverHandler}
        onMouseOut={mouseOutHandler}
        onMouseMove={mouseMoveHandler}
        onKeyDown={e => e.preventDefault}
        onFocus={e => e.preventDefault}
        onBlur={e => e.preventDefault}
        onClick={clickHandler}
      />
      <h2 ref={lettersRef} className={`letters ${superheroClass}`}>
        {superheroAlias}
      </h2>
    </div>
  );
};

Letters.propTypes = {
  superheroAlias: PropTypes.string,
  superheroClass: PropTypes.string,
  superheroActive: PropTypes.bool,
  superheroBreakpoint: PropTypes.number,
  overLetters: PropTypes.func,
  endLettersAnimation: PropTypes.func
};

export default Letters;
