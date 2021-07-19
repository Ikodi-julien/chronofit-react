import {
  ADD_EXO, 
  EXO_INPUT_CHANGE,
  SHOW_EXOINLISTMENU,
  EXO_IN_LIST_INPUT_CHANGE,
  SET_TRAINING_ID
} from '../actions/trainingViewActions';
import {
  GET_TRAININGS_SUCCESS,
  GET_CURRENT_TRAINING_SUCCESS,
} from '../actions/trainingAjaxActions';
/*----------------------------------*/
import {currentTraining} from '../data/currentTraining';
import {allTrainings} from '../data/allTrainings';
/*----------------------------------*/
const initialState = {
  currentTrainingId: 0,
  currentTraining: {},
  allTrainings: [],
}

const reducer = (state=initialState, action={}) => {
  
  switch (action.type) {
    case EXO_INPUT_CHANGE:
      return {
        ...state,
        exoForm: {
          ...state.exoForm,
          [action.name]: {value: action.value}
        }
      }
      
    case ADD_EXO:
      const {nameInput, descInput, durationInput, repsInput, weightInput} = state.exoForm;
      console.log(nameInput, descInput, durationInput, repsInput, weightInput);
      // Vérification du contenu des inputs et du type de value
      if (!nameInput.value || !descInput.value ) {
        console.log('1er');
        return state
      };

      if (
        (nameInput.value && typeof nameInput.value !== 'string') ||
        (descInput.value && typeof descInput.value !== 'string') ||
        (durationInput.value && typeof durationInput.value !== 'string') ||
        (repsInput.value && typeof repsInput.value !== 'string' )||
        (weightInput.value && typeof weightInput.value !== 'string')
      ) {
        console.log('2em')
        return state
      }
      
      return {
        ...state,
        exoList: [
          ...state.exoList,
          {
            name: nameInput.value,
            description: descInput.value,
            duration: +durationInput.value,
            reps: +repsInput.value,
            weight: +weightInput.value
          }
        ]
      }
    
      /* EXO_IN_LIST */
      
    case SHOW_EXOINLISTMENU:
      // When there's a click on a burger button wich is on an exo in the list.
      const newExoList = state.exoList.map((exo, index) => {
        if (index === action.index) exo.menuIsVisible = !exo.menuIsVisible;
        if (index !== action.index) exo.menuIsVisible = false;
        return exo;
      })
      
      return {
        ...state,
        exoList: newExoList
      }
    
    case EXO_IN_LIST_INPUT_CHANGE:
      // console.log('un input change dans exo in list');
      return {
        ...state
      }
      
    case GET_TRAININGS_SUCCESS:
      // console.log(action);
      return {
        ...state,
        allTrainings: action.data,
      }
    
    case SET_TRAINING_ID:
      return {
        ...state,
        currentTrainingId: action.value,
      }
      
    case GET_CURRENT_TRAINING_SUCCESS:
      return {
        ...state,
        currentTraining: action.data,
      }
      
    default:
      return state;
  }
}

export default reducer;