import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeMenu = () => {
  const [showModal, setShowModal] = useState(false);

  // Function to toggle modal display
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <header className="bg-gray-950 text-gray-50 dark:bg-gray-950 dark:text-gray-50  flex items-center justify-between px-4 py-3 md:px-6 md:py-4 " style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, backgroundColor: 'rgb(0, 0, 0)' }}>
        <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none',color:'white' }} >
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
          <span className="text-xl font-semibold" to='/'>Doctor Babu</span>
        </Link>
        <nav className="navbar navbar-expand-sm navbar-dark text text-white" style={{ backgroundColor: 'black', color: 'white', height: '100%' }}>
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link" >About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link" >Contact</Link>
                </li>
                
                <li className="nav-item dropdown">
                  {/* Use onClick event handler to toggle modal display */}
                  <button className="nav-link dropdown-toggle" onClick={toggleModal}>
                    Login
                  </button>
                  {/* Modal structure */}
                  {showModal && (
                    <center>

                    <div className="modal fade show" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title text-dark text text-center" id="loginModalLabel">Login As</h5>
                            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                          </div>
                          <div className="modal-body justify-content-center" >
                            <ul className="list-group">
                              <li className="list-group-item"><Link to="/admin/login" className="btn btn-warning" onClick={closeModal}>Admin</Link></li>
                              <li className="list-group-item"><Link to="/doctor/login" className="btn btn-success" onClick={closeModal}>Doctor</Link></li>
                              <li className="list-group-item"><Link to="/user/userlogin" className="btn btn-primary" onClick={closeModal}>User</Link></li>
                              <li className="list-group-item"><Link to="/pharmacy/pharmacylogin" className="btn btn-danger" onClick={closeModal}>Pharmacy</Link></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    </center>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HomeMenu;
