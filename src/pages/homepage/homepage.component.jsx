import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import './homepage.style.scss';

import useUIState from './homepage.useUIState';
import { NYT_API_KEY } from '../../Config';
import CardItem from '../../components/cardItem/cardItem.componens';
import LoadingIcon from '../../components/loadingIcon/loadingIcon';
import Loadmore from '../../components/loadmore/loadmore.component';
import { findImageUrl } from './homepage.utill';

function shouldRenderWarning(isDevmode = false) {
  if (!isDevmode) return null;
  return NYT_API_KEY ? <div /> : <div style={{ color: 'red' }}>You do not set API-Key !!</div>;
}

function shouldRenderCartItem(articles = [], history) {
  const cardItem = {};
  articles.forEach(article => {
    cardItem[article._id] = (
      <CardItem
        key={article._id}
        image={findImageUrl(article)}
        header={article.headline.main}
        date={article.pub_date}
        source={article.source}
        info={article.snippet}
        onClick={() => history.push(`/detail?id=${article._id}`)}
      />
    );
  });

  return Object.values(cardItem);
}

const initNewest = 'newest';
const initOldest = 'oldest';
function HomepageComponent({ history, isLoading, articles, fetchNextPage }) {
  const [uiState, handleOnChange, handleOnClick] = useUIState();

  function onShowMoreClick(e) {
    e.preventDefault();
    fetchNextPage(uiState);
  }

  function handleKeydown(e) {
    e.preventDefault();
  }

  return (
    <div className="homepage">
      <div className="tools">
        <div className="tools search-box">
          <label htmlFor="search">
            Search
            <div className="search content">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                id="search"
                type="search"
                name="searchString"
                onChange={handleOnChange}
                value={uiState.searchString}
              />
            </div>
          </label>
        </div>

        <div className="tools select">
          <span
            className={`tools select ${uiState.option === 'newest' ? 'active' : null}`}
            onClick={() => handleOnClick(initNewest)}
            onKeyDown={handleKeydown}
            role="button"
            tabIndex="0"
          >
            Newest
          </span>
          <span
            className={`tools select ${uiState.option !== 'newest' ? 'active' : null}`}
            onClick={() => handleOnClick(initOldest)}
            onKeyDown={handleKeydown}
            role="button"
            tabIndex="0"
          >
            Oldest
          </span>
        </div>
      </div>
      <div className="items-container">
        {process.env.NODE_ENV === 'development' && shouldRenderWarning()}
        {isLoading && <LoadingIcon className="fa-spin loading-icon" />}
        {shouldRenderCartItem(articles, history)}
      </div>
      <Loadmore onClickFn={onShowMoreClick} />
    </div>
  );
}

HomepageComponent.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  isLoading: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchNextPage: PropTypes.func.isRequired,
};

export default HomepageComponent;
