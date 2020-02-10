import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./homepage.style.scss";

import { NYT_API_KEY } from "../../Config";
import { FetchApiStart } from "../../reducer/new-york-time/nyt-action";
import {
  selectArticles,
  selectIsLoading
} from "../../reducer/new-york-time/nyt-selector";
import CardItem from "../../components/cardItem/cardItem.componens";
import LoadingIcon from "../../components/loadingIcon/loadingIcon";
import { sort, findImageUrl } from "./homepage.utill";

function shouldRenderWarning(isDevmode = false) {
  if (!isDevmode) return;

  return NYT_API_KEY ? null : (
    <div style={{ color: "red" }}>You do not set API-Key !!</div>
  );
}

function shouldRenderCartItem(articles = [], history, sortBy) {
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
    .sort((a, b) => sort(a, b, sortBy === initNewest));
}

const initNewest = "newest";
const initOldest = "oldest";
const initalState = {
  searchString: "",
  sortBy: initNewest
};
function HomepageComponent() {
  const [state, setState] = useState(initalState);
  const isFirstRun = useRef(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, articles } = useSelector(state => ({
    isLoading: selectIsLoading(state),
    articles: selectArticles(state)
  }));

  // rold same as componentDidMount + componentDiDUpdate
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      const sessionSearchString = window.sessionStorage.getItem("search");
      const sessionOption = window.sessionStorage.getItem("option");
      setState({
        searchString: sessionSearchString,
        sortBy: sessionOption
      });
      if (sessionSearchString === state.searchString) {
        dispatch(FetchApiStart(state.searchString));
      }
      return;
    }

    dispatch(FetchApiStart(state.searchString));
  }, [dispatch, state.searchString]);

  useEffect(() => {
    window.sessionStorage.setItem("search", state.searchString);
    window.sessionStorage.setItem("option", state.sortBy);
  }, [state]);

  return (
    <div className='homepage'>
      <div className='tools'>
        <i className='fa fa-search search-icon'></i>
        <input
          type='search'
          onChange={e => setState({ ...state, searchString: e.target.value })}
          value={state.searchString}
        />
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
          shouldRenderCartItem(articles, history, state.sortBy)
        )}
      </div>
    </div>
  );
}

export default HomepageComponent;
