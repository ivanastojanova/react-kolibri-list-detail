import { Routes, Route } from 'react-router-dom';
import Customers from './Pages/Customers';
import CustomersDetails from './Pages/CustomersDetails';
import AddCustomer from './Pages/AddCustomer';
import Projects from './Pages/Projects';
import Tickets from './Pages/Tickets';

import NavBar from './Components/NavBar';


const App = () => {
 return (
    <>
       <NavBar />
       <Routes>
          <Route path="/" element={<Customers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/customers/:slug" element={<CustomersDetails />} />
          <Route path="/form/:slug?" element={<AddCustomer />} />
       </Routes>
    </>
 );
};

export default App;