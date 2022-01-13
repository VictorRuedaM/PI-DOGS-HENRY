import './App.css';
import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import {CreateDog} from './components/CreateDog/CreateDog.jsx';
import {DetailsPage} from './components/DetailsPage/DetailsPage.jsx';

function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path={'/'} exat element={<LandingPage/>}/>
          
       

        <Route path={'/home'} element={<HomePage/>}/>

        <Route path={'/createDog'} element={<CreateDog/>}/>

        <Route path={'/home/:id'} element={<DetailsPage/>}/>


          
       
      </Routes>
    </div>
    
  );
}

export default App;
