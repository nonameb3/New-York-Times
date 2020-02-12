import React, { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./homepage.style.scss";

import { NYT_API_KEY } from "../../Config";
import * as ACTION from "../../reducer/new-york-time/nyt-action";
import * as SELECTOR from "../../reducer/new-york-time/nyt-selector";
import CardItem from "../../components/cardItem/cardItem.componens";
import LoadingIcon from "../../components/loadingIcon/loadingIcon";
import Loadmore from "../../components/loadmore/loadmore.component";
import { findImageUrl } from "./homepage.utill";

function shouldRenderWarning(isDevmode = false) {
  if (!isDevmode) return;

  return NYT_API_KEY ? null : (
    <div style={{ color: "red" }}>You do not set API-Key !!</div>
  );
}

function shouldRenderCartItem(articles = [], history) {
  let cardItem = {};
  articles.forEach(article => {
    const props = {
      key: article._id,
      image: findImageUrl(article),
      header: article.headline.main,
      date: article.pub_date,
      source: article.source,
      info: article.snippet,
      onClick: () => history.push(`/detail?id=${article._id}`)
    };

    cardItem[article._id] = <CardItem {...props} />;
  });

  // validate same id of data
  return Object.values(cardItem);
}

const visibleStyles = {
  opacity: 1,
  fontSize: "2.5rem",
  marginTop: "5rem",
  position: "absolute"
};
const hiddenStyles = { opacity: 0 };
const initNewest = "newest";
const initOldest = "oldest";
function HomepageComponent() {
  const didMountRef = useRef(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector(
    createStructuredSelector({
      isLoading: SELECTOR.selectIsLoading,
      isNewOpen: SELECTOR.selectIsNewOpen,
      articles: SELECTOR.selectArticles,
      searchOption: SELECTOR.selectSearchOption,
      isNextPageLoading: SELECTOR.selectIsNextPageLoading
    })
  );

  const [state, setState] = useState({
    searchString: store.searchOption.searchString,
    sortBy: store.searchOption.option
  });

  // rold same as componentDidMount + componentDiDUpdate
  // handel when state change
  useEffect(() => {
    if (!didMountRef.current) return;
    dispatch(ACTION.FetchApiStart(state.searchString, state.sortBy));
  }, [dispatch, state]);

  //handel on fist time loading
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      if (store.isNewOpen) dispatch(ACTION.FetchApiStart("", initNewest));
    }
  }, [dispatch, store.isNewOpen]);

  const reanderCard = useCallback(
    () => shouldRenderCartItem(store.articles, history),
    [store.articles, history]
  );

  const onShowMoreClick = useCallback(
    () =>
      dispatch(
        ACTION.FetchNextPageStart(
          state.searchString,
          state.sortBy,
          store.searchOption.page + 1
        )
      ),
    [dispatch,state, store.searchOption.page]
  );

  return (
    <div className='homepage'>
      <div className='tools'>
        <div className='tools search-box'>
          <label htmlFor='search'>Search</label>
          <FontAwesomeIcon icon={faSearch} className='search-icon' />
          <input
            id='search'
            type='search'
            onChange={e => setState({ ...state, searchString: e.target.value })}
            value={state.searchString}
          />
        </div>

        <div className='tools select'>
          <label
            className={`tools select ${
              state.sortBy === "newest" ? "active" : null
            }`}
            onClick={() => setState({ ...state, sortBy: initNewest })}>
            Newest
          </label>
          <label
            className={`tools select ${
              state.sortBy !== "newest" ? "active" : null
            }`}
            onClick={() => setState({ ...state, sortBy: initOldest })}>
            Oldest
          </label>
        </div>
      </div>
      <div className='items-container'>
        {shouldRenderWarning(process.env.NODE_ENV === "development")}
        <LoadingIcon style={store.isLoading ? visibleStyles : hiddenStyles} />
        <div style={!store.isLoading && !store.articles.length ? {} : hiddenStyles}>Not have any articles.</div>
        {reanderCard()}
      </div>
      <Loadmore
        onClickFn={onShowMoreClick}
        isLoading={store.isNextPageLoading}
        isVisible={store.articles.length >= 1}
      />
    </div>
  );
}

export default HomepageComponent;
