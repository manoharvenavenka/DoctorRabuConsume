import { useState, React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHomeMenu from './AdminHomeMenu';
import HomeMenu from './HomeMenu';
import AdminLogin from './AdminLogin';
import Home from '../Home';
import About from '../About';
import Contact from '../Contact';
import AdminHome from './AdminHome';
import Logout from '../Logout';
import ViewDoctors from './ViewDoctors';
import DoctorLogin from '../DoctorComponents/DoctorLogin';
import DoctorHome from '../DoctorComponents/DoctorHome';
import '../App.css';
import DoctorRegistration from '../DoctorComponents/DoctorRegistration';
import DoctorMenu from '../DoctorComponents/DoctorMenu';
import AddSchedule from '../DoctorComponents/AddSchedule';
import UserMenu from '../UserComponents/UserMenu';
import PharmacyMenu from '../PharmacyComponents/PharmacyMenu';
import UserRegistration from '../UserComponents/UserRegistration';
import PharmacyRegistration from '../PharmacyComponents/PharmacyRegistration';
import UserLogin from '../UserComponents/UserLogin';
import PharmacyLogin from '../PharmacyComponents/PharmacyLogin';
import PageNotFound from '../PageNotFound';
import UserHome from '../UserComponents/UserHome';
import PharmacyHome from '../PharmacyComponents/PharmacyHome';
import ViewSchedule from '../DoctorComponents/ViewSchedule';
import ViewDoctorsBySId from '../UserComponents/ViewDoctorsBySId';
import UserProfile from '../UserComponents/UserProfile';
import AddAppointment from '../UserComponents/AddAppointment';
import AddMedicines from './AddMedicines';
import AddMedicalHistory from '../UserComponents/AddMedicalHistory';
import ViewMedicalHistory from '../UserComponents/ViewMedicalHistory';
import DoctorApp from '../DoctorComponents/DoctorApp';

export default function MainMenu() {
    const [loginState, setLoginState] = useState(false);
    return (
        <BrowserRouter>
            <main>
                {loginState ?
                    (loginState === 'admin' ? <AdminHomeMenu /> :
                        loginState === 'doctor' ? <DoctorMenu /> :
                            loginState === 'user' ? <UserMenu /> :
                                loginState === 'pharmacy' ? <PharmacyMenu /> :
                                    <HomeMenu />)
                    : <HomeMenu />}

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />

                    <Route path='/admin/login' element={<AdminLogin loginState={loginState} setLoginState={setLoginState} />} />
                    {loginState && (
                        <>
                            <Route path="/admin/adminmenu" element={<AdminHomeMenu />} />

                            <Route path="/admin/adminhome" element={<AdminHome />} />
                            <Route path="/admin/viewDoctors" element={<ViewDoctors />} />
                            <Route path="/admin/addMedicines" element={<AddMedicines/>} />
                            {/* <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/viewproducts" element={<ViewProducts/>} />*/}
                            <Route path="/logout" element={<Logout loginState={loginState} setLoginState={setLoginState} />} />

                        </>

                    )
                    }
                    <Route path='/doctor/login' element={<DoctorLogin loginState={loginState} setLoginState={setLoginState} />} />
                    {loginState && (
                        <>
                            <Route path="/doctor/doctorMenu" element={<DoctorMenu />} />
                            <Route path="/doctor/doctorhome" element={<DoctorHome />} />
                            <Route path="/doctor/addSchedule" element={<AddSchedule />} />
                            <Route path="/doctor/viewSchedule" element={<ViewSchedule />} />
                            <Route path="/doctor/viewApp" element={<DoctorApp />} />
                            {/*  <Route path="/admin/adminhome" element={<AdminHome />} />
                            <Route path="/admin/viewDoctors" element={<ViewDoctors />} />
                            {/* <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/viewproducts" element={<ViewProducts/>} />*/}
                            <Route path="/logout" element={<Logout loginState={loginState} setLoginState={setLoginState} />} />

                        </>

                    )
                    }
                     <Route path='/user/userlogin' element={<UserLogin loginState={loginState} setLoginState={setLoginState} />} />
                    {loginState && (
                        <>
                            <Route path="/user/userMenu" element={<UserMenu />} />
                           <Route path='/user/userhome' element={<UserHome />} />
                           <Route path="/ViewDoctorsBySId/:doctorId" element={<ViewDoctorsBySId/>} />
                           <Route path="/user/profile" element={<UserProfile/>} />
                           <Route path="/user/appointmets" element={<AddAppointment/>} />
                           <Route path="/user/addMedicalhistory" element={<AddMedicalHistory/>} />
                           <Route path="/user/viewMedicalhistory" element={<ViewMedicalHistory/>} />

                           {/*   <Route path="/doctor/addSchedule" element={<AddSchedule />} />
                             <Route path="/admin/adminhome" element={<AdminHome />} />
                            <Route path="/admin/viewDoctors" element={<ViewDoctors />} />
                            {/* <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/viewproducts" element={<ViewProducts/>} />*/}
                            <Route path="/logout" element={<Logout loginState={loginState} setLoginState={setLoginState} />} />

                        </>

                    )
                    }
                     <Route path='/pharmacy/pharmacylogin' element={<PharmacyLogin loginState={loginState} setLoginState={setLoginState} />} />
                    {loginState && (
                        <>
                            <Route path="/pharmacy/pharmacyMenu" element={<PharmacyMenu />} />
                           <Route path="/pharmacy/pharmacyhome" element={<PharmacyHome />} />
                           {/* <Route path="/doctor/addSchedule" element={<AddSchedule />} />
                            {/*  <Route path="/admin/adminhome" element={<AdminHome />} />
                            <Route path="/admin/viewDoctors" element={<ViewDoctors />} />
                            {/* <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/viewproducts" element={<ViewProducts/>} />*/}
                            <Route path="/logout" element={<Logout loginState={loginState} setLoginState={setLoginState} />} />

                        </>

                    )
                    }

                    <Route path='/pharmacy/pharmacyRegistration' element={<PharmacyRegistration />} />
                    <Route path='/user/userRegistration' element={<UserRegistration />} />

                    <Route path='/doctor/doctorRegistration' element={<DoctorRegistration />} />


                     <Route path='*' element={<PageNotFound />} /> 
                </Routes>
            </main>
        </BrowserRouter>
    );
}
