import React from 'react';
//import { Button, Card, Form, Container } from 'react-bootstrap'
import { Container, Form,  Col, Row,Button } from 'react-bootstrap'
import axios from 'axios';
import { useHistory } from "react-router-dom";

//INITIALIZE FORM DATA
const initialFormData = Object.freeze({
    //dateAdded: "",
    category: "",
    origin: "",
    capacity: "",
    yom: "",
    warranty: "",
    cost: "", 
    quantity:'',       
    technology: "",   
    comments: "",
  });

//export default function Equipment() {
    const Equipment = () => {
        const [formData, updateFormData] = React.useState(initialFormData);

        const history = useHistory();

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      //console.log("FORM DATA ", formData)
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
      
    });
  };

  const handleSubmit = (e) => {
    //e.preventDefault()
    console.log(formData);
    axios({
      method: 'post',
      url: '/newEquipment',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
  })
  .then(function (response) {
      console.log("FORM SUBMITTED")
     
  })
  .catch(function (response) {
      //handle error
      console.log("FORM NOT YET SUBMITTED")
  });
  e.preventDefault()
history.push("/signup");

  };
  //END OF FORM SUBSMISSION

    return (
        <>
        <Container>
        <Form style = {{fontSize:20}} className = "pt-5">
            
  <Form.Group as={Row} className="mb-3" id = "equipment" >
    <Form.Label column sm="2">Equipment Category</Form.Label>
    <Col sm="3">
    <select className="browser-default custom-select mt-2 w-100 " size = 'lg' onChange={handleChange} name = "category"
    style = {{padding:5,fontSize:20}}>
          <option>Choose your option</option>
          <option value="panel">Solar Panel</option>
          <option value="battery">Battery</option>
          <option value="inverters">Inverters</option>
          <option value="meters">Energy Meter</option>
          <option value="accessories">Accessories</option>
        </select>
    </Col>
    <Form.Label column sm="2">Country of Origin</Form.Label>
    <Col sm="3">
    <select className="browser-default custom-select mt-2 w-100 " onChange={handleChange} name = "origin"
    style = {{padding:5,fontSize:20}}>
          <option>Select Country</option>
          <option value="USA">USA</option>
          <option value="Germany">Germany</option>
          <option value="China">China</option>
          <option value="South Africa">South Africa</option>
          <option value="Japan">Japan</option>
          <option value="Malaysia">Malaysia</option>
          <option value="South Korea">South Korea</option>
          <option value="India">India</option>
        </select>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="eqDetails" >
    <Form.Label column sm="2">Capacity</Form.Label>
    <Col sm="3">
      <Form.Control type="text" placeholder="Capacity" onChange={handleChange} name = "capacity" required/>
    </Col>
    <Form.Label column sm="2">Year of Manufacture</Form.Label>
    <Col sm="3">
      <Form.Control type="number" placeholder="YOM" onChange={handleChange} name = "yom"/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="mb-3" controlId="eqDetails">
    <Form.Label column sm="2">Warranty (Months)</Form.Label>
    <Col sm="3">
      <Form.Control type="number" placeholder="Warranty Period in Months" onChange={handleChange} name = "warranty"/>
    </Col>
    <Form.Label column sm="2">Quantity</Form.Label>
    <Col sm="3">
      <Form.Control type="number" placeholder="Number of Units" onChange={handleChange} name = "quantity"/>
    </Col>
    
  </Form.Group> 
  <Form.Group as={Row} className="mb-3" controlId="eqDetails">
    <Form.Label column sm="2">Type of Technology</Form.Label>
    <Col sm="3">
      <Form.Control type="text" placeholder="Tech upon which product is based" onChange={handleChange} name = "technology"/>
    </Col>
    <Form.Label column sm="2">Cost USD</Form.Label>
    <Col sm="3">
      <Form.Control type="text" placeholder="cost" onChange={handleChange} name = "cost"/>
    </Col>
  </Form.Group> 
  <Form.Group as={Row} className="mb-3" controlId="eqDetails"> 
  <Form.Label column sm="2">Comments</Form.Label>
    <Col sm="8">
    <Form.Control
      as="textarea"
      placeholder="Leave a comment here"
      style={{ height: '50px' }}
      onChange={handleChange}
      name = "comments"
    />
    </Col>
  </Form.Group>
  {/* <Form.Group as={Row} className="mb-3" controlId="eqDetails">
    <Form.Label column sm="2">Product Catalogue</Form.Label>
    <Col sm="3">
      <Form.Control type="file" placeholder="Upload Catalogue" style = {{border:'1px solid grey',width:'100%',borderRadius:'5px'}}/>
    </Col>
    <Form.Label column sm="2">Product Specification</Form.Label>
    <Col sm="3">
      <Form.Control type="file" placeholder="Product TDS" style = {{border:'1px solid grey',width:'100%',borderRadius:'5px'}} />
    </Col>
  </Form.Group> */}
  <Form.Group as={Row} className="mt-5" controlId="eqDetails"> 
  <Button variant="primary col-sm-10" type="submit" size = "lg" onClick={handleSubmit}>Submit</Button>

  </Form.Group>


  {/* <Form.Control type="file" multiple /> */}
</Form>

        </Container>
        </>
    )
}
export default Equipment;