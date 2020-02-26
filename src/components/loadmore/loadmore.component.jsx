import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './loadmore.style.scss';

import LoadingIcon from '../loadingIcon/loadingIcon';
import { selectIsNextPageLoading, selectArticles } from '../../reducer/new-york-time/nyt-selector';

function LoadmoreComponent({ onClickFn }) {
  const isLoading = useSelector(state => selectIsNextPageLoading(state));
  const isHasActicles = useSelector(state => selectArticles(state));

  return (
    <div className={`showmore-layout ${isHasActicles.length ? '' : 'hidden'}`}>
      {isLoading === true ? (
        <LoadingIcon className="fa-spin loading-icon" />
      ) : (
        <span onClick={onClickFn} onKeyDown={e => e.preventDefault()} role="button" tabIndex="0">
          <h4>Show more</h4>
        </span>
      )}
    </div>
  );
}

LoadmoreComponent.propTypes = {
  onClickFn: PropTypes.instanceOf(Object),
};

LoadmoreComponent.defaultProps = {
  onClickFn: () => null,
};

export default React.memo(LoadmoreComponent);
