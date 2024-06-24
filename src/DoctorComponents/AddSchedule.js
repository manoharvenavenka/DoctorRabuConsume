import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import Footer from '../Footer';

export default function AddSchedule() {
    const [doct, setDoct] = useState("");

    const [schedule, setSchedule] = useState([{
        doctorId: '',
        scheduleDate: '',
        scheduleDay: 'Monday', // Set Monday as the initial schedule day
        startTime: '',
        endTime: '',
        status: false
    }]);
    
    useEffect(() => {
        const storedDoctor = sessionStorage.getItem('doctor');
        if (storedDoctor) {
            setDoct(JSON.parse(storedDoctor));
        }
    }, []);
    useEffect(() => {
        // Update doctorId in the initial state when doct is set
        setSchedule(prevSchedule => prevSchedule.map(s => ({ ...s, doctorId: doct.doctorId })));
    }, [doct]);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const addSchedule = () => {
        if (schedule.length < 6) {
            setSchedule([...schedule, {
                doctorId: doct.doctorId,
                scheduleDate: '',
                scheduleDay: daysOfWeek[schedule.length], // Set the schedule day based on the length of schedules array
                startTime: '',
                endTime: '',
                status: false
            }]);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value, checked, type } = event.target;
        const updatedSchedules = [...schedule];
        if (type === 'checkbox') {
            updatedSchedules[index][name] = checked; // Ensure the value is correctly set to true or false
        } else {
            updatedSchedules[index][name] = value;
        }
        setSchedule(updatedSchedules);
    };

    const onSubmitClick = async (e) => {
        e.preventDefault();
        console.log('haiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        try {
            for (const singleSchedule of schedule) {
                const response = await axios.post('http://localhost:8091/api/v2/createSchedule', singleSchedule, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
                console.log(response.data);
            }
            // Perform any additional actions upon successful addition
            setSchedule([]);
            alert('Schedules added successfully.');
        } catch (error) {
            console.log("Error:", error.message);
            // Handle error
        }
    };


    return (
        <>
            <section style={{ marginTop: '6rem', marginBottom: '1rem' }} id="home">
                <div className="container-fluid mt-5">
                    <div className="row justify-content-center" >
                        {schedule.map((schedule, index) => (
                            <div className="col-md-2" key={index}>
                                <div className="card mb-3 bg-dark text-white">
                                    <div className="card-header text-center" >Day {index + 1}</div>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3">
                                                <input type="hidden" className="form-control" name="doctorId" value={doct.doctorId} onChange={(e) => handleInputChange(index, e)} />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Schedule Date</label>
                                                <input type="date" className="form-control" name="scheduleDate" value={schedule.scheduleDate} onChange={(e) => handleInputChange(index, e)} required />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Schedule Day</label>
                                                <input type="text" className="form-control" name="scheduleDay" value={schedule.scheduleDay} readOnly />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Start Time</label>
                                                <input type="time" className="form-control" name="startTime" value={schedule.startTime} onChange={(e) => handleInputChange(index, e)} />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">End Time</label>
                                                <input type="time" className="form-control" name="endTime" value={schedule.endTime} onChange={(e) => handleInputChange(index, e)} />
                                            </div>

                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="status" checked={schedule.status} onChange={(e) => handleInputChange(index, e)} />
                                                    <label className="form-check-label">Taking Leave</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='col-sm-4'>

                        <button onClick={onSubmitClick} className="btn btn-primary mt-5 ">Add Schedules</button><br/>
                        <br></br>
                        <button className="btn btn-success" onClick={addSchedule}>Add Another Schedule</button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    );
}
