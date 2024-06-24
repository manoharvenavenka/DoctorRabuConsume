import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import axios from 'axios';

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user.userId) {
      // Fetch user data from the backend using the user's ID
      axios
        .get(`http://localhost:8091/api/v2/getUser/${user.userId}`)
        .then(response => {
          setUserData(response.data);
          setLoading(false);
          console.log('userData=', response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user.userId]);

  return (
    <section
      style={{ marginTop: '5rem', marginBottom: '1rem', backgroundColor: '#333', color: 'black', fontFamily: 'Arial, sans-serif' }}
      id="home"
      className="py-8"
    >
      <Row className="justify-content-center">
        <Col md={6} >
          <Card className={`bg-gray-800 text-dark ${loading ? 'loading' : ''}`}>
            <Card.Header className="text-center p-4">
              <div className="d-flex justify-content-center">
                {userData.profilePic ? (
                  <Image src={`http://localhost:8091/uploads/${userData.profilePic}`} alt="Profile Picture" roundedCircle fluid style={{ width: '150px', height: '150px' }} />
                ) : (
                  <div className="avatar-fallback">{userData.name?.charAt(0)}</div>
                )}
              </div>
              <h3 className="text-lg font-semibold mt-3">{userData.name}</h3>
              <p className="text-sm">User ID: {userData.userId}</p>
            </Card.Header>
            <Card.Body className="px-4">
              {Object.entries(userData).map(([key, value]) => (
                <Row key={key} className="mb-2">
                  <Col xs={6} className="font-medium text-uppercase">{key}</Col>
                  <Col xs={6} className="font-italic">{value}</Col>
                </Row>
              ))}
            </Card.Body>
            <Card.Footer>
              <button className='btn btn-success'>Edit</button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </section>
  );
}
