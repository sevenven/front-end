import { BrowserRouter, NavLink, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Hello from './pages/Hello'
import TodoList from './pages/TodoList'
import SearchGitHub from './pages/SearchGitHub/3'
import Count from './pages/Count'
import Redux from './pages/Redux'
import ReactRedux from './pages/ReactRedux'
import './App.css';
import './assets/css/bootstrap.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="row">
          <div className="col-xs-offset-2 col-xs-9">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* <NavLink exact className="list-group-item" to="/">Home</NavLink> */}
              <NavLink exact className="list-group-item" to="/home">Home</NavLink>
              <NavLink className="list-group-item" to="/hello">Hello</NavLink>
              <NavLink className="list-group-item" to="/todolist" >TodoList</NavLink>
              <NavLink className="list-group-item" to="/searchgithub" >SearchGitHub</NavLink>
              <NavLink className="list-group-item" to="/count" >Count</NavLink>
              <NavLink className="list-group-item" to="/redux" >Redux</NavLink>
              <NavLink className="list-group-item" to="/reactredux" >ReactRedux</NavLink>
            </div>
          </div>
          <div className="col-xs-7">
            <div className="panel">
              <div className="panel-body">
                <Switch>
                  {/* <Route exact path='/' component={Home} /> */}
                  <Route path='/home' component={Home} />
                  <Route path='/hello' component={Hello} />
                  <Route path='/todolist' component={TodoList} />
                  <Route path='/searchgithub' component={SearchGitHub} />
                  <Route path='/count' component={Count} />
                  <Route path='/redux' component={Redux} />
                  <Route path='/reactredux' component={ReactRedux} />
                  <Redirect to='/home/news' />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div >
    </BrowserRouter>
  );
}