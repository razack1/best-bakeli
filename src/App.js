import {useState} from 'react';
import './App.css';
import "@material-tailwind/react/tailwind.css";
import Sidebar from './components/header';
import {BrowserRouter as Router, Route,Switch,} from 'react-router-dom'
import Welcome from './components/welcome';
import Login from './components/login';
import SignIn from './components/signIn';
import Cours from './components/cours';
import Modal from './components/modal';
import Prof from './components/prof';
import Archives from './components/archives';
import ListProf from './components/listProf';
import ListApprenant from './components/listApprenant';
import ApprenantHeader from './components/apprenantHead';
import WelcomeApprenant from './components/welcomeApprenant';



function App() {

	const [role, setrole] = useState('');


	console.log(role)

  return (
    // <div className="App">
     <Router>					
					<Switch>
						<Route path='/' exact>
							<Login roleData={setrole}/>
						</Route>
					</Switch>
					{role !=='apprenant'?(
						<Switch>
						<Route path='/welcome' exact>
							<Sidebar />
							<Welcome roleStatut={role}/>
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
						):(
							<Switch>
							<Route path='/welcomeApprenant' exact>
								<ApprenantHeader />
								<WelcomeApprenant />
							</Route>

						</Switch>	
					)}

					
			</Router>		
    // </div>
	
  );
}

export default App;
