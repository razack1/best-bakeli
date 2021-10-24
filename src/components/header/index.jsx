import React, { useState } from "react";
import { useHistory } from 'react-router';
import {auth} from "../../firebase";


//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart,FaUserPlus,FaSign } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import {GiTeacher} from "react-icons/gi";
import {RiHealthBookFill} from "react-icons/ri"



//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./index.css";


const Header = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true);

    const routeLink= useHistory()

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const logout= ()=>{
    auth.signOut();
    routeLink.push('')
}


  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "BAKELI" : "BAKELI"}</p>
            </div>
           
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />} onClick={()=>routeLink.push('welcome')}>
                Home
              </MenuItem>
              <MenuItem icon={<FaList />} >Category</MenuItem>
              <MenuItem icon={<RiHealthBookFill />}  onClick={()=>routeLink.push('cours')}>Cours</MenuItem>
              <MenuItem icon={<GiTeacher/>} onClick={()=>routeLink.push('signin')}>Author</MenuItem>
              <MenuItem icon={<GiTeacher />}  onClick={()=>routeLink.push('cours')}>Cours</MenuItem>
              <MenuItem icon={<FaUserPlus />}  onClick={()=>routeLink.push('cours')}>Cours</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />} onClick={()=>logout()}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;