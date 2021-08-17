import {connect} from 'react-redux';
import ExoInList from '../components/CustomTrainingView/ExoInList/ExoInList';

import {
  showExoForm,
} from '../actions/trainingLocalActions';

const mapStateToProps = ({localTraining, apiTraining}, { isAPI, roundIndex, index }) => {
  let exo, roundShrunken;

  if (isAPI) {
    exo = apiTraining.currentTraining.rounds[roundIndex].exercices[index];
    roundShrunken = () => {
      return apiTraining.currentTraining.rounds[roundIndex].exercices.length > 1 &&  apiTraining.currentTraining.rounds[roundIndex].shrunken ? true : false
    }
  } else {
    exo = localTraining.localTraining.rounds[roundIndex].exercices[index];
    roundShrunken = () => {
      return localTraining.localTraining.rounds[roundIndex].exercices.length > 2 &&  localTraining.localTraining.rounds[roundIndex].shrunken ? true : false
    }
  }
  
  return {
    name: exo.name,
    description: exo.description, 
    iteration: +exo.options[0].iteration,
    duration: +exo.options[0].duration, 
    reps: +exo.options[0].reps, 
    weight: +exo.options[0].weight,
    
    roundShrunken: roundShrunken(),
    roundIndex,
    index,
  }
}

const mapDispatchToProps = (dispatch) => ({
  showExoForm: (roundIndex, exoIndex) => dispatch(showExoForm(roundIndex, exoIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExoInList);