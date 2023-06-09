import logo from './logo.svg';
//css
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
// js
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
//component
import Home from './Component/Home/Home';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Layout from './Component/Layout/Layout';
import ProtectedRout from './Component/ProtectedRout/ProtectedRout';
import RegisterProtectedRouter from './Component/RegisterProtectedRouter/RegisterProtectedRouter';
import ParticlesComponent from './Component/Particals/Particals';
const Router= createBrowserRouter([{ path: '/', element: <Layout /> ,children: [{
  path: 'Register',element: <RegisterProtectedRouter><Register /> </RegisterProtectedRouter>} ,
  { path: 'Home',element: (<ProtectedRout><Home /></ProtectedRout>)},
  { path: 'Login',element: <ProtectedRout> <Login /> </ProtectedRout>},
  { path: '*',element:(<ProtectedRout><Home /></ProtectedRout>)} ,
  { index: true,element: (<ProtectedRout><Home /></ProtectedRout>)},
]}]);

function App() {
  return (
    <div className="App">
    <RouterProvider router={Router} />
    <ParticlesComponent />


    </div>
  );
}

export default App;
