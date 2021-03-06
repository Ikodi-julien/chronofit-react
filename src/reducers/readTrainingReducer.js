import {
  SET_READ_TRAINING,
  SET_CURRENT_EXO,
  ADD_CHRONO_TO_RECORD,
  ADD_COUNTDOWN_TO_RECORD,
  SET_COUNTDOWN_TIME,
  SET_GLOBAL_COUNTDOWN_TIME,
  SET_GLOBAL_CHRONO_TIME,
  SET_CHRONO_TIME,
  SET_ISTRANSITION,
  SET_IS_SPEAKING,
  START_TRAINING,
  PAUSE_TRAINING,
  STOP_TRAINING,
  RESET_READTRAINING,
  END_TRAINING,
  RESET_ALL,
  SET_END_TRAINING_VALUE,
  RESET_TRAININGRECORD,
  DELETE_EXO_FROM_END_TRAINING_RECAP,
} from "../actions/readTrainingActions";
// import trainingServices from '../services/training';
import defaultTimeline from "../data/defaultTimeline";

const initialState = {
  render: 0,
  isSpeaking: true,
  viewOrigin: "",
  timeline: defaultTimeline,
  timelineIndex: 0,
  // TraingDetails
  trainingDetails: {
    name: "",
    type: "",
    duration: "",
    roundIndex: "",
    roundCount: "",
    currentRoundDuration: "",
    timecap: 0,
    finished: false,
  },
  // ExoDetails
  nextExo: {
    name: "",
    serieCount: "",
    reps: "",
    duration: "",
    weight: "",
  },
  previousExo: {
    name: "",
    serieCount: "",
    reps: "",
    duration: "",
    weight: "",
  },
  // ExoPlaying
  exoPlaying: {
    isCounting: false,
    name: "Sélectionner un entrainement",
    description: "",
    serieIndex: "",
    serieCount: "",
    reps: "",
    weight: "",
    // ExoPlaying - TimeDisplay
    duration: "",
    currentTime: "",
    isChrono: "",
    end: false,
    isTransition: false,
  },
  chronoCurrentTime: "",
  countdownCurrentTime: "",
  //GlobalCountdown
  globalCountdown: {
    isCounting: false,
    currentTime: "",
  },
  globalChrono: {
    isCounting: false,
    currentTime: 0,
  },
  // TrainingRecord, to be sent to DB
  trainingRecord: [],
  backupTrainingRecord: [],
};

