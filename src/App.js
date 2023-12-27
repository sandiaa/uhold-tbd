import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserInput from './components/UserInput';
import Landing from './components/Landing';
import FolderViewer from './components/FolderViewer';
import BrandLoginPage from './components/BrandLoginPage';
import BrandFilesView from './components/BrandFilesView';
import MainPage from './components/MainPage';
import PublicFileViewer from './components/PublicFileViewer';
import { Provider } from 'react-redux';
import store from './helper/redux/store';
function App() {
  return (
    <Provider store={store}>
    <Router>
    <Switch>
      <Route exact path="/" component={UserInput} />
      <Route exact path="/landing" component={Landing} />
      <Route exact path="/mainPage" component={MainPage}/>
      <Route exact path="/brandLogin/:protocolLink" component={BrandLoginPage} />
      <Route exact path="/landing" component={Landing} />
      <Route exact path="/folderView/:id" component={FolderViewer} />
      <Route exact path="/brandFilesView/:id" component={BrandFilesView} />
      <Route exact path="/publicFileSearch" component={PublicFileViewer} />
    </Switch>
  </Router>
  </Provider>
  );
}

export default App;
