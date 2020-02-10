export function sort(a, b, newFrist = false) {
  if (a.props.date < b.props.date) {
    return newFrist ? 1 : -1;
  } else if (a.props.date > b.props.date) {
    return newFrist ? -1 : 1;
  }
  return 0;
}

export function findImageUrl(article) {
  if (!article) return null;

  if (article.multimedia && article.multimedia.length) {
    const multimedia = article.multimedia.find(
      media => media.subtype === "tmagArticle"
    );
    return multimedia ? `https://static01.nyt.com/${multimedia.url}` : null;
  }
}
