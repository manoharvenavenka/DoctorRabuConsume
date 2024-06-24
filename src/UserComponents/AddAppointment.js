import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [doctorInfo, setDoctorInfo] = useState({});
    const [consulateFee, setConsulateFee] = useState();
    const [userBankInfo, setUserBankInfo] = useState({});
    const [doctorBankInfo, setDoctorBankInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isDataReady, setIsDataReady] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUserId(userData.userId);
            fetchAppointmentsByUserId(userData.userId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8091/api/v2/getUser/${userId}`)
                .then(response => {
                    setUserInfo(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, [userId]);

    useEffect(() => {
        if (appointments.length > 0 && appointments[0].doctorId) {
            axios.get(`http://localhost:8091/api/v2/getDoctor/${appointments[0].doctorId}`)
                .then(response => {
                    setDoctorInfo(response.data);
                    setConsulateFee(response.data.consulateFee);
                })
                .catch(error => {
                    console.error('Error fetching doctor info:', error);
                });
        }
    }, [appointments]);

    useEffect(() => {
        if (doctorInfo.drAccountNo) {
            axios.get(`http://localhost:8091/api/v2/getBankAccounts/${doctorInfo.drAccountNo}`)
                .then(response => {
                    setDoctorBankInfo(response.data);
                })
                .catch(error => {
                    console.error('Error fetching doctor bank info:', error);
                });
        }
    }, [doctorInfo.drAccountNo]);

    useEffect(() => {
        if (userInfo.userAccountNo) {
            axios.get(`http://localhost:8091/api/v2/getBankAccounts/${userInfo.userAccountNo}`)
                .then(response => {
                    setUserBankInfo(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user bank info:', error);
                });
        }
    }, [userInfo.userAccountNo]);

    useEffect(() => {
        if (appointments.length > 0 && doctorInfo.drAccountNo && userInfo.userAccountNo && consulateFee) {
            setIsDataReady(true);
        }
    }, [appointments, doctorInfo, userInfo, consulateFee]);

    useEffect(() => {
        if (isDataReady) {
            handlePayment();
        }
    }, [isDataReady]);

    const fetchAppointmentsByUserId = (userId) => {
        axios.get(`http://localhost:8091/api/v2/getAppointmentsByUserId/${userId}`)
            .then(response => {
                setAppointments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the appointments!', error);
            });
    };

    const cancelAppointment = (appointmentId) => {
        axios.put(`http://localhost:8091/api/v2/updateAppStatus/${appointmentId}/Cancelled`)
            .then(response => {
                if (response.data) {
                    const updatedAppointments = appointments.map(appointment => {
                        if (appointment.appId === appointmentId) {
                            return { ...appointment, appStatus: 'Cancelled' };
                        } else {
                            return appointment;
                        }
                    });
                    setAppointments(updatedAppointments);
                    handlePayment();
                    console.log('Appointment status updated successfully!');
                } else {
                    console.error('Failed to update appointment status!');
                }
            })
            .catch(error => {
                console.error('There was an error updating the appointment status!', error);
            });
    };

    const handlePayment = () => {
        const parsedConsulateFee = parseFloat(consulateFee);
        const doctorBalanceAmount = parseFloat(doctorBankInfo.balanceAmount);
        const userBalanceAmount = parseFloat(userBankInfo.balanceAmount);

        if (isNaN(parsedConsulateFee) || isNaN(doctorBalanceAmount) || isNaN(userBalanceAmount)) {
            setErrorMessage('Invalid data for payment.');
            return;
        }

        const updatedDoctorBalance = doctorBalanceAmount - parsedConsulateFee;
        const updatedUserBalance = userBalanceAmount + parsedConsulateFee;

        if (!isNaN(updatedDoctorBalance)) {
            axios.put(`http://localhost:8091/api/v2/updateBal/${doctorInfo.drAccountNo}/${updatedDoctorBalance}`)
                .then(response => {
                    setDoctorBankInfo(prevState => ({
                        ...prevState,
                        balanceAmount: updatedDoctorBalance
                    }));
                    console.log('Doctor balance updated:', response.data);
                })
                .catch(error => {
                    console.error('Error updating doctor balance:', error);
                    setErrorMessage('Error updating doctor balance.');
                });
        }

        if (!isNaN(updatedUserBalance)) {
            axios.put(`http://localhost:8091/api/v2/updateBal/${userInfo.userAccountNo}/${updatedUserBalance}`)
                .then(response => {
                    setUserBankInfo(prevState => ({
                        ...prevState,
                        balanceAmount: updatedUserBalance
                    }));
                    alert("payment refunded");
                    console.log('User balance updated:', response.data);
                })
                .catch(error => {
                    console.error('Error updating user balance:', error);
                    setErrorMessage('Error updating user balance.');
                });
        }
    };

    return (
        <>
        <section
      style={{ marginTop: '5rem', marginBottom: '1rem' }}
      id="home"
      className="bg-gray-900 text-white py-8"
    >
        <div className="container mt-5">
            <h2 className='text-center'>Appointments</h2>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Appointment ID</th>
                            <th>Doctor ID</th>
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
    {appointments.map(appointment => (
        <tr key={appointment.appId}>
            <td>{appointment.appId}</td>
            <td>{appointment.doctorId}</td>
            <td>{appointment.appStatus}</td>
            <td>{appointment.appDate}</td>
            <td>{appointment.appTime}</td>
            <td>{appointment.symptoms}</td>
            <td>{appointment.weight}</td>
            <td>{appointment.age}</td>
            <td>
                {appointment.appStatus !== 'Cancelled' && (
                    <button className="btn btn-danger" onClick={() => cancelAppointment(appointment.appId)}>Cancel</button>
                )}
            </td>
        </tr>
    ))}
</tbody>

                </table>
            </div>
        </div>
</section>
</>

    );
}
