import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import DetailItem from '../../components/detailItem/detailItem.component';

function DetailComponent() {
  const { isLoading, articles } = useSelector(state => state.nytData);
  const location = useLocation();
  const values = queryString.parse(location.search);

  const article = articles.find(article => article._id === values.id);
  console.log(article);

  let imageUrl;
  // find image url
  if (article.multimedia.length) {
    const multimedia = article.multimedia.find(
      media => media.subtype === "tmagArticle"
    );
    imageUrl = multimedia ? `https://static01.nyt.com/${multimedia.url}` : null;
  }
  const header = article.headline.main;
  const date = article.pub_date;
  const source = article.source;
  const abstract = article.abstract;
  const paragraph = article.lead_paragraph;
  const original = article.byline ? article.byline.original : null;

  return (
    <React.Fragment>
      {article && (
        <DetailItem
          imageUrl={imageUrl}
          header={header}
          date={date}
          source={source}
          abstract={abstract}
          paragraph={paragraph}
          original={original}
        />
      )}
    </React.Fragment>
  );
}

export default DetailComponent;
