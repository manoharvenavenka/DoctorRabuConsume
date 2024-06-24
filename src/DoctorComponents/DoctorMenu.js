import React from 'react';
import { Link } from 'react-router-dom';


export default function DoctorMenu() {
  return (
    <>
       <header className="bg-gray-950 text-gray-50 dark:bg-gray-950 dark:text-gray-50  flex items-center justify-between px-4 py-3 md:px-6 md:py-4 " style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, backgroundColor: 'rgb(0, 0, 0)' }}>
      <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none',color:'white' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
          <circle cx="20" cy="10" r="2"></circle>
        </svg>
        <span className="text-xl font-semibold">Doctor Babu</span>
      </Link>
      <nav className="navbar navbar-expand-sm navbar-dark text text-white" style={{ backgroundColor: 'black', color: 'white', height: '100%' }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/doctor/doctorhome" className="nav-link">Home</Link>
              </li>
              
              <li className="nav-item dropdown">
                <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Schedule
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link to="/doctor/addSchedule" className="dropdown-item">Add</Link></li>
                  <li><Link to="/doctor/viewSchedule" className="dropdown-item">View</Link></li>
                </ul>
  </li>
  <li className="nav-item">
                <Link to="/doctor/viewApp" className="nav-link">Appointments</Link>
              </li>
             
              <li className="nav-item">
                <Link to="/logout" className="nav-link" >Logout</Link>
              </li>
              
             {/* <li className="nav-item dropdown">
                <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Login
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link to="/admin/login" className="dropdown-item">Admin</Link></li>
                  <li><Link to="#" className="dropdown-item">Doctor</Link></li>
                  <li><Link to="#" className="dropdown-item">User</Link></li>
                </ul>
  </li>*/}
            </ul>
          </div>
        </div>
      </nav>
    </header>
    </>
  )
}
