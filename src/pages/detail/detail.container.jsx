import { connect } from 'react-redux';

import { selectArticles } from '../../reducer/new-york-time/nyt-selector';
import Detail from './detail.component';

function mapStateToProps(state) {
  return {
    articles: selectArticles(state),
  };
}

export default connect(mapStateToProps)(Detail);
