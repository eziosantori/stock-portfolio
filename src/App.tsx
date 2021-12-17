import { PrivateRoute, ProvideAuth } from './hooks/useAuth';
import './App.less';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ResetPage from "./pages/Auth/ResetPage";
import { PortfolioPage, IntrinsicValuePage } from './pages';
import { StoreProvider } from './store/StoreProvider'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { setLoading, setUser } from './store/userSlice';
import { auth } from './firebase';
import { RootState } from './store/store';
import { Spin } from 'antd';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.user.loading)
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(auth);
      if (user) {
        const u = { email: user.email, uid: user.uid, displayName: user.displayName, photoURL: user.photoURL };
        dispatch(setUser(u));
        dispatch(setLoading(true));
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //console.log(u);
        // ...
        console.log('User is signed-in');

      } else {
        console.log('User is signed out');
        // ...
        setLoading(false);
      }
    });
    return () => {
      // cleanup
    }
  }, [])
  const pvt = (el: JSX.Element) => {
    return (
      loading
        ? <Spin size='large'  />
        : <PrivateRoute element={el} />);
  };

  return (
    <>

      <ProvideAuth>
        <Router  >
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="/dashboard" element={pvt(<PortfolioPage />)} />
            <Route path="/intrinsic/:ticker" element={pvt(<IntrinsicValuePage />)} />
          </Routes>
        </Router>
      </ProvideAuth>
    </>
  );
}

export default App;
