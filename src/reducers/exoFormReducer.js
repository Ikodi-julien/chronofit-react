import { EXOFORM_INPUT_CHANGE, SHOW_EXO_FORM } from "../actions/exoFormActions";

const initialState = {
  name: "",
  desc: "",
  iteration: 1,
  reps: 0,
  duration: 0,
  weight: 0,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case EXOFORM_INPUT_CHANGE:
      return {
        ...state,
        [action.name]: action.value,
      };

    case SHOW_EXO_FORM:
      return {
        ...action.value.exoToShow,
      };

    default:
      return state;
  }
};
export default reducer;
