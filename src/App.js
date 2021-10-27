import logo from './logo.svg';
import './App.css';
import "@material-tailwind/react/tailwind.css";
import Sidebar from './components/header';
import {BrowserRouter as Router, Route,Link,Switch,} from 'react-router-dom'
import Welcome from './components/welcome';
import Login from './components/login';
import SignIn from './components/signIn';
import Cours from './components/cours';
import Prof from './components/prof';
import Archives from './components/archives';
import ListProf from './components/listProf';
import ListApprenant from './components/listApprenant';
import Modal from './components/modal';


function App() {
  return (
    // <div className="App">
     <Router>					
					<Switch>
						<Route path='/' exact>
							<Login />
						</Route>
						
					</Switch>
					
						<Switch>
						<Route path='/welcome' exact>
							<Sidebar />
						
						<Welcome />
						</Route>

						<Route path='/cours' exact>
							<Sidebar />
							<Cours />		
						</Route>
						<Route path='/prof' exact>
							<Sidebar />
							<Prof />		
						</Route>
						<Route path='/archives' exact>
							<Sidebar />
							<Archives />		
						</Route>
						
						<Route path='/listprof' exact>
							<Sidebar />
							<ListProf />		
						</Route>
						<Route path='/listapprenant' exact>
							<Sidebar />
							<ListApprenant />		
						</Route>


						<Route path='/signin' exact>
							<Sidebar />
							<SignIn />		
						</Route>
						<Route path='/mod' exact>
							<Sidebar />
							<Modal />		
						</Route>
						</Switch>
						
					
			</Router>		
    // </div>
	
  );
}

export default App;
