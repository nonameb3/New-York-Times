import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./homepage.style.scss";

import { NYT_API_KEY } from "../../Config";
import { FetchApiStart } from "../../reducer/new-york-time/nyt-action";
import {
  selectSearchOption,
  selectArticles,
  selectIsLoading
} from "../../reducer/new-york-time/nyt-selector";
import CardItem from "../../components/cardItem/cardItem.componens";
import LoadingIcon from "../../components/loadingIcon/loadingIcon";
import { findImageUrl } from "./homepage.utill";

function shouldRenderWarning(isDevmode = false) {
  if (!isDevmode) return;

  return NYT_API_KEY ? null : (
    <div style={{ color: "red" }}>You do not set API-Key !!</div>
  );
}

function shouldRenderCartItem(articles = [], history) {
  if (!articles.length) return <div>Not have any articles.</div>;

  return articles
    .map(article => (
      <CardItem
        key={article._id}
        image={findImageUrl(article)}
        header={article.headline.main}
        date={article.pub_date}
        source={article.source}
        info={article.snippet}
        onClick={() => history.push(`/detail?id=${article._id}`)}
      />
    ))
}

const initNewest = "newest";
const initOldest = "oldest";
function HomepageComponent() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, articles, searchOption } = useSelector(state => ({
    isLoading: selectIsLoading(state),
    articles: selectArticles(state),
    searchOption: selectSearchOption(state)
  }));
  const [state, setState] = useState({
    searchString: searchOption.searchString,
    sortBy: searchOption.option
  });

  // rold same as componentDidMount + componentDiDUpdate
  useEffect(() => {
    dispatch(FetchApiStart(state.searchString, state.sortBy));
  }, [dispatch, state]);

  return (
    <div className='homepage'>
      <div className='tools'>
        <div className="tools search-box">
          <label htmlFor="search">Search</label>
          <FontAwesomeIcon icon ={faSearch} className="search-icon"/>
          <input
            id="search"
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
        {isLoading ? (
          <LoadingIcon style={{ fontSize: "2rem", marginTop: "5rem" }} />
        ) : (
          shouldRenderCartItem(articles, history)
        )}
      </div>
    </div>
  );
}

export default HomepageComponent;
