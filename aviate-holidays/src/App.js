import React from 'react';
import { BrowserRouter, Routes, Route, Navigate ,useLocation} from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/home/Home';
import Dashboard from './pages/home/Dashboard';

import Blogs from './pages/blogs/blogs';
import Contact from './pages/home/footer/contact';
import Footer from './pages/home/footer/footer';
import AdminComments from './pages/UsersComents/usercoments';
import Comments from './pages/home/footer/userComent';
import MyCarousel from './pages/home/carosols/Carousel';
import Auth from './pages/Authentication/AuthPage';
import { AuthProvider, useAuth } from './pages/Authentication/AuthContext';
import About from './pages/home/about/body';
import AuthDemo from './pages/home/about/AuthDemo';
import GoogleLoginButton from './pages/home/about/GoogleLoginButton';
import Import from './pages/home/carosols/import';
import  OtherPage  from './pages/home/carosols/OtherPage';
import  AddCountryDetails  from './pages/CountryDetails/AddCountryDetails';
import  UserDetails  from './pages/CountryDetails/UserDetails';
import  TourDetailsPage  from './pages/CountryDetails/TourDetailsPage';
import  DetailsPage  from './pages/CountryDetails/AddDetailsPage';
import  InExclusions  from './pages/InExclusions/InExclusions';
import  UserTourDetailsPage  from './pages/Users/UserTourDetailsPage';
import  BookingInfo  from './pages/Users/BookingInfo';
import  ReviewInfo  from './pages/Users/ReviewInfo';
import  BookingsPage  from './pages/Users/BookingsPage';
import  UserComments  from './pages/home/footer/userComent';



const ProtectedRoute = ({ element }) => {

  const { isAuthenticated } = useAuth();
  const userInfo = JSON.parse(localStorage.getItem('AviateHolidaysUserInfo'));
  const location = useLocation();
  console.log('Current path:', location.pathname);
  if (isAuthenticated || userInfo) {
    return element;
  }

  return <Navigate to="/auth" />;
};

function App() {
  const userInfo = JSON.parse(localStorage.getItem('AviateHolidaysUserInfo'));

  if (!userInfo) {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/home" element={<Home />} />

            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
  }

  // if(location.pathname ==="/home"){

  //   return <Navigate to="/home" />;
  // }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          
          <Route path="/home" element={<Home />} />
          {/* <Route path="/auth" element={<ProtectedRoute element={<Auth />} />} /> */}
          <Route path="/blogs" element={<ProtectedRoute element={<Blogs />} />} />
          <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
          <Route path="/comments" element={<ProtectedRoute element={<Comments />} />} />
          <Route path="/admincomments" element={<ProtectedRoute element={<AdminComments />} />} />
          <Route path="/mycarousel" element={<ProtectedRoute element={<MyCarousel />} />} />
          <Route path="/about" element={<ProtectedRoute element={<About />} />} />
          <Route path="/about" element={<ProtectedRoute element={<About />} />} />
          <Route path="/Dashboard" element={<Dashboard />}/>

          <Route path="/import" element={<Import />} />
          <Route path="/authDemo" element={<AuthDemo />} />
          <Route path="/googlelogin" element={<GoogleLoginButton  />} />
          <Route path="/otherpaage" element={<OtherPage  />} />
          <Route path="/addcountrydetails" element={<AddCountryDetails  />} />
          <Route path="/userdetails" element={<UserDetails  />} />
          <Route path="/tourdetailspage/:id" element={<TourDetailsPage  />} />
          <Route path="/UserTourDetailsPage/:id" element={<UserTourDetailsPage  />} />
          <Route path="/BookingInfo" element={<BookingInfo  />} />
          <Route path="/ReviewInfo" element={<ReviewInfo  />} />
          <Route path="/BookingsPage" element={<BookingsPage  />} />
          <Route path="/UserComments" element={<UserComments  />} />

          <Route path="/detailspage" element={<DetailsPage  />} />
          <Route path="/inexclusions" element={<InExclusions  />} />

          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
