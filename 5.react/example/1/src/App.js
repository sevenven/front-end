import { lazy, Suspense } from 'react'
import { BrowserRouter, NavLink, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Loading from './components/Loading'
// import Home from './pages/Home'
// import Hello from './pages/Hello'
// import TodoList from './pages/TodoList'
// import SearchGitHub from './pages/SearchGitHub/3'
// import Count from './pages/Count'
// import Redux from './pages/Redux'
// import ReactRedux from './pages/ReactRedux'
import './App.css';
import './assets/css/bootstrap.css'

const Home = lazy(() => import('./pages/Home'))
const Hello = lazy(() => import('./pages/Hello'))
const TodoList = lazy(() => import('./pages/TodoList'))
const SearchGitHub = lazy(() => import('./pages/SearchGitHub/3'))
const Count = lazy(() => import('./pages/Count'))
const Redux = lazy(() => import('./pages/Redux'))
const ReactRedux = lazy(() => import('./pages/ReactRedux'))
const Hooks = lazy(() => import('./pages/Hooks'))
const Context = lazy(() => import('./pages/Context'))

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
              <NavLink className="list-group-item" to="/hooks" >Hooks</NavLink>
              <NavLink className="list-group-item" to="/context" >Context</NavLink>
            </div>
          </div>
          <div className="col-xs-7">
            <div className="panel">
              <div className="panel-body">
                <Suspense fallback={<Loading />}>
                  <Switch>
                    {/* <Route exact path='/' component={Home} /> */}
                    <Route path='/home' component={Home} />
                    <Route path='/hello' component={Hello} />
                    <Route path='/todolist' component={TodoList} />
                    <Route path='/searchgithub' component={SearchGitHub} />
                    <Route path='/count' component={Count} />
                    <Route path='/redux' component={Redux} />
                    <Route path='/reactredux' component={ReactRedux} />
                    <Route path='/hooks' component={Hooks} />
                    <Route path='/context' component={Context} />
                    <Redirect to='/home/news' />
                  </Switch>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div >
    </BrowserRouter>
  );
}