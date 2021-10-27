import React,{useEffect,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import SearchField from "react-search-field";
import SweetAlert from 'react-bootstrap-sweetalert';
import {dbCours,dbArchive, db,dbFirestore,dbFirestores} from "../../firebase";
import img1 from '../../images/img1.jpg'
import HalfRating from '../rating';
import './index.css';

const Main = () => {
  
  const [dataCours, setDataCours] = useState([]);
  const [search, setSearch] = useState('');
  const [courEdit, setCourEdit] = useState('');
  const [detailEdit, setdEtailEdit] = useState('');
  const [editId, setEditId] = useState('');
  const [dataSearch, setdataSearch] = useState([]);
  const [disableButton, setdisableButton] = useState(false);
  const [show, setshow] = useState(false);

 const route= useHistory();

   let dataChange= '';

   // function pour afficher les notifications
  const notify = (msg) => toast(msg);

  useEffect(() => {
    dbCours.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data)
      setDataCours(data);
    });
}, [dataChange]) 


// function pour effectuer l'archivage d'un cour

const archive=(id,cours,detail)=>{
  dbArchive.doc(id).set({cours,detail}).then(resp=>{
    notify('Archivé avec succés');
   dbFirestores.collection("cours")
   .doc(id)
   .delete()
   .then(() => {
    notify('Deplacé avec succes');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
   }) // Document deleted
   .catch((error) => notify(error));
 })
}

   // function pour effectuer la recherche d'un cour
   const filterSearch=()=>{
    let dataFind= []

    dataCours.map((data,index)=>{
      if (search.toUpperCase() === data.cours.toUpperCase() && search !=='' ) {
        dataFind.push(data)
        setdataSearch(dataFind)
      }
    })
}

// function pour determiner le contenu du modal de modification
   //  installer le module react-bootstrap-sweetalert pour cela
   const SweetAlertFunction = ({ show, disableButton, submit, hideAlert }) => {
    return (
      <SweetAlert
        info
        show={show}
        showCancel
        confirmBtnText="editer"
        cancelBtnText="annuler"
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="default"
        disabled={disableButton}
        title="Editer"
        onConfirm={submit}
        onCancel={hideAlert}
      >
        <form>
          <label htmlFor="cour">Cours</label>
          <br /> 
          <input value={courEdit} className="input-control" onChange={(e) => setCourEdit(e.target.value)} /> <br /> 
          <label htmlFor="cour">Details</label>
          <br /> 
          <input value={detailEdit} onChange={(e) => setdEtailEdit(e.target.value)} />
        </form>

      </SweetAlert>
    );
};

 // function pour masquer le modal de modification
 const hideAlert=()=> {
  setshow(false);
}

// function pour modifier un cour
const submit=(e)=> {

  dbCours.doc(editId).update({'cours':courEdit,'detail':detailEdit}).then(res=> console.log(res));

  setdisableButton(true );
  notify('Modifié avec succes');
  setshow(false);
  setTimeout(() => {
    setdisableButton(false );

    window.location.reload();
  }, 2000);
}


    return (
        <div className='mains'>
           <div className="search-box mb-2">
                <input type="text" className="search-input" placeholder="Search.." value={search} onChange={(e)=>setSearch(e.target.value)}/>

                <button className="search-button" onClick={()=>filterSearch()} >
                <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <h4  className='text-start bold my-2'>Popular courses</h4>
            <div
              id="scrollableDiv"
              style={{
                height: 400,
                overflow: 'auto',
                // display: 'flex',
                flexDirection: 'column-reverse',
              }}
            >
              {/*Put the scroll bar always on the bottom*/}
              <InfiniteScroll
                dataLength={5}
                // next={this.fetchMoreData}
                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                inverse={true} //
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                    {search !==''?(
                  dataSearch.map((cour, index) => (
                  
                    <div  key={index} className="pb-2">
  
                      <div className="card" style={{maxWidth: '480px'}}>
                          <div className="row no-gutters">
                            <div className="col ">
                              <img src={img1} className="card-img" alt="..."/>
                              <div className="card-body">
                                <p className="card-text text-center">
                                 <span className="card-text">{cour.cours}</span>
                                  <small className="text-muted"></small>
                                </p>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="card-body">
                                <p className="card-text">
                                  <small className="text-muted">
                                  <button className='btn btn-outline-warning' title='edit' onClick={() =>{setCourEdit(cour.cours); setdEtailEdit(cour.detail);setEditId(cour.id); setshow( true)}}>
                                      <i className="fa fa-edit" aria-hidden="true"></i>
                                    </button> &nbsp;
                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                    <button className='btn btn-outline-success' title='detail' > <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                  </small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
  
                    </div>
  
                    
                  ))
                ):(
                  dataCours.map((cour, index) => (
                    
                    <div  key={index} className="pb-2">
                      {console.log(cour)}
                      <div className="card" style={{maxWidth: '480px'}}>
                          <div className="row no-gutters">
                            <div className="col ">
                              <img src={img1} className="card-img" alt="..."/>
                              <div className="card-body">
                                <p className="card-text text-center">
                                 <span className="card-text">{cour.cours}</span>
                                  <small className="text-muted"></small>
                                </p>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="card-body">
                                <p className="card-text">
                                  <small className="text-muted">
                                  <button className='btn btn-outline-warning' title='edit'  onClick={() => {setCourEdit(cour.cours); setdEtailEdit(cour.detail); setEditId(cour.id); setshow( true)}}><i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                    <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                    <button className='btn btn-outline-success' title='detail' > <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                  </small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
  
                    </div>
  
                    
                  ))
                )}
              </InfiniteScroll>
            </div>
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

            {/* Affichage du modal sweet Alert pour la modification      */}
        <SweetAlertFunction
          show={show}
          disableButton={disableButton}
          submit={() => submit()}
          hideAlert={() => hideAlert()}
        />


          <div className="topteacher my-4">
            <h1 className="title-teach my-2">Top Teacher</h1>
            <div className="row">
            <div className="col teach inline-flex mx-4">
                            <img src={img1} className="card-img-teach" alt="..."/>
                            <div className="card-body-teach  ">
                              <p className="card-text ">
                               <span class="card-text teach-name">Jesus Christ</span>
                               <br />
                               <br />
                               <HalfRating/>
                                <small className="text-muted "> </small>
                              </p>
                            </div>
                          </div>
            </div>
          </div>

        </div>
    )
}

export default Main
