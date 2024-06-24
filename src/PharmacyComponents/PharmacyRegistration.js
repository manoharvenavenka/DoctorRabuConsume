import React, { useState } from 'react';
import axios from 'axios';

export default function PharmacyRegistration() {
  const [pharamcyName, setpharamcyName] = useState('');
  const [shopRegNo, setShopRegNo] = useState('');
  const [location, setLocation] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationDate, setRegistrationDate] = useState(new Date()); // State for registration date
  const [pharmacyPic, setPharmacyPic] = useState('');
  const [file, setFile] = useState(null);

  const previewImage = (event) => {
      const input = event.target;
      const output = document.getElementById("pharmacyImage");
      output.src = URL.createObjectURL(input.files[0]);
  };

  const addPharmacy = async () => {
      let filename = Date.now() + pharmacyPic;

      try {
          let response = await axios.post('http://localhost:8091/api/v2/createPharmacy', {
            pharamcyName,
              shopRegNo,
              location,
              mobile,
              email,
              password,
              registrationDate,
              pharmacyPic: filename
          }, {
              headers: {
                  'Content-type': 'application/json; charset=UTF-8',
              },
          });

          if (response.data) {
              uploadImage(filename);
              // Reset fields
              setpharamcyName('');
              setShopRegNo('');
              setLocation('');
              setMobile('');
              setEmail('');
              setPassword('');
              setRegistrationDate(new Date()); 
              setPharmacyPic('');
          }
          console.log(response.data);
          alert('Pharmacy Added successfully...');
      } catch (error) {
          console.log("error=", error.message);
      }
  };

  const uploadImage = async (filename) => {
      if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("filename", filename);

          try {
              const response = await axios.post("http://localhost:8091/api/files/upload", formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              });

              if (response.status === 200) {
                  console.log("Image uploaded successfully:");
              } else {
                  throw new Error("Failed to upload image");
              }
          } catch (error) {
              console.error("Error uploading image:", error);
          }
      } else {
          console.error("No image selected..");
      }
  };

  const onSubmitClick = (e) => {
      e.preventDefault();
      addPharmacy();
  };
  return (

    <>
            <section  style={{ marginTop: '6rem', marginBottom: '1rem' }} id="home">

    <div className="container">
    <div className="card">
        <div className="card-body">
            <h1>Add Pharmacy</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="pharamcyName" className="form-label">Pharmacy Name:</label>
                    <input type="text" className="form-control" id="pharamcyName" value={pharamcyName} onChange={(e) => setpharamcyName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="shopRegNo" className="form-label">Shop Registration No:</label>
                    <input type="number" className="form-control" id="shopRegNo" value={shopRegNo} onChange={(e) => setShopRegNo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile:</label>
                    <input type="text" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="file1" className="form-label">Pharmacy Picture:</label>
                    <input type="file" className="form-control"  id="file1" onChange={(e) => {
                      setFile(e.target.files[0]);
                      setPharmacyPic(e.target.files[0].name);
                      previewImage(e);
                    }} />
                    <br />
                    <img id="pharmacyImage" style={{width:"90px",height:"90px"}} className="img-fluid" src="#" alt="Preview" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={onSubmitClick}>Add Pharmacy</button>
            </form>
        </div>
    </div>
</div>

</section>
                    </>
  )
}