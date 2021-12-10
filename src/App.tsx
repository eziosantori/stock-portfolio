import {PrivateRoute, ProvideAuth} from './hooks/useAuth';
import './App.less';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ResetPage from "./pages/Auth/ResetPage";
import { PortfolioPage, IntrinsicValuePage } from  './pages';

function App() {
  
  const pvt = (el: JSX.Element) => <PrivateRoute element={el} />;
  return (
    <ProvideAuth>
    
      <Router  >
      <Routes>
            <Route path="/"  element={<LoginPage />} />
            <Route path="/login"  element={<LoginPage />} />
            <Route  path="/register" element={<RegisterPage />} />
            <Route  path="/reset" element={<ResetPage />} />
            <Route  path="/dashboard" element={pvt(<PortfolioPage />) } />
            <Route  path="/intrinsic" element={pvt(<IntrinsicValuePage />) } />
        </Routes>
      </Router>    
</ProvideAuth>
  );
}

export default App;
