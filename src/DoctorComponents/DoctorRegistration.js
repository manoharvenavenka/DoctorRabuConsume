import { React, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function DoctorRegistration() {
    const [doctorName, setDoctorName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [certificateId, setCertificateId] = useState("");
    const [certificateFile, setCertificateFile] = useState("");
    const [doctorPic, setDoctorPic] = useState("");
    const [hospitalNo, setHospitalNo] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [hospitalPic, setHospitalPic] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("Inactive");
    const [consulateFee, setConsulateFee] = useState(0);
    const [password, setPassword] = useState("");
    const [registrationDate, setRegistrationDate] = useState(new Date());
    const [drAccountNo, setDrAccountNo] = useState(0);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const nav = useNavigate();

    const uploadImage = async (file, filename) => {
        console.log("AAAA");
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("filename", filename);
    
            try {
                const response = await axios.post("http://localhost:8091/api/files/upload", formData);
    
                if (response.status === 200) {
                    console.log(`Image ${filename} Upload Successfully..`);
                } else {
                    throw new Error(`Failed to Upload Image ${filename}`);
                }
            } catch (error) {
                console.log(`Error uploading Image ${filename}:`, error);
            }
        } else {
            console.log("No image selected...");
        }
    };

    const addDoctor = async () => {
        const doctorPicFilename = Date.now() + doctorPic;
        const hospitalPicFilename = Date.now() + hospitalPic;
        const certificateFileFilename = Date.now() + certificateFile;

        try {
            const response = await axios.post('http://localhost:8091/api/v2/createDoctor', {
                doctorName: doctorName,
                email: email,
                mobile: mobile,
                gender: gender,
                certificateId: certificateId,
                certificateFile: certificateFileFilename,
                doctorPic: doctorPicFilename,
                hospitalNo: hospitalNo,
                hospitalName: hospitalName,
                hospitalPic: hospitalPicFilename,
                specialization: specialization,
                experience: experience,
                location: location,
                registrationDate: registrationDate,
                status: status,
                consulateFee: consulateFee,
                password: password,
                drAccountNo: drAccountNo
            }, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });

            console.log(response.data);

            if (response.data) {
                await uploadImage(file1, doctorPicFilename);
                await uploadImage(file2, hospitalPicFilename);
                await uploadImage(file3, certificateFileFilename);

                setDoctorName("");
                setEmail("");
                setMobile("");
                setGender("");
                setCertificateId("");
                setCertificateFile("");
                setDoctorPic("");
                setHospitalNo("");
                setHospitalName("");
                setHospitalPic("");
                setSpecialization("");
                setExperience("");
                setLocation("");
                setStatus("");
                setConsulateFee(0);
                setRegistrationDate(new Date());
                setPassword("");
                setDrAccountNo(0);
                setFile1(null);
                setFile2(null);
            setFile3(null);
                nav('/doctor/login');
                alert('Doctor Added Successfully..');
            }
        } catch (error) {
            console.log("error = " + error.message);
        }
    };

    const onSubmitClick = (e) => {
        e.preventDefault();
        addDoctor();
    };

    const previewImage = (event) => {
        const input = event.target;
        const output = document.getElementById("doc");
        output.src = URL.createObjectURL(input.files[0]);
    };
    const previewImage1 = (event) => {
        const input = event.target;
        const output = document.getElementById("hosp");
        output.src = URL.createObjectURL(input.files[0]);
    };
    const previewImage2 = (event) => {
        const input = event.target;
        const output = document.getElementById("cert");
        output.src = URL.createObjectURL(input.files[0]);
    };


    return (
        <>
            <section style={{ marginTop: '6rem', marginBottom: '1rem' }}>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title mb-4 mt-3 text text-center">Add Doctor</h1>
                            <form >
                                <div className="form-group">
                                    <label htmlFor="doctorName">Doctor Name</label>
                                    <input type="text" className="form-control" id="doctorName" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="text" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                </div>


                                <div className="form-group">
                                    <label>Gender</label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={gender === "male"} onChange={() => setGender("male")} />
                                        <label className="form-check-label" htmlFor="male">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={gender === "female"} onChange={() => setGender("female")} />
                                        <label className="form-check-label" htmlFor="female">
                                            Female
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" id="other" value="other" checked={gender === "other"} onChange={() => setGender("other")} />
                                        <label className="form-check-label" htmlFor="other">
                                            Other
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="certificateId">Certificate ID</label>
                                    <input type="text" className="form-control" id="certificateId" value={certificateId} onChange={(e) => setCertificateId(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="hospitalPic">Hospital Picture</label>
                                    <input type="file" className="form-control" id="hospitalPic" onChange={(e) => {
                                        setHospitalPic(e.target.files[0].name);
                                        setFile1(e.target.files[0]);
                                        previewImage1(e);
                                    }}  />
                                                        <img id="hosp" style={{width:"90px",height:"90px"}} className="img-fluid"  alt="Preview" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="certificateFile">Certificate File</label>
                                    <input type="file" className="form-control" id="certificateFile" onChange={(e) => {
                                        setCertificateFile(e.target.files[0].name);
                                        setFile2(e.target.files[0]);
                                        previewImage2(e);
                                    }}  />
                                                        <img id="cert" style={{width:"90px",height:"90px"}} className="img-fluid"  alt="Preview" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="doctorPic">Doctor Picture</label>
                                    <input type="file" className="form-control" id="doctorPic" onChange={(e) => {
                                         setDoctorPic(e.target.files[0].name);
                                        setFile3(e.target.files[0]);
                                        previewImage(e);
                                    }}  />
                                                        <img id="doc" style={{width:"90px",height:"90px"}} className="img-fluid"  alt="Preview" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="hospitalNo">Hospital Number</label>
                                    <input type="text" className="form-control" id="hospitalNo" value={hospitalNo} onChange={(e) => setHospitalNo(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="hospitalName">Hospital Name</label>
                                    <input type="text" className="form-control" id="hospitalName" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="specialization">Specialization</label>
                                    <input type="text" className="form-control" id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="experience">Experience</label>
                                    <input type="text" className="form-control" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location">Location</label>
                                    <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="consulateFee">Consulate Fee</label>
                                    <input type="number" className="form-control" id="consulateFee" value={consulateFee} onChange={(e) => setConsulateFee(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="drAccountNo">Doctor Account Number</label>
                                    <input type="number" className="form-control" id="drAccountNo" value={drAccountNo} onChange={(e) => setDrAccountNo(e.target.value)} />
                                </div>
                                <center>

                                    <button type="submit" className="btn btn-primary mt-5 mb-4" onClick={onSubmitClick}>Submit</button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
