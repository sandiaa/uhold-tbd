import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserInput from './components/UserInput';
import Landing from './components/Landing';
import FolderViewer from './components/FolderViewer';
function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={UserInput} />
      <Route exact path="/landing" component={Landing} />
      <Route exact path="/folderView/:id" component={FolderViewer} />
    </Switch>
  </Router>
  
  );
}

export default App;
