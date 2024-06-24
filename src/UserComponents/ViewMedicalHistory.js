import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewMedicalHistory() {
    const [medicalHistories, setMedicalHistories] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user.userId);
            fetchMedicalHistories(user.userId);
        }
    }, []);

    const fetchMedicalHistories = (userId) => {
        axios.get(`http://localhost:8091/api/v2/MedicalByuserId/${userId}`)
            .then(response => {
                setMedicalHistories(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the medical histories!', error);
            });
    };

    return (
        <section className="bg-gray-900 text-white py-8">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-4">View Medical History</h2>
                                {medicalHistories.length > 0 ? (
                                    medicalHistories.map((medicalHistory, index) => (
                                        <div key={index} className="mb-4">
                                            <h5>User ID: {medicalHistory.userId}</h5>
                                            <h6>Allergy: {medicalHistory.allergy}</h6>
                                            <h6>Medical History:</h6>
                                            <pre>{medicalHistory.medicalHistory}</pre>
                                        </div>
                                    ))
                                ) : (
                                    <div>Loading medical history...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
