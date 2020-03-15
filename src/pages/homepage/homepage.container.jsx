import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Homepage from './homepage.component';
import * as SELECTOR from '../../reducer/new-york-time/nyt-selector';
import * as ACTION from '../../reducer/new-york-time/nyt-action';

function mapStateToProps() {
  return createStructuredSelector({
    isLoading: SELECTOR.selectIsLoading,
    articles: SELECTOR.selectArticles,
    uiState: SELECTOR.selectUIState,
  });
}

function mapDispathToProps(dispatch) {
  return {
    fetchNextPage: (searchText, sort, page) =>
      dispatch(ACTION.FetchNextPageStart(searchText, sort, page)),
  };
}

export default connect(mapStateToProps, mapDispathToProps)(Homepage);
