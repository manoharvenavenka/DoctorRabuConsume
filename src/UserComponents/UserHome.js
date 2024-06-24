import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer';

export default function UserHome() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [specialization, setSpecialization] = useState('');
    const [location, setLocation] = useState('');
    const [specializations, setSpecializations] = useState([]);

    // Fetch all doctors initially to populate specializations dropdown
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get('http://localhost:8091/api/v2/allDoctors');
                setData(response.data);
                const uniqueSpecializations = [...new Set(response.data.map(doctor => doctor.specialization))];
                setSpecializations(uniqueSpecializations);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchInitialData();
    }, []);

    // Fetch doctors based on location and specialization
    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                let url = 'http://localhost:8091/api/v2/allDoctors';
                if (specialization || location) {
                    url = `http://localhost:8091/api/v2/getDoctors/${specialization}/${location}`;
                }
                const response = await axios.get(url);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchFilteredData();
    }, [specialization, location]);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSpecializationChange = (e) => {
        setSpecialization(e.target.value);
    };

    return (
      <>
        <section
      style={{ marginTop: '5rem', marginBottom: '1rem' }}
      id="home"
      className="bg-gray-900 text-white py-8"
    >
          <Container fluid>
            <Row className="mb-4">
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Control
                  type="text"
                  placeholder="Search by Location"
                  value={location}
                  onChange={handleLocationChange}
                  size="lg"
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  as="select"
                  value={specialization}
                  onChange={handleSpecializationChange}
                  size="lg"
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((spec, index) => (
                    <option key={index} value={spec}>{spec}</option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
  
            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="container-fluid py-8 px-4 md:px-6 lg:px-8 bg-gray-900 dark:bg-gray-900">
                <div className="w-full max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((doctor) => (
                      <div key={doctor.doctorId} className="bg-gray-800 rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
                        <div className="h-48 bg-gray-700 dark:bg-gray-700 flex items-center justify-center">
                          <img
                            alt="Doctor Profile"
                            className="rounded-full object-cover"
                            height={200}
                            src={`http://localhost:8091/uploads/${doctor.doctorPic}`}
                            style={{
                              aspectRatio: "200/200",
                              objectFit: "cover",
                            }}
                            width={200}
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 text-white">{doctor.doctorName}</h3>
                          <div className="flex items-center mb-4">
                            <MailIcon className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-400" />
                            <span className="text-gray-400">{doctor.email}</span>
                          </div>
                          <div className="flex items-center mb-4">
                            <PhoneIcon className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-400" />
                            <span className="text-gray-400">{doctor.mobile}</span>
                          </div>
                          <div className="flex items-center mb-4">
                            <UserIcon className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-400" />
                            <span className="text-gray-400">{doctor.gender}</span>
                          </div>
                          <div className="flex items-center mb-4">
                            <HospitalIcon className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-400" />
                            <span className="text-gray-400">{doctor.hospitalName}</span>
                          </div>
                          <div className="flex items-center mb-4">
                            <TypeIcon className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-400" />
                            <span className="text-gray-400">{doctor.specialization}</span>
                          </div>
                          <div className="flex items-center mb-4">
                            <ActivityIcon className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-400" />
                            <span className="text-gray-400">{doctor.experience} years</span>
                          </div>
                          <div className="flex items-center mb-4">
                            <LocateIcon className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-400" />
                            <span className="text-gray-400">{doctor.location}</span>
                          </div>
                          <div className="flex items-center mb-4">
                            <CurrencyIcon className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-400" />
                            <span className="text-gray-400">${doctor.consulateFee} per consultation</span>
                          </div>
                          <Button className="w-full" variant="dark" as={Link} to={`/ViewDoctorsBySId/${doctor.doctorId}`}>
                            Book Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>
        <Footer />
      </>
    );
  };

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function CurrencyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <line x1="3" x2="6" y1="3" y2="6" />
      <line x1="21" x2="18" y1="3" y2="6" />
      <line x1="3" x2="6" y1="21" y2="18" />
      <line x1="21" x2="18" y1="21" y2="18" />
    </svg>
  );
}

function HospitalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
  );
}

function LocateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.49 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function TypeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  );
}
function UserIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 17s1.5-2 4-2c0 0 .8-1.8 1-4-.5 0-1-.5-2-1s-1-2-2-2c-1.3 0-2 1-2 2-.5.5-1 1-2 1s-.5.5-2 1c.2 2.2 1 4 1 4 2.5 0 4 2 4 2" />
        <circle cx="12" cy="5" r="3" />
      </svg>
    );
  }
 
