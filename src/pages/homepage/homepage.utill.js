export function sort(a, b, newFrist = false) {
  if (a.props.date < b.props.date) {
    return newFrist ? 1 : -1;
  }
  if (a.props.date > b.props.date) {
    return newFrist ? -1 : 1;
  }
  return 0;
}

export function findImageUrl(article) {
  if (!!article && article.multimedia && article.multimedia.length) {
    const multimedia = article.multimedia.find(media => media.subtype === 'blog225');
    return multimedia ? `https://static01.nyt.com/${multimedia.url}` : null;
  }
  return null;
}
