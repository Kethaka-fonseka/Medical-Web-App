import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./PatientDetails.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import {Text} from "react-bootstrap-text";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function PatientDetails() {
  const [imageList, setImageList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState();
  const [dob, setDob] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getImageList();
    getPatient();
  }, []);

  const getImageList = () => {
    axios
      .get(`http://localhost:8070/images/${id}`)
      .then((res) => {
        setImageList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPatient = () => {
    axios
      .get(`http://localhost:8070/patients/${id}`)
      .then((res) => {
        const patient = res.data;
        setFirstName(patient.firstName);
        setLastName(patient.lastName);
        setDob(patient.dob.substring(0, 10));
      })
      .catch((error) => {
        console.log(error);
      });
  };

const setUploadingImage = (e) =>{
  setImage(e.target.files[0]);
}

const uploadImage = (e) =>{
  e.preventDefault();
  const formData = new FormData();
  formData.append("image", image);
  formData.append("patient", id);
  formData.append("doctor", window.localStorage.getItem("username"));
  
  axios.post("http://localhost:8070/images", formData).then(res=>{
    console.log(res.data);
    window.location.href = `/patient/${id}`
  }).catch(error=>{
    console.log(error);
  })

}


  return (
    <div>
      <Card border="secondary" className="m-1">
        <Card.Header className="header">Patient Details</Card.Header>
        <Card.Body>
          <Card.Text className="card-text">
            <b>First Name: </b>
            {firstName}
          </Card.Text>
          <Card.Text className="card-text">
            <b>Last Name: </b>
            {lastName}
          </Card.Text>
          <Card.Text className="card-text">
            <b>Birth Date: </b>
            {dob}
          </Card.Text>
        </Card.Body>
      </Card>
      <div style={{ marginTop: "20px" }}>
      <Text uppercase bold center size='1'>patient Images</Text>
      <Form className="m-3 w-25" onSubmit={uploadImage}>
      <Form.Group  controlId="Image">
        <Form.Label>Upload new Image</Form.Label>
        <Form.Control type="file" placeholder="Image" onChange={setUploadingImage} />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Upload
      </Button>
      </Form>
      {imageList.length!=0?  <Container className="mt-5">
          <Row>
            {imageList.map((image, key) => {
              return (
                <Col  key={key} md="auto">
                  <Card>
                    <Image
                      width={300}
                      height={300}
                      src={`http://localhost:3000/images/${image.name}`}
                      rounded
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
          <br />
        </Container>:<div >
        <Text uppercase bold center>No Images To Show</Text>
          </div>}
      </div>
    </div>
  );
}
