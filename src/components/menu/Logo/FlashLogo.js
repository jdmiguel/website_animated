import React from 'react';
import PropTypes from 'prop-types';

/* Colors */
import { black, redFlash } from '../../../utils/colors';

const FlashLogo = ({ classes }) => (
  <div className={classes}>
    <svg
      x="0px"
      y="0px"
      width="500px"
      height="500px"
      viewBox="0 0 500 500"
      enableBackground="new 0 0 500 500"
      xmlSpace="preserve"
    >
      <path
        stroke={redFlash}
        strokeWidth="2"
        strokeMiterlimit="10"
        fill={black}
        d="M-0.899,250c0-138.076,111.927-250.002,249.996-250.002c25.711,0,50.514,3.887,73.859,11.096
        L152.731,201.497l63.976-8.252L90.816,370.734l63.974-8.26l-57.455,86.184C37.624,402.972-0.899,330.991-0.899,250z M356.442,24.166
        l-44.803,80.339l70.171-8.253L274.49,255.16l72.238-12.383L127.42,468.42c36.013,20.104,77.502,31.578,121.677,31.578
        C387.164,499.998,499.1,388.071,499.1,250C499.1,150.352,440.794,64.331,356.442,24.166z"
      />
    </svg>
  </div>
);

FlashLogo.propTypes = {
  classes: PropTypes.string,
};

export default FlashLogo;
