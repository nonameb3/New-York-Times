import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import './detail.style.scss';

import DetailItem from '../../components/detailItem/detailItem.component';
import findImageUrl from './detail.utill';

function DetailComponent({ history, location, articles }) {
  const values = queryString.parse(location.search);
  const article = articles.find(listArticle => listArticle._id === values.id);

  useEffect(() => {
    if (!articles.length) {
      history.push('/');
    }
  }, [articles, history]);

  return (
    <div className="detail-page">
      {article && (
        <>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="arrow-icon"
            onClick={() => history.push('/')}
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
        </>
      )}
    </div>
  );
}

DetailComponent.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object),
};

DetailComponent.defaultProps = {
  articles: [],
};

export default DetailComponent;
