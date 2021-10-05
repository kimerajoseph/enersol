import{ React, useState, useMemo} from 'react';
//import { Button, Card, Form, Container } from 'react-bootstrap'
import { Container, Form,  Col, Row,Button, Card } from 'react-bootstrap'
//import DatePicker from "react-datepicker";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import countryList from 'react-select-country-list'
import axios from 'axios';
import { useHistory } from "react-router-dom";


//INITIALIZE FORM DATA
const initialFormData = Object.freeze({
    surname: "",
    lastName: "",
    otherNames: "",
    username: "",
    gender:'', 
    DOB: "",
    country: "",
    city:'',
    email:'',
    phoneNumber:'',
    password: "", 
    confirmPassword:'',      
  });

  const Customer = () => {
    //const [value, setValue] = useState('')
    //const { signIn, signUp } = useState({signUp: 'block', signIn:'none' })
    
    const [signIn, setSignIn] = useState(true);
    const [signUp, setsignUp] = useState(false);
    //state = {showing: true, kimera:true }; 
    const options = useMemo(() => countryList().getData(), [])
    //console.log(options)
    const [formData, updateFormData] = useState({initialFormData});
    const history = useHistory();

    const onClick = () => {
        console.log("FUNCTION CALLED")
        setsignUp(true)
        setSignIn(false)
    }

    const backToSignIn = () => {
        setsignUp(false)
        setSignIn(true)
    }
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
          url: '/newCustomer',
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
    history.push("/");
    
      };
      //END OF FORM SUBSMISSION

 

      //APPENDING COUNTRIES TO SELECT ELEMENT
    let optionTemplate = options.map(v => (
        <option value={v.value}>{v.label}</option>
     ));
return(
    <>
     <Container style = {{display: (signUp ? 'block' : 'none') }} >
     <div className = "w-100 mt-2 text-center" style = {{marginTop:50,fontSize:30}} > 
    Already have an account? <span onClick = {backToSignIn} style = {{color:'blue',fontStyle:'italic',fontSize:30}}>Sign in Here</span>
            </div>
         {/* SIGN UP FORM */}
         <div className = "w-80" style = {{margin:'auto'}}>
        <Form style = {{fontSize:20, margin:'auto'}} className = "pt-5">

        <Form.Group as={Row} className="mb-3" id = "name" >
    <Form.Label column sm="2">Surname</Form.Label>
    <Col sm="3">
    <Form.Control type="text" placeholder="surname"  name = "surname"  onChange={handleChange}/>
        </Col>
        <Form.Label column sm="2">Last name</Form.Label>
    <Col sm="3">
    <Form.Control type="text" placeholder="last name"  name = "lastName"  onChange={handleChange}/>
        </Col>
        </Form.Group>

  <Form.Group as={Row} className="mb-3"  >
    <Form.Label column sm="2">Other Names</Form.Label>
    <Col sm="3">
    <Form.Control type="text" placeholder="Other Names"  name = "otherNames"  onChange={handleChange}/>
        </Col>
        <Form.Label column sm="2">username</Form.Label>
    <Col sm="3">
    <Form.Control type="text" placeholder="Your username"  name = "username"  onChange={handleChange}/>
         </Col>        
        </Form.Group>


        <Form.Group as={Row} className="mb-3"  >
    <Form.Label column sm="2">Gender</Form.Label>
    <Col sm="3">
    {/* <Form.Control type="text" placeholder="Other Names"  name = "gender" required/> */}
    <select className="browser-default custom-select mt-2 w-100 " name = "gender" onChange={handleChange}
    style = {{padding:5,fontSize:20}}>
          <option>Select Gender</option>
          <option value="male">Male </option>
          <option value="female">Female</option>
         </select>
        </Col>
        <Form.Label column sm="2">Date of birth</Form.Label>
        <Col sm="3">
    <DayPickerInput  onChange={handleChange} name = 'DOB'
    //   dayPickerProps={{ month: new Date(2018, 10), showWeekNumbers: true, todayButton: 'Today',  minWidth:'100%',}}   
    />
        </Col>        
        </Form.Group>

        <Form.Group as={Row} className="mb-3" >        
        <Form.Label column sm="2">Country of residence</Form.Label>
    <Col sm="3">
    <select className="browser-default custom-select mt-2 " style = {{maxWidth:'100%',padding:5,fontSize:20}} onChange={handleChange}>    
    <option selected disabled>Select country</option>
      {optionTemplate}
    </select>
        </Col>
        <Form.Label column sm="2">City</Form.Label>
    <Col sm="3">
    <Form.Control type="text" placeholder="city of residence"  name = "city" required onChange={handleChange}/>
        </Col>
        </Form.Group>

        
        <Form.Group as={Row} className="mb-3"  >
    <Form.Label column sm="2">Email</Form.Label>
    <Col sm="3">
    <Form.Control type="text" placeholder="jonkkl@gmail.com"  name = "email" required onChange={handleChange}/>
        </Col>
        <Form.Label column sm="2">Telephone</Form.Label>
    <Col sm="3">
    <Form.Control type="text" placeholder="Your phone number"  name = "phoneNumber" required onChange={handleChange}/>
         </Col>        
        </Form.Group>

     

        <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="2">Password</Form.Label>
    <Col sm="3">
    <Form.Control type="password"   name = "password" required onChange={handleChange}/>
        </Col>
    <Form.Label column sm="2">Confirm Password</Form.Label>
    <Col sm="3">
    <Form.Control type="password"   name = "confirmPassword" required onChange={handleChange}/>
         </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-5" controlId="userSubmit"> 
  <Button variant="primary col-sm-10" type="submit" size = "lg" onClick={handleSubmit}>Sign Up</Button>

  </Form.Group>
        </Form>
        </div>
        </Container>
     {/* SING IN FORM */}
<Container  style = {{minHeight:'100vh',display: (signIn ? 'block' : 'none') }}>
<div className = "container" style = {{maxWidth:'500px',marginTop:'50px'}}>
     {/* <h1>THIS IS THE SIGN IN PAGE</h1> */}
     <div className = "w-100" style = {{maxWidth:'500px'}}>
      <Card>
            <Card.Body>
                <h1 className = 'text-center mb-4'>Sign in</h1>
                <Form>
                    <Form.Group id = "email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type = "email" required  />
                    </Form.Group>
                    <Form.Group id = "password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" required  />
                    </Form.Group>
                    {/* <Form.Group id = "passwordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type = "paswword" required  />
                    </Form.Group> */}
                   
                    <Button className = "w-100 mt-4">Sign In</Button>
                </Form>
            </Card.Body>
            
            <div className = "w-100 mt-2 text-center" style = {{marginBottom:30,fontSize:25}} >                     
                Don't have an account? <span style = {{color:'blue',fontStyle:'italic',fontSize:25}} onClick={onClick}>Sign up Here</span>
            </div>
        </Card>      
      </div>
     
     </div>
      
    </Container>
   
  

   
    </>
)

  }
  //const Text = () => <div>You clicked the button!</div>;
    export default Customer;