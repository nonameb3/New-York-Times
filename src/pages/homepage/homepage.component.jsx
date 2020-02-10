import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./homepage.style.scss";

import { FetchApiStart } from "../../reducer/new-york-time/nyt-action";
import {
  selectArticles,
  selectIsLoading
} from "../../reducer/new-york-time/nyt-selector";
import CardItem from "../../components/cardItem/cardItem.componens";
import LoadingIcon from "../../components/loadingIcon/loadingIcon";
import { sort, findImageUrl } from "./homepage.utill";

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
function HomepageComponent() {
  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState(initNewest);
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
      setSearchString(sessionSearchString);
      dispatch(FetchApiStart(sessionSearchString));
      return;
    }

    window.sessionStorage.setItem("search", searchString);
    dispatch(FetchApiStart(searchString));
  }, [dispatch, searchString]);

  return (
    <div className='homepage'>
      <div className='tools'>
        <i className='fa fa-search search-icon'></i>
        <input
          type='search'
          onChange={e => setSearchString(e.target.value)}
          value={searchString}
        />
        <div className='tools select'>
          <label
            className={`tools select ${sortBy === "newest" ? "active" : null}`}
            onClick={() => setSortBy(initNewest)}>
            Newest
          </label>
          <label
            className={`tools select ${sortBy !== "newest" ? "active" : null}`}
            onClick={() => setSortBy(initOldest)}>
            Oldest
          </label>
        </div>
      </div>
      <div className='items-container'>
        {isLoading ? (
          <LoadingIcon style={{ fontSize: "2rem", marginTop: "5rem" }} />
        ) : (
          shouldRenderCartItem(articles, history, sortBy)
        )}
      </div>
    </div>
  );
}

export default HomepageComponent;
