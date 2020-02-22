import React from 'react';
import PropTypes from 'prop-types';
import './loadmore.style.scss';

import LoadingIcon from '../loadingIcon/loadingIcon';

const visibleStyles = {
  opacity: 1,
  fontSize: '1.5rem',
  position: 'absolute',
};
const hiddenStyles = { opacity: 0 };
function LoadmoreComponent({ isVisible, isLoading, onClickFn }) {
  return (
    <div className={`showmore-layout ${isVisible ? '' : 'hidden'}`}>
      <LoadingIcon style={isLoading ? visibleStyles : hiddenStyles} />
      <span
        onClick={onClickFn}
        onKeyDown={e => e.preventDefault()}
        style={!isLoading ? {} : hiddenStyles}
        role="button"
        tabIndex="0"
      >
        <h4>Show more</h4>
      </span>
    </div>
  );
}

LoadmoreComponent.propTypes = {
  isVisible: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClickFn: PropTypes.instanceOf(Object),
};

LoadmoreComponent.defaultProps = {
  isVisible: false,
  isLoading: false,
  onClickFn: () => null,
};

export default React.memo(LoadmoreComponent);
