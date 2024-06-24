import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Modal.setAppElement('#root');

export default function DoctorApp() {
    const [appointments, setAppointments] = useState([]);
    const [docId, setDocId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [userInformation, setUserInformation] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [prescription, setPrescription] = useState('');
    const [prescriptionDate, setPrescriptionDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date

    useEffect(() => {
        const storedDoc = sessionStorage.getItem('doctor');
        if (storedDoc) {
            const docData = JSON.parse(storedDoc);
            setDocId(docData.doctorId);
            fetchAppointmentsByUserId(docData.doctorId);
        }
    }, []);

    const savePrescription = () => {
        const prescriptionData = {
            appId: selectedAppointment.appId,
            prescription: prescription,
            prescriptionDate: prescriptionDate
        };

        axios.post('http://localhost:8091/api/v2/createPrescription', prescriptionData)
            .then(response => {
                console.log('Prescription saved successfully:', response.data);
                setPrescription(''); // Clear prescription after saving
            })
            .catch(error => {
                console.error('Error saving prescription:', error);
            });
    };

    const fetchAppointmentsByUserId = (doctorId) => {
        axios.get(`http://localhost:8091/api/v2/getAppByDocId/${doctorId}`)
            .then(response => {
                setAppointments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the appointments!', error);
            });
    };

    const fetchUserMedicalInfo = (userId) => {
        axios.get(`http://localhost:8091/api/v2/MedicalByuserId/${userId}`)
            .then(response => {
                setUserInformation(response.data);
            })
            .catch(error => {
                console.error('Error fetching user medical info:', error);
            });
    };

    const fetchUserDetails = (userId) => {
        axios.get(`http://localhost:8091/api/v2/getUser/${userId}`)
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    };

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
        fetchUserMedicalInfo(appointment.userId);
        fetchUserDetails(appointment.userId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
        setUserInformation([]);
        setUserDetails(null);
    };

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    const getAppointmentTable = (appointments) => {
        const activeAppointments = [];
        const futureAppointments = [];
        const historyAppointments = [];

        const currentDate = new Date();

        appointments.forEach(appointment => {
            const appDate = new Date(appointment.appDate);

            if (appDate > currentDate) {
                futureAppointments.push(appointment);
            } else if (appDate.getDate() === currentDate.getDate()) {
                activeAppointments.push(appointment);
            } else {
                historyAppointments.push(appointment);
            }
        });

        return (
            <Tabs>
                <TabList>
                    <Tab>Active Appointments</Tab>
                    <Tab>Future Appointments</Tab>
                    <Tab>History</Tab>
                </TabList>
                <TabPanel>
                    <div className="overflow-x-auto">
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th>Appointment ID</th>
                                    <th>User ID</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Symptoms</th>
                                    <th>Weight</th>
                                    <th>Age</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeAppointments.map(appointment => (
                                    <tr key={appointment.appId}>
                                        <td>{appointment.appId}</td>
                                        <td>{appointment.userId}</td>
                                        <td>{appointment.appStatus}</td>
                                        <td>{appointment.appDate}</td>
                                        <td>{appointment.appTime}</td>
                                        <td>{appointment.symptoms}</td>
                                        <td>{appointment.weight}</td>
                                        <td>{appointment.age}</td>
                                        <td>
                                            <button onClick={() => openModal(appointment)} className='btn btn-success'>Take</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="overflow-x-auto">
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th>Appointment ID</th>
                                    <th>User ID</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Symptoms</th>
                                    <th>Weight</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {futureAppointments.map(appointment => (
                                    <tr key={appointment.appId}>
                                        <td>{appointment.appId}</td>
                                        <td>{appointment.userId}</td>
                                        <td>{appointment.appStatus}</td>
                                        <td>{appointment.appDate}</td>
                                        <td>{appointment.appTime}</td>
                                        <td>{appointment.symptoms}</td>
                                        <td>{appointment.weight}</td>
                                        <td>{appointment.age}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="overflow-x-auto">
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th>Appointment ID</th>
                                    <th>User ID</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Symptoms</th>
                                    <th>Weight</th>
                                    <th>Age</th>
                                    <th>Book Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyAppointments.map(appointment => (
                                    <tr key={appointment.appId}>
                                        <td>{appointment.appId}</td>
                                        <td>{appointment.userId}</td>
                                        <td>{appointment.appStatus}</td>
                                        <td>{appointment.appDate}</td>
                                        <td>{appointment.appTime}</td>
                                        <td>{appointment.symptoms}</td>
                                        <td>{appointment.weight}</td>
                                        <td>{appointment.age}</td>
                                        <td>{appointment.bookDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
            </Tabs>
        );
    };

    return (
        <section style={{ marginTop: '2rem', marginBottom: '1rem' }} id="home" className="bg-gray-900 text-white py-8">
            <div className="container mt-5">
                <h2 className='text-center'>Appointments</h2>
                {getAppointmentTable(appointments)}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Appointment Details"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    {selectedAppointment && (
                        <div className="card bg-dark text-white text-center">
                            <div className="card-body">
                                <h2 className="card-title">Appointment Details</h2>
                                <p className="card-text">Appointment ID: {selectedAppointment.appId}</p>
                                <p className="card-text">User ID: {selectedAppointment.userId}</p>
                                <p className="card-text">Status: {selectedAppointment.appStatus}</p>
                                <p className="card-text">Date: {selectedAppointment.appDate}</p>
                                <p className="card-text">Time: {selectedAppointment.appTime}</p>
                                <p className="card-text">Symptoms: {selectedAppointment.symptoms}</p>
                                <p className="card-text">Weight: {selectedAppointment.weight}</p>
                                <p className="card-text">Age: {selectedAppointment.age}</p>
                                <h3>User Medical Information</h3>
                                {userInformation.map((info, index) => (
                                    <div key={index}>
                                        <h3>User Medical Information {index + 1}</h3>
                                        <p>Allergy: {info.allergy}</p>
                                        <p>Medical History: {info.medicalHistory}</p>
                                        <p>Medical ID: {info.medicalId}</p>
                                        <p>User ID: {info.userId}</p>
                                    </div>
                                ))}
                                {userDetails && (
                                    <div>
                                        <h3>User Details</h3>
                                        <p>User ID: {userDetails.userId}</p>
                                        <p>Email: {userDetails.email}</p>
                                        <p>Mobile: {userDetails.mobile}</p>
                                        <p>Address: {userDetails.address}</p>
                                        <p>Name: {userDetails.name}</p>
                                        <a href={`tel:+91${userDetails.mobile}`} className='btn btn-info' target='_blank'>Call</a>
                                        <a href={`https://wa.me/${userDetails.mobile}`} className='btn btn-success ml-2' target='_blank'>WhatsApp</a>
                                    </div>
                                )}
                                <div className="form-group">
                                    <label htmlFor="prescription">Prescription</label>
                                    <textarea className="form-control" id="prescription" value={prescription} onChange={(e) => setPrescription(e.target.value)} />
                                </div>
                                <input type="hidden" className="form-control" id="prescriptionDate" value={prescriptionDate} onChange={(e) => setPrescriptionDate(e.target.value)} />
                                {/* Save Prescription Button */}
                                <button className="btn btn-primary mr-2" onClick={savePrescription}>Save Prescription</button>
                                <button className='btn btn-outline-info' onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </section>
    );
}
