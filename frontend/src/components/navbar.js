import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";


export default function Navbar () {
   const navigate = useNavigate();
   const items = [
      { label: 'Home', icon: 'pi pi-home', onclick: () => navigate('/') },
      { label: 'About', icon: 'pi pi-info-circle' },
      { label: 'Contact', icon: 'pi pi-envelope' }
   ];

   const logo = <img alt="logo" src='../images/Ease Logo.png' height="40" />;


   const login = <Button label="Login" icon="pi pi-user" className="p-button-rounded" onClick={() => navigate('/loginPage')}/>;


   return (
      <Menubar model={items} start={logo} end={login} />
   )
}