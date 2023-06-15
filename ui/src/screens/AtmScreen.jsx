import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Container, Form, Button, Card, Row, Col, Badge } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../index.css'


const AtmScreen = () => {
  const [location, setLocation] = useState("");
  const [finalLocation, setFinalLocation] = useState("");
  const [atms, setAtms] = useState([]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async (event) => {
    setFinalLocation(location);
    event.preventDefault();

    // fetch("http://host.docker.internal:8001/api/atm", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     },
    // })
    fetch("http://localhost:8001/api/atm", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setAtms(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <Container className="mt-5 mb-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Col md={1} />
          <Col md={7}>
            <Form.Control
              type="text"
              placeholder="Enter enter a ZIP code, or an address, city, and state."
              value={location}
              onChange={handleLocationChange}
              className="py-3 px-2"
            />
          </Col>
          <Col md={2}>
            <Button variant="dark" type="submit" className="w-100 me-3 px-5 py-2">
              <span style={{fontSize: '2.5vh'}}>Search</span>
            </Button>
          </Col>
          <Col md={1} />
        </Form.Group>
      </Form>

      {atms.length > 0 ? (
        <div className="mt-5">
          <h5 className="mb-4 mt-5">Showing results for {finalLocation}:</h5>
          <Row>
            <Col md={6}>
              <div className="card-container">
                {atms.map((atm, index) => (
                  <Card key={index} className="mb-4" style={{height: '12.5vh'}} onClick={() => setSelectedCard(atm)}>
                    <Badge bg="success" style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize:'15px' }}>
                        Open
                    </Badge>
                    <div className="flex-grow-1">
                        <Card.Body style={{marginTop: '0'}}>
                            <Card.Title style={{fontSize: '2.5vh', marginTop: '0'}}><strong>{atm.name}</strong></Card.Title>
                            <Card.Text>{atm.address.street + ", " + atm.address.city + ", " + atm.address.state + ", " + atm.address.zip}</Card.Text>
                        </Card.Body>
                    </div>
                  </Card>
                ))}
              </div>
            </Col>
            <Col md={6}>
                <div className="map-container">
                    <MapContainer center={[37.77528, -81.19197]} zoom={17} scrollWheelZoom={false}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {atms.map((atm, index) => (
                            <Marker key={index} position={[atm.coordinates.latitude, atm.coordinates.longitude]}>
                                <Popup keepInView='true' autoPan='false' >
                                    {atm.name}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </Col>
          </Row>
        </div>
      ) : null}
    </Container>
  );
};

export default AtmScreen;
