export function findImageUrl(article) {
  if(!article) return null;

  if (article.multimedia && article.multimedia.length) {
    const multimedia = article.multimedia.find(
      media => media.subtype === "tmagArticle"
    );
    return multimedia ? `https://static01.nyt.com/${multimedia.url}` : null;
  }
}
