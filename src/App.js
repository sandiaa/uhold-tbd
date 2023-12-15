import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserInput from './components/UserInput';
import Landing from './components/Landing';
import FolderViewer from './components/FolderViewer';
import BrandLoginPage from './components/BrandLoginPage';
import BrandFilesView from './components/BrandFilesView';
function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={UserInput} />
      <Route exact path="/brandLogin/:protocolLink" component={BrandLoginPage} />
      <Route exact path="/landing" component={Landing} />
      <Route exact path="/folderView/:id" component={FolderViewer} />
      <Route exact path="/brandFilesView/:id" component={BrandFilesView} />
    </Switch>
  </Router>
  
  );
}

export default App;
