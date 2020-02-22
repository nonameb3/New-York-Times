export default article => {
  if (!!article && article.multimedia && article.multimedia.length) {
    const multimedia = article.multimedia.find(media => media.subtype === 'blog480');
    return multimedia ? `https://static01.nyt.com/${multimedia.url}` : null;
  }
  return null;
};
