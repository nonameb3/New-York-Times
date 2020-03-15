import { useDispatch, useSelector } from 'react-redux';

import { selectUIState } from '../../reducer/new-york-time/nyt-selector';
import { ChangeUIState } from '../../reducer/new-york-time/nyt-action';

function useUIState() {
  const uiState = useSelector(state => selectUIState(state));
  const dispatch = useDispatch();

  function handleOnChange({ target }) {
    const newUIState = { ...uiState, [target.name]: target.value };
    dispatch(ChangeUIState(newUIState));
  }

  function handleOnClick(value) {
    const newUIState = { ...uiState, option: value };
    dispatch(ChangeUIState(newUIState));
  }

  return [uiState, handleOnChange, handleOnClick];
}

export default useUIState;
