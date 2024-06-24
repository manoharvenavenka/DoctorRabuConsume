import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewSchedule() {
    const [schedules, setSchedules] = useState([]);
    const [doct, setDoct] = useState("");

    useEffect(() => {
        const storedDoctor = sessionStorage.getItem('doctor');
        if (storedDoctor) {
            setDoct(JSON.parse(storedDoctor));
        }
    }, []);

    useEffect(() => {
        if (doct.doctorId) {
            // Fetch schedules from the backend using the doctor's ID
            axios.get(`http://localhost:8091/api/v2/getSchedules/${doct.doctorId}`)
                .then(response => {
                    setSchedules(response.data);
                })
                .catch(error => {
                    console.error('Error fetching schedules:', error);
                });
        }
    }, [doct]);

    return (
        <>
        <section style={{ marginTop: '6rem', marginBottom: '1rem' }} id="home">
        <div className="container">
            <h1>View Schedule</h1>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead style={{ backgroundColor: 'skyblue', color: 'white' }}>
                        <tr>
                            <th>Schedule ID</th>
                            <th>Doctor ID</th>
                            <th>Date</th>
                            <th>Day</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map(schedule => (
                            <tr key={schedule.scheduleId}>
                                <td>{schedule.scheduleId}</td>
                                <td>{schedule.doctorId}</td> {/* Assuming the doctor ID is directly available in the schedule object */}
                                <td>{schedule.scheduleDate}</td>
                                <td>{schedule.scheduleDay}</td>
                                <td>{formatTime(schedule.startTime)}</td>
                                <td>{formatTime(schedule.endTime)}</td>
                                <td>{schedule.status ? 'InActive' : 'Active'}</td>
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

// Function to format time to 12-hour format
const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const formattedHour = parseInt(hour) % 12 || 12;
    const suffix = parseInt(hour) >= 12 ? 'PM' : 'AM';
    return `${formattedHour}:${minute} ${suffix}`;
};
