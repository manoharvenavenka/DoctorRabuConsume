import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { Stepper, Step, StepLabel, Button, Typography, Box, Paper, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// Component for viewing doctors' schedules
function ViewDoctorsBySId({ onScheduleSelect }) {
    const { doctorId } = useParams(); // Accessing doctorId from URL params
    const [schedules, setSchedules] = useState([]); // Initialize schedules as an array
    const [selectedScheduleId, setSelectedScheduleId] = useState(null); // State to track selected schedule ID

    useEffect(() => {
        if (doctorId) {
            // Fetch schedules from the backend using the doctor's ID
            axios.get(`http://localhost:8091/api/v2/getSchedules/${doctorId}`)
                .then(response => {
                    setSchedules(response.data);
                })
                .catch(error => {
                    console.error('Error fetching schedules:', error);
                });
        }
    }, [doctorId]);

    // Function to format time to 12-hour format
    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        const formattedHour = parseInt(hour) % 12 || 12;
        const suffix = parseInt(hour) >= 12 ? 'PM' : 'AM';
        return `${formattedHour}:${minute} ${suffix}`;
    };

    const handleCheckboxChange = (scheduleId) => {
        setSelectedScheduleId(scheduleId);
        onScheduleSelect(scheduleId); // Pass selected scheduleId and scheduleDate to parent component
    };

    return (
        <Paper elevation={3} style={{ padding: '2rem', marginBottom: '1rem' }}>
            <Typography variant="h5" gutterBottom>View Schedule</Typography>
            <div className="table-responsive">
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th>Schedule ID</th>
                            <th>Doctor ID</th>
                            <th>Date</th>
                            <th>Day</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Status</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map(schedule => (
                            <tr key={schedule.scheduleId}>
                                <td>{schedule.scheduleId}</td>
                                <td>{schedule.doctorId}</td>
                                <td>{schedule.scheduleDate}</td>
                                <td>{schedule.scheduleDay}</td>
                                <td>{formatTime(schedule.startTime)}</td>
                                <td>{formatTime(schedule.endTime)}</td>
                                <td>{schedule.status ? 'OnLeave' : 'Available'}</td>
                                <td>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedScheduleId === schedule.scheduleId}
                                                onChange={() => handleCheckboxChange(schedule.scheduleId)}
                                                disabled={schedule.status || (selectedScheduleId && selectedScheduleId !== schedule.scheduleId)}
                                            />
                                        }
                                        label=""
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Paper>
    );
}

