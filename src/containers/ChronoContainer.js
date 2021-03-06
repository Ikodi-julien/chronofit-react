import { connect } from "react-redux";

import Chrono from "../components/ReadTrainingView/TimeDisplay/Chrono";

import {
  setChronoTime,
  setCurrentExo,
  addChronoToRecord,
} from "../actions/readTrainingActions";

const mapStateToProps = ({ readTraining }, { text }) => ({
  text,
  time: readTraining.chronoCurrentTime,
  isCounting: readTraining.exoPlaying.isCounting,
  timelineIndex: readTraining.timelineIndex,
});

const mapDispatchToProps = (dispatch) => ({
  setChronoTime: (time) => dispatch(setChronoTime(time)),
  setExo: (index) => dispatch(setCurrentExo(index)),
  addChronoToRecord: () => dispatch(addChronoToRecord()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chrono);
