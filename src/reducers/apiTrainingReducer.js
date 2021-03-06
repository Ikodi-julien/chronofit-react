import {
  SET_TRAINING_ID,
  SET_SHRUNKEN_API_ROUND,
  SET_TYPE_SELECTED,
} from "../actions/trainingViewActions";
import {
  GET_CURRENT_TRAINING_SUCCESS,
  GET_GIRLS,
  GET_GIRLS_SUCCESS,
  GET_ONE_GIRL,
  GOT_ERROR,
} from "../actions/trainingAjaxActions";
import { RESET_ALL, RESET_READTRAINING } from "../actions/readTrainingActions";

const initialState = {
  girls: [],
  getGirlsSuccess: false,
  getOneIsLoading: false,
  currentTrainingId: 0,
  currentTraining: {},
  trainingIsSet: false,
  typeSelected: "all",
};

const reducer = (state = initialState, action = {}) => {
  const { rounds } = state.currentTraining;

  switch (action.type) {
    case GET_GIRLS:
      return {
        ...state,
        getGirlsSuccess: false,
      };
    case GET_GIRLS_SUCCESS:
      return {
        ...state,
        girls: action.value,
        getGirlsSuccess: true,
      };
    case GET_ONE_GIRL:
      return {
        ...state,
        getOneIsLoading: true,
      };

    case GET_CURRENT_TRAINING_SUCCESS:
      return {
        ...state,
        currentTraining: action.data,
        trainingIsSet: true,
        getOneIsLoading: false,
      };

    case SET_TRAINING_ID:
      return {
        ...state,
        currentTrainingId: action.value,
      };

    case SET_SHRUNKEN_API_ROUND:
      rounds[action.value.index].shrunken = action.value.bool;

      return {
        ...state,
        currentTraining: {
          ...state.currentTraining,
          rounds,
        },
      };

    case SET_TYPE_SELECTED:
      return {
        ...state,
        typeSelected: action.value,
      };

    case GOT_ERROR:
      return {
        ...state,
        getOneIsLoading: false,
      };

    case RESET_ALL:
    case RESET_READTRAINING:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
