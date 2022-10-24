import "./App.css";
import DayList from "./component/DayList";
import Header from "./component/Header";
import Day from "./component/Day";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/">
                        <DayList />
                    </Route>
                    <Route path="/day">
                        <Day />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
