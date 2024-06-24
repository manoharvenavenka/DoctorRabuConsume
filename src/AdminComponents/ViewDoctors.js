import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Footer from '../Footer';

export default function ViewDoctors() {

  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchedData = async () => {
      const response = await fetch('http://localhost:8091/api/v2/allDoctors');
      const responseData = await response.json();
      console.log(responseData);

      setData(responseData);

    };
    fetchedData();
  }, []);



  const updateStatus = async (doctorId, currentStatus) => {
    let newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'; // Toggle status
    console.log('Updating Status......');
    try {
      const response = await axios.put(`http://localhost:8091/api/v2/updateStatus/${doctorId}/${newStatus}`);
      console.log(response);

      if (response.status === 200) {
        setData(data.map((record) => {
          if (record.doctorId === doctorId) {
            return { ...record, status: newStatus }; // Update status in the data array
          }
          return record;
        }));
      } else {
        return;
      }
    } catch (error) {
      console.log("Error:", error);
      // Handle error
    }
  };


  return (
    <>
    <section style={{ marginTop: '6rem', marginBottom: '1rem' }}>
      <div className='container-fluid'>
  
        <br />
        <h1 className='text-primary text-center'>View Doctors</h1>
        <div className="table-responsive">
          <table className='table table-sm table-dark table-bordered text-center'> {/* Added text-center class */}
            <thead>
              <tr>
                <th scope="col">Doctor Id</th>
                <th scope="col">Doctor Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Gender</th>
                <th scope="col">Certificate ID</th>
                <th scope="col">Certificate File</th>
                <th scope="col">Doctor Picture</th>
                <th scope="col">Hospital Number</th>
                <th scope="col">Hospital Name</th>
                <th scope="col">Hospital Picture</th>
                <th scope="col">Specialization</th>
                <th scope="col">Experience</th>
                <th scope="col">Location</th>
                <th scope="col">Status</th>
                <th scope="col">Consulate Fee</th>
                <th scope="col">Password</th>
                <th scope="col">Doctor Account Number</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              {data.map((doctor) => {
                return (
                  <tr key={doctor.doctorId}>
                    <td>{doctor.doctorId}</td>
                    <td>{doctor.doctorName}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.mobile}</td>
                    <td>{doctor.gender}</td>
                    <td>{doctor.certificateId}</td>
                    <td>{doctor.certificateFile}</td>
                    <td>{doctor.doctorPic}</td>
                    <td>{doctor.hospitalNo}</td>
                    <td>{doctor.hospitalName}</td>
                    <td>{doctor.hospitalPic}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.experience}</td>
                    <td>{doctor.location}</td>
                    <td>{doctor.status}</td>
                    <td>{doctor.consulateFee}</td>
                    <td>{doctor.password}</td>
                    <td>{doctor.drAccountNo}</td>
                    <td>
                      <button className={`btn ${doctor.status === 'Inactive' ? 'btn-success' : 'btn-danger'}`} onClick={() => updateStatus(doctor.doctorId, doctor.status)}>
                        {doctor.status === 'Active' ? 'Inactive' : 'Active'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
       
  
      </div>
    </section>

<Footer/>
    </>
  )
}  