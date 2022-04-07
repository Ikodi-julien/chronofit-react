import Landing from "../Landing/Landing";
import GirlViewContainer from "../../containers/GirlViewContainer";
import CustomTrainingView from "../../containers/CustomTrainingViewContainer";
import ReadTrainingContainer from "../../containers/ReadTrainingContainer";
import EndTrainingContainer from "../../containers/EndTrainingContainer";
import AppCommentContainer from "../../containers/AppCommentContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./app.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <AppCommentContainer />
        <Switch>
          <Route path="/girls">
            <GirlViewContainer />
          </Route>
          <Route path="/custom_training">
            <CustomTrainingView />
          </Route>
          <Route path="/read_training">
            <ReadTrainingContainer />
          </Route>
          <Route path="/end_test">
            <EndTrainingContainer />
          </Route>
          {/* /search : SearchTrainingsView, entrainements réalisés avec tris */}
          {/* /exercices pour voir les exos benchmarks proposés */}
          {/* /connexion pour les forms de connexion */}
          {/* /user pour la gestion des données utilisateur */}
          {/* /stats : StatsView stats et graphs, */}
          {/* /diary : DiaryView, calendrier entrainements */}
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
