import React from 'react';
import { Container, Form,  Col, Row } from 'react-bootstrap'
import axios from 'axios';

const thisOrigin = Object.freeze({
    category: '',
    origin: '', 
    //timeStamp: '',
  });
 
//function quotePage(props) {
    const QuotePage = () => {
        const [newOrigin,updateOrigin] = React.useState(thisOrigin);

        const getOurRes = async() =>{
          console.log("GET RESPONSE FUNCTION CALLED")
           // const response = await axios("/selfHelpLoad");
            const response = await fetch("/eqCountry");
            const data = await response.json();
            console.log("THIS IS THE DATA FROM AXIOS ",data)
          };

       const handleChange = (e) => {              
      
        updateOrigin({
        //   const selName = e.target.name.trim();
        // const selValue = e.target.value.trim();
        
            ...newOrigin,
            [e.target.name]: e.target.value.trim()
            //const [state, setState ] = useState([]);

          });
            console.log("UPDATED ORIGIN ", newOrigin)
          axios({
            method: 'post',
            url: '/selfHelpLoad',
            data: newOrigin,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(()=>{
              console.log("GET OUR RESPONSE CALLED")
              getOurRes()
            })          
            
            .catch((error)=> {
                console.log("got errr while posting data", error);
            })

        }
        //END OF UPDATE FUNCTION


    return (
        <>
            
           <div className = "w-100 bg-light">
           <h1>Welcome to the test page</h1> 
           <Container>
        <Form style = {{fontSize:20}} className = "pt-5">
            
  <Form.Group as={Row} className="mb-3" id = "equipment" >
    <Form.Label column sm="2">Equipment Category</Form.Label>
    <Col sm="3">
    <select className="browser-default custom-select mt-2 w-100 " size = 'lg'  name = "category" onChange={handleChange}
    style = {{padding:5,fontSize:20,textAlign:'center'}}>
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
    <select className="browser-default custom-select mt-2 w-100 " name = "origin" onChange={handleChange}
    style = {{padding:5,fontSize:20,textAlign:'center'}}>
          <option>Select Country</option>
          {/* {optionTemplate} */}
          <option value="usa">USA</option>
          <option value="germany">Germany</option>
          <option value="china">China</option>
          <option value="southAfrica">South Africa</option>
          <option value="jpn">Japan</option>
          <option value="malaysia">Malaysia</option>
          <option value="southKorea">South Korea</option>
          <option value="india">India</option>
        </select>
    </Col>
    </Form.Group>
    </Form>
    </Container>
           
           </div>
        </>
    );
}

export default QuotePage;