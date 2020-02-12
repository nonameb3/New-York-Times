import React, { useRef, useEffect, useState } from "react";
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
  if (!articles.length) return <div>Not have any articles.</div>;

  return articles.map(article => (
    <CardItem
      key={article._id}
      image={findImageUrl(article)}
      header={article.headline.main}
      date={article.pub_date}
      source={article.source}
      info={article.snippet}
      onClick={() => history.push(`/detail?id=${article._id}`)}
    />
  ));
}

const initNewest = "newest";
const initOldest = "oldest";
function HomepageComponent() {
  const didMountRef = useRef(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isLoading,
    articles,
    searchOption,
    isNewOpen,
    isNextPageLoading
  } = useSelector(
    createStructuredSelector({
      isLoading: SELECTOR.selectIsLoading,
      isNewOpen: SELECTOR.selectIsNewOpen,
      articles: SELECTOR.selectArticles,
      searchOption: SELECTOR.selectSearchOption,
      isNextPageLoading: SELECTOR.selectIsNextPageLoading
    })
  );

  const [state, setState] = useState({
    searchString: searchOption.searchString,
    sortBy: searchOption.option,
    page: searchOption.page
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
      if (isNewOpen) dispatch(ACTION.FetchApiStart("", initNewest));
    }
  }, [dispatch, isNewOpen]);

  const onShowMoreClick = () =>
    dispatch(
      ACTION.FetchNextPageStart(state.searchString, state.sortBy, ++state.page)
    );

  return (
    <div className="homepage">
      <div className="tools">
        <div className="tools search-box">
          <label htmlFor="search">Search</label>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            id="search"
            type="search"
            onChange={e => setState({ ...state, searchString: e.target.value })}
            value={state.searchString}
          />
        </div>

        <div className="tools select">
          <label
            className={`tools select ${
              state.sortBy === "newest" ? "active" : null
            }`}
            onClick={() => setState({ ...state, sortBy: initNewest })}
          >
            Newest
          </label>
          <label
            className={`tools select ${
              state.sortBy !== "newest" ? "active" : null
            }`}
            onClick={() => setState({ ...state, sortBy: initOldest })}
          >
            Oldest
          </label>
        </div>
      </div>
      <div className="items-container">
        {shouldRenderWarning(process.env.NODE_ENV === "development")}
        {isLoading ? (
          <LoadingIcon style={{ fontSize: "2.5rem", marginTop: "5rem" }} />
        ) : (
          shouldRenderCartItem(articles, history)
        )}
      </div>
      {articles.length > 1 && (
        <Loadmore onClickFn={onShowMoreClick} isLoading={isNextPageLoading} />
      )}
    </div>
  );
}

export default HomepageComponent;
