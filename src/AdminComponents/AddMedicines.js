import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddMedicines() {
    const [med, setMed] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [rxTermsResults, setRxTermsResults] = useState([]);

    const addUser = async () => {
        try {
            const response = await axios.post('http://localhost:8091/api/v2/createMedicine', {
                medecineName: med,
            }, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });

            console.log(response.data);

            if (response.data) {
                setMed('');
                alert('Medicine added successfully.');
            }
        } catch (error) {
            console.log("Error:", error.message);
            alert(`Error adding medicine: ${error.message}`);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addUser();
    };

    const performSearch = async () => {
        try {
            const openfda_url = `https://api.fda.gov/drug/label.json?search=indications_and_usage:"${searchQuery}"`;
            const rxnorm_url = `https://rxnav.nlm.nih.gov/REST/approximateTerm?term=${searchQuery}&maxEntries=10`;

            const [fdaResponse, rxnormResponse] = await Promise.all([
                axios.get(openfda_url),
                axios.get(rxnorm_url)
            ]);

            const openfda_data = fdaResponse.data.results || [];
            const rxnorm_data = rxnormResponse.data.approximateGroup?.candidate || [];

            const combinedResults = {
                fda: openfda_data,
                rxnorm: rxnorm_data
            };

            console.log('Search response:', combinedResults);
            setSearchResults(combinedResults);

        } catch (error) {
            console.log("Error:", error.message);
            alert(`Error performing search: ${error.message}`);
        }
    };

    const fetchRxTerms = async () => {
        try {
            const rxTerms_url = `https://rxnav.nlm.nih.gov/REST/RxTerms/allconcepts.json`;
            const response = await axios.get(rxTerms_url);

            const rxTerms_data = response.data?.minConceptGroup?.minConcept || [];
            setRxTermsResults(rxTerms_data);

            console.log('RxTerms response:', rxTerms_data);

        } catch (error) {
            console.log("Error:", error.message);
            alert(`Error fetching RxTerms data: ${error.message}`);
        }
    };

    const onSearchSubmit = (e) => {
        e.preventDefault();
        performSearch();
    };

    const onFetchRxTerms = (e) => {
        e.preventDefault();
        fetchRxTerms();
    };

    return (
        <>
            <section
                style={{ marginTop: '5rem', marginBottom: '1rem' }}
                id="home"
                className="bg-gray-900 text-white py-8"
            >
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={onSubmit}>
                                        <Form.Group controlId="formMedicineName">
                                            <Form.Label>Medicine Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={med}
                                                onChange={(e) => setMed(e.target.value)}
                                                placeholder="Enter medicine name"
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className="mt-2">
                                            Add Medicine
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={onSearchSubmit}>
                                        <Form.Group controlId="formSearchQuery">
                                            <Form.Label>Search for Medicines</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search for medicines"
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className="mt-2">
                                            Search
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-3">
                        {searchResults.fda && searchResults.fda.length > 0 && (
                            <Row>
                                <h3>FDA Results</h3>
                                {searchResults.fda.map((result, index) => (
                                    <Col md={4} key={index} className="mb-3">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>
                                                    {result.openfda.brand_name ? result.openfda.brand_name.join(', ') : 'No Brand Name'}
                                                </Card.Title>
                                                <Card.Text>
                                                    {result.openfda.generic_name ? result.openfda.generic_name.join(', ') : 'No Generic Name'}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                        {searchResults.rxnorm && searchResults.rxnorm.length > 0 && (
                            <Row>
                                <h3>RxNorm Results</h3>
                                {searchResults.rxnorm.map((result, index) => (
                                    <Col md={4} key={index} className="mb-3">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{result.rxcui}</Card.Title>
                                                <Card.Text>{result.name}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                        {(!searchResults.fda || searchResults.fda.length === 0) && 
                         (!searchResults.rxnorm || searchResults.rxnorm.length === 0) && (
                            <p>No results found</p>
                        )}
                    </Row>
                    
                    <Row className="justify-content-center mt-3">
                        {rxTermsResults && rxTermsResults.length > 0 && (
                            <Row>
                                <h3>RxTerms Medicine Names</h3>
                                {rxTermsResults.map((result, index) => (
                                    <Col md={4} key={index} className="mb-3">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{result.name}</Card.Title>
                                                <Card.Text>RxCUI: {result.rxcui}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Row>
                </Container>
            </section>
        </>
    );
}
