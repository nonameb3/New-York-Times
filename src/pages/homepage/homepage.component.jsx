import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./homepage.style.scss";

import { FectApiStart } from "../../reducer/new-york-time/nyt-action";
import {
  selectArticles,
  selectIsLoading
} from "../../reducer/new-york-time/nyt-selector";
import CardItem from "../../components/cardItem/cardItem.componens";

function filter(article, searchInput) {
  if (!searchInput) return article;
  return article.headline.main.toLowerCase().search(searchInput) !== -1;
}

function sort(a, b, newFrist = false) {
  if (a.props.date < b.props.date) {
    return newFrist ? 1 : -1;
  } else if (a.props.date > b.props.date) {
    return newFrist ? -1 : 1;
  }
  return 0;
}

function findImageUrl(article) {
  if (!article) return null;

  if (article.multimedia && article.multimedia.length) {
    const multimedia = article.multimedia.find(
      media => media.subtype === "tmagArticle"
    );
    return multimedia ? `https://static01.nyt.com/${multimedia.url}` : null;
  }
}

const initNewest = 'newest';
const initOldest = 'oldest';
function HomepageComponent() {
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState(initNewest);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, articles } = useSelector(state => ({
    isLoading: selectIsLoading(state),
    articles: selectArticles(state)
  }));

  // role same as compoentDidmount
  useEffect(() => {
    dispatch(FectApiStart());
  }, [dispatch]);

  return (
    <div className='homepage'>
      <div className='tools'>
        <i className='fa fa-search search-icon'></i>
        <input type='search' onChange={e => setSearchInput(e.target.value)} />
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
          <i
            className='fa fa-spinner fa-spin'
            style={{ fontSize: "2rem", marginTop: "5rem" }}
          />
        ) : (
          articles
            .filter(article => filter(article, searchInput))
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
            .sort((a, b) => sort(a, b, sortBy === initNewest))
        )}
      </div>
    </div>
  );
}

export default HomepageComponent;
