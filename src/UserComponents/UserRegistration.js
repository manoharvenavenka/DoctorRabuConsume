import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function UserRegistration() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationDate, setRegistrationDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [userAccountNo, setUserAccountNo] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [file, setFile] = useState(null);
  const nav = useNavigate();

  const uploadImage = async (file, filename) => {
    console.log("Uploading image...");
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", filename);

      try {
        const response = await axios.post("http://localhost:8091/api/files/upload", formData);
        if (response.status === 200) {
          console.log(`Image ${filename} uploaded successfully.`);
        } else {
          throw new Error(`Failed to upload image ${filename}`);
        }
      } catch (error) {
        console.log(`Error uploading image ${filename}:`, error);
      }
    } else {
      console.log("No image selected.");
    }
  };

  const addUser = async () => {
    const profilePicFilename = Date.now() + profilePic;

    try {
      const response = await axios.post('http://localhost:8091/api/v2/createUser', {
        name: name,
        email: email,
        registrationDate: registrationDate,
        gender: gender,
        mobile: mobile,
        password: password,
        address: address,
        profilePic: profilePicFilename,
        userAccountNo:userAccountNo
      }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });

      console.log(response.data);

      if (response.data) {
        await uploadImage(file, profilePicFilename);
        setRegistrationDate(new Date());

        nav('/user/userlogin');
        alert('User added successfully.');
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  const previewImage = (event) => {
    const input = event.target;
    const output = document.getElementById("p");
    output.src = URL.createObjectURL(input.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    addUser();
  };
  return (
    <>
      <section style={{ marginTop: '6rem', marginBottom: '1rem' }}>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title mb-4 mt-3 text text-center">Add User</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={gender === "male"} onChange={() => setGender("male")} />
                    <label className="form-check-label" htmlFor="male">Male</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={gender === "female"} onChange={() => setGender("female")} />
                    <label className="form-check-label" htmlFor="female">Female</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" id="other" value="other" checked={gender === "other"} onChange={() => setGender("other")} />
                    <label className="form-check-label" htmlFor="other">Other</label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile</label>
                  <input type="text" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="profilePic">Profile Picture</label>
                  <input type="file" className="form-control" id="profilePic" onChange={(e) => {
                    setProfilePic(e.target.files[0].name);
                    setFile(e.target.files[0]);
                    previewImage(e);
                  }} />
           <img
  id="p"
  className='img-fluid rounded-circle'
  width="130px"
  height="200px"
  alt='UserProfilePicture'
/>



                </div>
                <div className="form-group">
                  <label htmlFor="userAccountNo">BankAccountNumber</label>
                  <input type="text" className="form-control" id="userAccountNo" value={userAccountNo} onChange={(e) => setUserAccountNo(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary " onClick={onSubmitClick}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
