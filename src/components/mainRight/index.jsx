import React,{useState} from 'react';
import Calendar from 'react-calendar';
import img1 from '../../images/img1.jpg'
import './index.css';
import HalfRating from '../rating';
import Card from '../card';

const MainRight = () => {

  const [value, setCalendar] = useState(new Date());
     
    const calendarChange=(e)=>{
        console.log(e)
    }

    const tileClassName=({ date, view })=> {
        // Add class to tiles in month view only
        console.log('object')
        if (view === 'month') {
          // Check if a date React-Calendar wants to check is on the list of dates to add class to
        //   if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
        //     return 'myClassName';
        //   }
        }
      }

    return (
        <div className='mainRight '>
          <h1 className='justify-content my-3 timeline'>Timetable</h1>
            
            {/* <div className='bg-light'> */}
            <Calendar
                onChange={setCalendar}
                value={value}
                className='calend w-75 m-4 mx-5'
                showNavigation='false'
                tileClassName={tileClassName}
                defaultActiveStartDate={new Date()}
                style={{border: 'none'}}

            />
            {/* </div> */}
            <div className="card " style={{maxWidth: '470px', maxHeight: '460px'}}>
                        <div className="row no-gutters">
                          <div className="col ">
                            <img src={img1} className="card-img" alt="..."/>
                            <div className="card-body">
                              <p className="card-text">
                               <span class="card-text teache-name">Jesus Christ</span>
                               <br />
                               <br />
                               <HalfRating/>
                                <small className="text-muted "> </small>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <h1 className="text-center ">A Propos de l'enseignant</h1>
                            <div className="card-body inline-flex">
                              <p className="card-text">
                              <Card/>
                              </p>
                              <p className="card-text">
                              <Card/>
                              </p>
                            </div>
                            <div className="card-body inline-flex">
                              <p className="card-text">
                              <Card/>
                              </p>
                              <p className="card-text">
                              <Card/>
                              </p>
                            </div>
                          </div>
                      </div>
        </div>
    )
}

export default MainRight
