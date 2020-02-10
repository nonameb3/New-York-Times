import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import './detail.style.scss';

import { selectArticles, selectIsLoading } from '../../reducer/new-york-time/nyt-selector';
import DetailItem from "../../components/detailItem/detailItem.component";
import { findImageUrl } from './detail.utill';

function DetailComponent() {
  const history = useHistory();
  const location = useLocation();
  const { isLoading, articles } = useSelector(state => ({
    isLoading: selectIsLoading(state),
    articles: selectArticles(state)
  }));
  const values = queryString.parse(location.search);
  const article = articles.find(article => article._id === values.id);

  // return to homepage if not fetch api or can't find articles
  if(isLoading || !articles) history.push("/");

  return (
    <div className="detail-page">
      {article && (
        <React.Fragment>
          <i className='fa fa-arrow-left' onClick={() => history.push("/")}></i>
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
