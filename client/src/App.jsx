import './App.css'
import { Route, Routes } from 'react-router-dom';
import Indexpage from "../src/pages/Indexpage.jsx";
import Loginpage from '../src/pages/Loginpage.jsx';
import Layout from './Layout';
import Registerpage from './pages/Registerpage.jsx';
import axios from 'axios';
import { UserContext, UserProvider } from "../src/User/UserContext.jsx";
import Accountpage from './pages/Accountpage.jsx';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() { 

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/account/:subpage?" element={<Accountpage />} />
          <Route path="/account/:subpage/:action" element={<Accountpage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
