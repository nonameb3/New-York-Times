import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import "./detail.style.scss";

import {
  selectArticles,
  selectIsFetchData
} from "../../reducer/new-york-time/nyt-selector";
import DetailItem from "../../components/detailItem/detailItem.component";
import { findImageUrl } from "./detail.utill";

function DetailComponent() {
  const history = useHistory();
  const location = useLocation();
  const { isFetchData, articles } = useSelector(state => ({
    isFetchData: selectIsFetchData(state),
    articles: selectArticles(state)
  }));
  const values = queryString.parse(location.search);
  const article = articles.find(article => article._id === values.id);

  // return to homepage if not fetch api or can't find articles
  useEffect(() => {
    if (!isFetchData || !articles) {
      history.push("/");
    }
  }, [isFetchData, articles, history]);

  return (
    <div className='detail-page'>
      {article && (
        <React.Fragment>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className='arrow-icon'
            onClick={() => history.push("/")}
          />
          <DetailItem
            imageUrl={findImageUrl(article)}
            header={article.headline.main}
            date={article.pub_date}
            source={article.source}
            abstract={article.abstract}
            paragraph={article.lead_paragraph}
            webUrl={article.web_url}
            original={article.byline ? article.byline.original : null}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default DetailComponent;