// Component for adding appointment
function AddAppointment({ scheduleId, enableNext }) {
    const { doctorId } = useParams(); // Accessing doctorId from URL params
    const [user1, setUser1] = useState({});
    const [sch, setSch] = useState({});
    const [symptoms, setSymptoms] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [appTime, setAppTime] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser1(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (scheduleId) {
            // Fetch schedules from the backend using the doctor's ID
            axios.get(`http://localhost:8091/api/v2/getSchedule/${scheduleId}`)
                .then(response => {
                    setSch(response.data);
                })
                .catch(error => {
                    console.error('Error fetching schedules:', error);
                });
        }
    }, [scheduleId]);

    useEffect(() => {
        if (symptoms && weight && age && appTime && isCheckboxChecked) {
            setIsFormValid(true);
            enableNext(true);
        } else {
            setIsFormValid(false);
            enableNext(false);
        }
    }, [symptoms, weight, age, appTime, isCheckboxChecked, enableNext]);
    // Function to format time to 12-hour format
    const formatTime = (time) => {
        if (!time) return ''; // Check for undefined or null time
        const [hour, minute] = time.split(':');
        const formattedHour = parseInt(hour) % 12 || 12;
        const suffix = parseInt(hour) >= 12 ? 'PM' : 'AM';
        return `${formattedHour}:${minute} ${suffix}`;
    };
    const handleAppointmentSubmit = async () => {
        console.log('Submitting appointment...');
        try {
            // Make a POST request to your backend API endpoint
            await axios.post('http://localhost:8091/api/v2/AddAppointment', {
                userId: user1.userId,
                doctorId: doctorId,
                scheduleId: scheduleId,
                appStatus: 'Pending', // Set the initial status of the appointment
                appTime: appTime,
                appDate: sch.scheduleDate,
                bookDate: new Date().toISOString(), // Set the booking date as the current date and time
                symptoms: symptoms,
                weight: weight,
                age: age
            });

            // Clear input fields and reset state




        } catch (error) {
            // Display error message if request fails
            console.error('Error adding appointment:', error);
        }
    };

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked);
        if (e.target.checked && symptoms && weight && age && appTime) {
            handleAppointmentSubmit();
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '2rem', marginBottom: '1rem' }}>
            <Typography variant="h5" gutterBottom align="center">Appointment Details</Typography>

            <h3 className='text text-center'><span style={{ color: 'red' }}>*</span>Please Select The Timings As Shown in Below</h3>
            <h4 className='text text-center'><span style={{ color: 'red' }}>*</span>Doctor Will Be Available.</h4>
            <h5 style={{ color: '#003366' }} className='text text-center'><span style={{ color: '#1974d2 ' }}>On:{sch.scheduleDay}({sch.scheduleDate})</span>&nbsp;&nbsp;<span style={{ color: '' }}></span>{formatTime(sch.startTime)}&nbsp;&nbsp;&nbsp;<span style={{ color: 'blue' }}>To</span>&nbsp;&nbsp;<span style={{ color: 'red' }}>{formatTime(sch.endTime)}</span></h5>
            <form>


                <TextField
                    label="Appointment Time"
                    value={appTime}
                    onChange={(e) => setAppTime(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isCheckboxChecked}
                            onChange={handleCheckboxChange}
                            disabled={!symptoms || !weight || !age || !appTime} // Disable checkbox if form is not valid
                            required
                        />
                    }
                    label="I confirm the details are correct"
                />
            </form>
        </Paper>
    );
}



function BankingDetails({ enableNext }) {
    const { doctorId } = useParams();
    const [user1, setUser1] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [doctorInfo, setDoctorInfo] = useState({});
    const [consulateFee, setConsulateFee] = useState();
    const [userBankInfo, setUserBankInfo] = useState({});
    const [doctorBankInfo, setDoctorBankInfo] = useState({});
    const [isPaymentEnabled, setIsPaymentEnabled] = useState(true);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser1(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (doctorId) {
            axios.get(`http://localhost:8091/api/v2/getDoctor/${doctorId}`)
                .then(response => {
                    setDoctorInfo(response.data);
                    setConsulateFee(response.data.consulateFee);
                })
                .catch(error => {
                    console.error('Error fetching doctor info:', error);
                });
        }
    }, [doctorId]);

    useEffect(() => {
        if (user1.userId) {
            axios.get(`http://localhost:8091/api/v2/getUser/${user1.userId}`)
                .then(response => {
                    setUserInfo(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, [user1.userId]);

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

    const handlePaymentSuccess = () => {
        alert('Payment successful!');
        setIsPaymentEnabled(false); // Disable the pay button
        enableNext(true); // Call the function passed via props to enable the next step
    };

    const handlePayment = () => {
        const parsedConsulateFee = parseFloat(consulateFee);
        const doctorBalanceAmount = parseFloat(doctorBankInfo.balanceAmount);
        const userBalanceAmount = parseFloat(userBankInfo.balanceAmount);
        
        if (isNaN(parsedConsulateFee) || isNaN(doctorBalanceAmount) || isNaN(userBalanceAmount)) {
            setErrorMessage('Invalid data for payment.');
            return;
        }

        const updatedDoctorBalance = parsedConsulateFee + doctorBalanceAmount;
        const updatedUserBalance = userBalanceAmount - parsedConsulateFee;
        
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
                    handlePaymentSuccess(); // Call payment success handler
                    console.log('User balance updated:', response.data);
                })
                .catch(error => {
                    console.error('Error updating user balance:', error);
                    setErrorMessage('Error updating user balance.');
                });
        }
        try {
            // Make a POST request to your backend API endpoint
            axios.post('http://localhost:8091/api/v2/createPayment', {
                userId: user1.userId,
                doctorId: doctorId,
                amount: parsedConsulateFee,
                fromAcc: userInfo.userAccountNo, // Set the initial status of the appointment
                toAcc: doctorInfo.drAccountNo,
                paymentDate: new Date().toISOString(), // Set the booking date as the current date and time
            })
            .then(response => {
                // Log the response to the console
                console.log('Response:', response.data);
                // Clear input fields and reset state
            })
            .catch(error => {
                // Display error message if request fails
                console.error('Error adding appointment:', error);
            });
        } catch (error) {
            // Handle any synchronous errors
            console.error('Error adding appointment:', error);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '2rem', marginBottom: '1rem' }}>
            <Typography variant="h5" gutterBottom>Banking Details</Typography>
            <Typography variant="body1">Banking details form goes here.</Typography>
            <h3>doctorId: {doctorId}</h3>
            <h3>userId: {user1.userId}</h3>
            {errorMessage && <p>{errorMessage}</p>}
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handlePayment}
                disabled={!isPaymentEnabled} // Disable the button if payment is not enabled
            >
                Pay
            </Button>
        </Paper>
    );
}

