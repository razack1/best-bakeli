import React,{useEffect,useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchField from "react-search-field";
import {dbCours,dbArchive, db,dbFirestore,dbFirestores} from "../../firebase";
import img1 from '../../images/img1.jpg'
import HalfRating from '../rating';
import './index.css';

const Main = () => {
  
  const [dataCours, setDataCours] = useState([]);
  const [search, setSearch] = useState('');
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
}, []) 

const archive=(id,cours,detail)=>{
  dbArchive.doc(id).set({cours,detail}).then(resp=>{
    notify('Archivé avec succés');
   dbFirestores.collection("cours")
   .doc(id)
   .delete()
   .then(() => notify('Deplacé avec succes')) // Document deleted
   .catch((error) => notify(error));
 })
}
      const filterSearch=()=>{
        console.log(search);
          let dataSearch= [];
          dataCours.map((data,index)=>{
            data.cours= search?(
              dataSearch.push(data),
              console.log(dataSearch),
              setDataCours(dataSearch),
              console.log(dataCours)
            ):(null);
          })
      }

    return (
        <div className='mains'>
            <div className="search-box pl-4 mb-4 ml-4 ">
                <input type="text" className="search-input" placeholder="Search.." value={search} onChange={(e)=>setSearch(e.target.value)} />

                <button className="search-button onClick={()=>filterSearch()}">
                <i class="fa fa-search" aria-hidden="true"></i>
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
                {dataCours.map((cour, index) => (
                  <div  key={index} className="pb-2">

                    <div className="card" style={{maxWidth: '600px'}}>
                        <div className="row no-gutters">
                          <div className="col ">
                            <img src={img1} className="card-img" alt="..."/>
                            <div className="card-body">
                              <p className="card-text text-center">
                               <span class="card-text">{cour.cours}</span>
                               <br />
                                <small className="text-muted">Date</small>
                                <br />
                                <small className="text-muted">32 Lesson</small>
                              </p>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="card-body">
                              <p className="card-text">
                              <button className='btn btn-outline-warning' title='edit' onClick=''> <i className="fa fa-edit" aria-hidden="true"></i></button> &nbsp;
                                  <button className='btn btn-outline-primary' title='archive' onClick={()=>archive(cour.id,cour.cours,cour.detail)}> <i className="fa fa-archive" aria-hidden="true"></i></button>&nbsp;
                                  <button className='btn btn-outline-success' title='detail' > <i className="fa fa-info-circle" aria-hidden="true"></i></button>
                            

                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                  </div>
                ))}
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
