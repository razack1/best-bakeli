import React, {Component, useState} from 'react';
import { useHistory } from 'react-router';
import { auth, googleAuthProvider,dbFirestore } from "./firebase";
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



class App extends Component {

	//const [role, setrole] = useState('');
	render() {
		
	const Login = (roleData) => {

		const [email, setEmail] = useState('apprenant@gmail.com');
		const [password, setPassword] = useState('apprenant');
		const route = useHistory();
	
	
		const handleChange= e=>{
			e.preventDefault();
		   const login =auth.signInWithEmailAndPassword(email,password);
	
		   return login.then(res=>{
		
				dbFirestore.doc(res.user.uid).get().then(result => {
					roleData(result.data().role);
				});
	
				route.push('/welcome');
	
		   })  
		}
	
			
	
		return (
		  
			<div className='main'>
				<div className="form" >
					<h2>Login</h2>
					<div className="input">
						<div className="inputBox">
							<label htmlFor="">Username</label>
							<input type="text" onChange={(e)=> setEmail(e.target.value)}/>
						</div>
						<div className="inputBox">
							<label htmlFor="">Password</label>
							<input type="password" onChange={e=> setPassword(e.target.value)}/>
						</div>
						<div className="inputBox">
							<input type="submit"  value="Sign In" onClick={handleChange} /> 
						</div>
					</div>
					<p className="forgot">Forgot Password? <a href="#">Click Here</a></p>
					
				</div>
			</div>   
		)
	}


	console.log(roleData)

  return (
    // <div className="App">
     <Router>					
					<Switch>
						<Route path='/' exact>
							<Login roleData={Login}/>
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
							<Route path='/welcome' exact>
								<ApprenantHeader />
								<WelcomeApprenant />
							</Route>

						</Switch>	
					)}

					
			</Router>		
    // </div>
	
  );
	}
}

export default App;
