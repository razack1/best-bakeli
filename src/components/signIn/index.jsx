import React,{useState,useEffect} from 'react';
import { auth,dbFirestore } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import { useHistory } from 'react-router';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [btn, setbtn] = useState(false);

    const route= useHistory();


    useEffect(() => {
        if (email.length>=12 && nom.length> 5 && prenom.length> 5 && password.length>= 6 ) {
          setbtn(true);
        }
    }, [email,nom,prenom,password])

    const notify = (msg) => toast(msg);

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        const signInFirebase= auth.createUserWithEmailAndPassword(email,password);

        return signInFirebase.then(res=>{
            dbFirestore.doc(res.user.uid).set({email,nom,prenom,role}).then(resp=>{
             });
             notify('Reussie');
             setTimeout(() => {
              route.push('listapprenant')
             }, 2000);
        }).catch(err=> notify(err))
    }

    const btnActive = btn?( <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>)
                          :( <button name="submit" disabled type="submit" id="contact-submit" data-submit="...Sending">Submit</button>);

    return (
        
      <div className=' mainDiv ml-4'>
        <form id="contact" onSubmit={handleSubmit}>
          <h6>INSCRIPTION</h6>
          <fieldset>
            <input placeholder=" Email" type="email" tabIndex="1" required onChange={(e)=>setEmail(e.target.value)}/>
          </fieldset>
          <fieldset>
            <input placeholder="Nom" type="text" tabIndex="2" required autoFocus onChange={(e)=>setNom(e.target.value)}/>
          </fieldset>
          <fieldset>
            <input placeholder="Prenom" type="text" tabIndex="3" required onChange={(e)=>setPrenom(e.target.value)}/>
          </fieldset>
          <fieldset>
            <input placeholder="Password" type="password" tabIndex="4" required onChange={(e)=>setPassword(e.target.value)}/>
          </fieldset>
          <fieldset>
              <select name="pets" id="pet-select" required onChange={e=> setRole(e.target.value)}>
                  <option value="">--Please choose an option--</option>
                  <option value="apprenant">apprenant</option>
              </select>
          </fieldset>
          <fieldset>
           {btnActive}
          </fieldset>
        </form>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            {/*  Affichage des notifications*/}
            <ToastContainer />

      </div>

    )
}

export default SignIn
