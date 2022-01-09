import './App.css';
import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx';
import HomePage from './components/HomePage/HomePage.jsx';


function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path={'/'} exat element={<LandingPage/>}/>
          
       

        <Route path={'/home'} element={<HomePage/>}/>
          
       
      </Routes>
    </div>
    
  );
}

export default App;
