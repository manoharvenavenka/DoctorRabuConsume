import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddMedicalHistory() {
    const [form, setForm] = useState({
        userId: '',
        allergy: '',
        medicalHistory: ''
    });

    const template = `
        - Past Medical Conditions:
          - Condition 1: Details
          - Condition 2: Details
        - Surgeries:
          - Surgery 1: Details
          - Surgery 2: Details
        - Medications:
          - Medication 1: Dosage
          - Medication 2: Dosage
        - Family Medical History:
          - Condition 1: Details
          - Condition 2: Details
        - Social History (e.g., smoking, alcohol):
          - Smoking: Yes/No
          - Alcohol: Yes/No
        - Immunizations:
          - Immunization 1: Date
          - Immunization 2: Date
    `;

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setForm((prevForm) => ({
                ...prevForm,
                userId: user.userId
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8091/api/v2/createMedicalHistory', {
            userId: form.userId,
            allergy: form.allergy,
            medicalHistory: form.medicalHistory
        })
        .then(response => {
            console.log('Medical history added:', response.data);
            // Optionally, reset the form or show success message
            setForm({
                userId: '',
                allergy: '',
                medicalHistory: ''
            });
        })
        .catch(error => {
            console.error('There was an error adding the medical history!', error);
        });
    };

    const handleTemplate = () => {
        setForm({
            ...form,
            medicalHistory: template
        });
    };

    return (
        <>
        <section
      style={{ marginTop: '5rem', marginBottom: '1rem' }}
      id="home"
      className="bg-gray-900 text-white py-8"
    >
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title mb-4">Add Medical History</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label">User ID</label>
                            <input type="text" className="form-control" id="userId" name="userId" value={form.userId} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="allergy" className="form-label">Allergy</label>
                            <input type="text" className="form-control" id="allergy" name="allergy" value={form.allergy} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="medicalHistory" className="form-label">Medical History</label>
                            <textarea className="form-control" id="medicalHistory" name="medicalHistory" value={form.medicalHistory} onChange={handleChange}></textarea>
                            <button type="button" className="btn btn-secondary mt-2" onClick={handleTemplate}>Use Template</button>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Medical History</button>
                    </form>
                </div>
            </div>
        </div>
        </section>
        </>
    );
}