function Success() {
    return (
      <Paper elevation={3} style={{ padding: '2rem', marginBottom: '1rem' }}>
        <Typography variant="h5" gutterBottom>Success</Typography>
        <Typography variant="body1">Your process is completed successfully.</Typography>
      </Paper>
    );
  }
  
  // Styled StepIcon for custom colors
  const StyledStepIcon = styled('div')(({ theme, active, completed }) => ({
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: completed ? '#4caf50' : active ? '#2196f3' : '#bdbdbd', // Custom colors
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }));
  
  // Styled StepConnector for custom colors
  const StyledStepConnector = styled('div')(({ theme }) => ({
    flex: 1,
    borderTop: `2px solid ${theme.palette.mode === 'light' ? '#eaeaf0' : '#43425d'}`,
  }));
  
  export default function MainComponent() {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedScheduleDate, setSelectedScheduleDate] = useState(null);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const navigate = useNavigate();
  
    // Handle schedule selection
    const handleScheduleSelect = (scheduleId, scheduleDate) => {
      setSelectedScheduleId(scheduleId);
      setSelectedScheduleDate(scheduleDate);
      setIsNextEnabled(true);
    };
  
    // Steps components array
    const steps = [
      <ViewDoctorsBySId onScheduleSelect={handleScheduleSelect} />,
      <AddAppointment scheduleId={selectedScheduleId} enableNext={setIsNextEnabled} />,
      <BankingDetails enableNext={setIsNextEnabled} />,
      <Success />
    ];
  
    // Handle next step
    const handleNext = () => {
      if (activeStep === steps.length - 1) {
        navigate('/user/userhome'); // Navigate to home when "Finish" is clicked
      } else {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setIsNextEnabled(false); // Reset isNextEnabled for the next step
      }
    };
  
    // Handle previous step
    const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
  
    return (
      <section style={{ marginTop: '6rem', marginBottom: '1rem' }} id="home">
        <div className="container">
          <Typography variant="h4" gutterBottom>Stepper Example</Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {['Schedule Details', 'Add Appointment', 'Banking Details', 'Success'].map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={StyledStepIcon}>{label}</StepLabel>
                {index < steps.length - 1 && <StyledStepConnector />}
              </Step>
            ))}
          </Stepper>
          <div style={{ backgroundColor: activeStep === steps.length - 1 ? '#4caf50' : 'transparent', padding: '2rem', marginTop: '1rem' }}>
            {steps[activeStep]}
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleBack}
              disabled={activeStep === 0 || activeStep === 2 || activeStep === steps.length - 1} // Disable on first, BankingDetails, and Success steps
              sx={{ mr: 1 }}
            >
              Previous
            </Button>
            <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleNext}
                        disabled={!isNextEnabled && activeStep !== steps.length - 1} // Enable on last step
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>

          </Box>
        </div>
      </section>
    );
  }
  
  
  
  
  
  
  
  