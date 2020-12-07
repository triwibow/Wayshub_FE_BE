import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// component

import PrivateRoute from './route/PrivateRoute';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Subscribtion from './pages/Subscribtion';
import Detail from './pages/Detail';
import AddVideo from './pages/AddVideo';
import MyChannel from './pages/MyChannel';
import EditChannel from './pages/EditChannel';
import ContentCreator from './pages/ContentCreator';

import {AppContextProvider} from './context/AppContext';

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/subscribtion" component={Subscribtion} />
            <PrivateRoute path="/detail" component={Detail} />
            <PrivateRoute path="/add" component={AddVideo} />
            <PrivateRoute path="/my-channel" component={MyChannel} />
            <PrivateRoute path="/edit-channel" component={EditChannel} />
            <PrivateRoute path="/content-creator" component={ContentCreator} />
          </Switch>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
