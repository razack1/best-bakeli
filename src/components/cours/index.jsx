import React,{useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db,dbCours } from "../../firebase";
import './index.css';

const Cours = () => {

    const [cours, setCours] = useState('');
    const [detail, setDetail] = useState('')
    const [btn, setBtn] = useState(false);

    useEffect(() => {
        if (cours.lenght >2) {
            setBtn(true)
        }
    }, [cours])

    const btnAdd=btn?(<button type="submit" disabled id="contact-submit">Ajouter</button>):(<button type="submit"  id="contact-submit">Ajouter</button>);

    const handleClick=(e)=>{
        e.preventDefault();

        dbCours.doc().set({cours,detail}).then(resp=>{
            notify();
         })
        // db.ref(`cours/`).push(cours).then(res=>{
        //     notify();
        // }).catch(err=>{
        //     notifyFalse()
        // });
        setCours('');
        setDetail('');
    }
    const notify = () => toast("Cours ajouté!");
    const notifyFalse = (err) => toast(err);

    return (
        <div className=' mainDiv ml-4'>
        <form id="contact" onSubmit={handleClick}>
          <h6>AJOUTER UN COURS</h6>
          <fieldset>
            <input placeholder=" Cours" type="text" tabIndex="2" value={cours} required onChange={(e)=>setCours(e.target.value)}/>
          </fieldset>
          <fieldset>
            <input placeholder=" detail" type="text" tabIndex="2" value={detail} required onChange={(e)=>setDetail(e.target.value)}/>
          </fieldset>
          <fieldset>
            {btnAdd}
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
            {/* Same as */}
            <ToastContainer />
      </div>
    )
}

export default Cours