const reducer = (state = initialState, action = {}) => {
  let { exoIndex } = action || 0;

  switch (action.type) {
    case SET_READ_TRAINING:
      // Passe par un MW avant...
      return {
        ...state,
        viewOrigin: action.viewOrigin,
        timeline: action.timeline,
        trainingDetails: {
          ...state.trainingDetails,
          name: action.trainingDetails.name,
          duration: action.trainingDetails.duration,
          timecap: action.trainingDetails.timecap,
          type: action.trainingDetails.type,
        },
        globalCountdown: {
          ...state.globalCountdown,
          currentTime: action.trainingDetails.timecap,
        },
        globalChrono: {
          isCounting: false,
          currentTime: 0,
        },
      };

    case SET_CURRENT_EXO:
      if (state.timeline[exoIndex].beginning) exoIndex++;
      if (exoIndex < 1) return state; // 5 first seconds or before
      if (exoIndex === state.timeline.length - 1) return state;

      return {
        ...state,
        render: Math.random(),
        timelineIndex: exoIndex,
        trainingDetails: {
          ...state.trainingDetails,
          roundIndex: state.timeline[exoIndex].roundIndex,
          roundCount: state.timeline[exoIndex].roundCount,
          roundTotalIteration: state.timeline[exoIndex].roundTotalIteration,
          roundCurrentIteration: state.timeline[exoIndex].roundCurrentIteration,
          currentRoundDuration: state.timeline[exoIndex].roundDuration,
          finished: false,
        },
        // ExoDetails
        nextExo: {
          ...state.nextExo,
          name: state.timeline[exoIndex + 1].name,
          serieCount: state.timeline[exoIndex + 1].serieCount,
          reps: state.timeline[exoIndex + 1].reps,
          duration: state.timeline[exoIndex + 1].duration,
          weight: state.timeline[exoIndex + 1].weight,
        },
        previousExo: {
          ...state.previousExo,
          name: state.timeline[exoIndex - 1]
            ? state.timeline[exoIndex - 1].name
            : "",
          serieCount: state.timeline[exoIndex - 1]
            ? state.timeline[exoIndex - 1].serieCount
            : "",
          reps: state.timeline[exoIndex - 1]
            ? state.timeline[exoIndex - 1].reps
            : "",
          duration: state.timeline[exoIndex - 1]
            ? state.timeline[exoIndex - 1].duration
            : "",
          weight: state.timeline[exoIndex - 1]
            ? state.timeline[exoIndex - 1].weight
            : "",
        },
        // ExoPlaying
        exoPlaying: {
          ...state.exoPlaying,
          name: state.timeline[exoIndex].name,
          description: state.timeline[exoIndex].description,
          serieIndex: state.timeline[exoIndex].serieIndex,
          serieCount: state.timeline[exoIndex].serieCount,
          reps: state.timeline[exoIndex].reps,
          weight: state.timeline[exoIndex].weight,
          duration: state.timeline[exoIndex].duration,
          currentTime: state.timeline[exoIndex].duration,
          isChrono: state.timeline[exoIndex].duration === 0 ? true : false,
          isTransition: true,
          end: state.timeline[exoIndex].end,
        },
        chronoCurrentTime: 0,
        countdownCurrentTime: state.timeline[exoIndex].duration,
      };

    case ADD_CHRONO_TO_RECORD:
      // if (state.timelineIndex < 2) return state;
      return {
        ...state,
        trainingRecord: [
          ...state.trainingRecord,
          {
            name: state.exoPlaying.name,
            description: state.exoPlaying.description,
            duration: Math.round(state.chronoCurrentTime * 10) / 10,
            reps: state.exoPlaying.reps,
            weight: state.exoPlaying.weight,
          },
        ],
      };

    case ADD_COUNTDOWN_TO_RECORD:
      if (state.timelineIndex < 2) return state;
      return {
        ...state,
        trainingRecord: [
          ...state.trainingRecord,
          {
            name: state.exoPlaying.name,
            description: state.exoPlaying.description,
            duration:
              Math.round(
                (state.exoPlaying.duration - state.countdownCurrentTime) * 10
              ) / 10,
            reps: state.exoPlaying.reps,
            weight: state.exoPlaying.weight,
          },
        ],
      };

    case START_TRAINING:
      return {
        ...state,
        exoPlaying: {
          ...state.exoPlaying,
          isCounting: true,
        },
        globalCountdown: {
          ...state.globalCountdown,
          isCounting: true,
        },
        globalChrono: {
          ...state.globalChrono,
          isCounting: true,
        },
      };

    case PAUSE_TRAINING:
      return {
        ...state,
        exoPlaying: {
          ...state.exoPlaying,
          isCounting: false,
        },
      };

    case STOP_TRAINING:
      return {
        ...state,
        exoPlaying: {
          ...state.exoPlaying,
          isCounting: false,
        },
        globalCountdown: {
          ...state.globalCountdown,
          isCounting: false,
        },
        globalChrono: {
          ...state.globalChrono,
          isCounting: false,
        },
      };

    case SET_COUNTDOWN_TIME:
      return {
        ...state,
        countdownCurrentTime: action.time,
      };

    case SET_CHRONO_TIME:
      return {
        ...state,
        chronoCurrentTime: action.time,
      };

    case SET_GLOBAL_COUNTDOWN_TIME:
      return {
        ...state,
        globalCountdown: {
          ...state.globalCountdown,
          currentTime: action.time,
        },
      };

    case SET_GLOBAL_CHRONO_TIME:
      return {
        ...state,
        globalChrono: {
          ...state.globalChrono,
          currentTime: action.time,
        },
      };

    case SET_ISTRANSITION:
      return {
        ...state,
        exoPlaying: {
          ...state.exoPlaying,
          isTransition: action.value,
        },
      };

    case SET_IS_SPEAKING:
      return {
        ...state,
        isSpeaking: action.value,
      };

    case RESET_READTRAINING:
      return {
        ...state,
        timelineIndex: 1,
        // TraingDetails
        trainingDetails: {
          ...state.trainingDetails,
          roundIndex: 1,
          currentRoundDuration: "",
        },
        nextExo: {
          name: "",
          serieCount: "",
          reps: "",
          duration: "",
          weight: "",
        },
        // ExoPlaying
        exoPlaying: {
          ...state.exoPlaying,
          isCounting: false,
          name: state.timeline[1].name,
          description: state.timeline[1].description,
          serieIndex: state.timeline[1].serieIndex,
          serieCount: state.timeline[1].serieCount,
          reps: state.timeline[1].reps,
          weight: state.timeline[1].weight,
          duration: state.timeline[1].duration,
          currentTime: state.timeline[1].duration,
          isChrono: state.timeline[1].duration === 0 ? true : false,
          end: state.timeline[1].end,
        },
        chronoCurrentTime: 0,
        countdownCurrentTime: state.timeline[1].duration,
        //GlobalCountdown
        globalCountdown: {
          isCounting: false,
          currentTime: state.trainingDetails.timecap,
        },
        globalChrono: {
          isCounting: false,
          currentTime: 0,
        },
        trainingRecord: [],
      };

    case END_TRAINING:
      return {
        ...state,
        trainingDetails: {
          ...state.trainingDetails,
          finished: true,
        },
        exoPlaying: {
          ...state.exoPlaying,
          isCounting: false,
        },
        chronoCurrentTime: 0,
        countdownCurrentTime: 0,
        globalCountdown: {
          ...state.globalCountdown,
          isCounting: false,
        },
        globalChrono: {
          ...state.globalChrono,
          isCounting: false,
        },
        backupTrainingRecord: state.trainingRecord.map((exo) => exo),
      };

    case RESET_ALL:
      return initialState;

    case SET_END_TRAINING_VALUE:
      const trainingRecord = state.trainingRecord;
      const exoToChange = trainingRecord[action.index];
      const exoChanged = { ...exoToChange, [action.name]: action.value };
      trainingRecord[action.index] = exoChanged;
      return {
        ...state,
        trainingRecord,
        render: state.render + 1,
      };

    case DELETE_EXO_FROM_END_TRAINING_RECAP:
      console.log(action);

      if (window.confirm("Supprimer la ligne sélectionnée ?")) {
        const data = state.trainingRecord.filter(
          (exo) => exo !== state.trainingRecord[action.value]
        );

        return { ...state, trainingRecord: data };
      }
      return { ...state };

    case RESET_TRAININGRECORD:
      return {
        ...state,
        trainingRecord: state.backupTrainingRecord.map((exo) => exo),
      };

    default:
      return state;
  }
};

export default reducer;
