import React from 'react'
import { Card } from 'react-bootstrap'
import './Mycss.css'
import { useHistory } from "react-router-dom";

export default function Home() {

  const history = useHistory();

  const routeChange = () =>{ 
    history.push("/signup");
  }
    return (
        <>
        <div id = "overallDiv">
          
          <div className = "w-100 bg-light" style = {{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),url(/1.jpg)", 
          backgroundSize:'cover'}}>
         <div className = "w-50 text-center p-5" style = {{height:500, color:'white',margin:'auto'}}>
           <h1 className = "mb-3" style = {{fontSize:60}}>EnerSol </h1> 
                 <h3 className = "p-1" style = {{lineHeight:'40px'}}>
             We are committed to providing you a better product at affordable prices. 
             All our products are sourced from leading solar products manufacturers.           
                        </h3>
           {/* <button className = "btn col-sm-6 btn-lg p-3 mt-5" style = {{backgroundColor:'#FF4200',color:'white'}}
           >
             Explore our solar systems</button> */}
             <div className = 'mainBtn col-sm-8 p-2 mt-5' onClick={routeChange}>
                <h3>Explore our solar systems</h3>
             </div>
           
           </div>
           
           {/* END OF FIRST DIV */}
           {/* <div className = "kkl">

           </div> */}

           </div>

           <div className = "p-5">
             {/* FIRST ROW */}
             <div className = "row p-5">
            <h2 className = "text-center" style = {{fontSize:40,}}>Any time you think about solar products, think <span 
            style = {{fontSize:50,fontWeight:'bold',color:'#FF4200',fontStyle:'italic'}}>EnerSol</span>. Here is Why</h2>
             </div>
             {/* FIRST ROW ENDS */}
             <div className = "row">
               <div className = "col-sm-3">
               <Card className = "p-2" >
          <Card.Img variant="top" src="/relax.jpg" style = {{margin:'auto',width:200}}/>
            <Card.Body>
              <Card.Title className = "text-center" style = {{fontSize:25}}>Quality Products</Card.Title>
              <Card.Text>
              Our products are manufactured following the best international quality standards.
               Every product comes with a maufacturer's warranty.               
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
               </div>
               <div className = "col-sm-3">                 
          <Card className = "p-2">
          <Card.Img variant="top" src="/ml.jpg" style = {{height:100,width:200, borderRadius:50,backgroundColor:'grey',margin:'auto'}} />
            <Card.Body>
              <Card.Title className = "text-center" style = {{fontSize:25}}>Flexible Terms & Multiple Payments Channels</Card.Title>
              <Card.Text>
              We offer flexible payments terms of up to 24 months and 
              Multiple Payment Channels. Pay Using a Channel that is Suited to You.
               VISA Cards, Mobile Money, Bank Transfer,
              You Choose
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
               </div>
               <div className = "col-sm-3">
               <Card className = " p-2">
          <Card.Img variant="top" src="/support.jpg" style = {{height:100,width:200, borderRadius:50,margin:'auto'}}/>
            <Card.Body>
              <Card.Title className = "text-center" style = {{fontSize:25}}>Multiple Quality Options</Card.Title>
              <Card.Text>
              We offer a wide range of solar products for domestic, commercial and industrial use.
              Our products include solar panels, inverters, batteries, bulbs, TVs, Fridges among others. We have quality products
              and packages for all your energy needs               
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
               </div>
               <div className = "col-sm-3">
               <Card className = "p-2">
          <Card.Img variant="top" src="/support.jpg" style = {{height:100,width:200, borderRadius:50,margin:'auto'}}/>
            <Card.Body>
              <Card.Title className = "text-center" style = {{fontSize:25}}>24/7 Support</Card.Title>
              <Card.Text>
               Our Sales and Technical teams are available 24-Hours, 7-Days a Week 
               to Address any Issues Our Customers Might Have
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
               </div>
             </div>
           {/* <div className = "w-100 d-flex align-items-center justify-content-center">
        
       
           </div> */}
           </div>


           {/* START OF THIRD DIV */}
           <div style = {{backgroundColor:'#B700FF'}} className = "p-5">
             {/*   #E6E3EF */}
           {/* <h1 className = "text-center" >Second Div Here</h1>  */}
           <div className = "row p-5" id = "highlightsDiv" style = {{color:'white'}}>
             <div className = "col-sm-4 p-2" style = {{borderRight:'2px solid white',fontFamily: 'Ubuntu'}}>
              <h1 className = "">Solar Systems from as low as UgX 450,000 ($120)</h1>
             </div>
             <div className = "col-sm-4 p-2" style = {{borderRight:'2px solid white',fontFamily: 'Ubuntu'}}>
               <h1 className = "ml-3">Help availabe 24/7 on the website and on Call</h1>
             </div>
             <div className = "col-sm-4" style = {{fontFamily: 'Ubuntu'}}>
               <h1 className = "ml-3">24 Months Manufacturer's Warranty</h1>
               </div>

           </div>
           </div>
         

           {/* END OF SECOND DIV */}

            {/* START OF THIRD DIV */}
            <div className = "row p-3" style = {{backgroundColor:'#E6E3EF'}}>
           <div className = 'row p-5' >
             <div className = "col-sm-12 w-50" style = {{margin:'auto'}}>
           <h1>
           “We are like tenant farmers chopping down the fence around our house for fuel when we should be using Natures 
           inexhaustible sources of energy – sun, wind and tide.” - Thomas Edison           
           </h1>
             </div>
           </div>
           <div className = "row p-2 text-center" style = {{fontFamily: 'Ubuntu'}}>
             <h1>Protect Mother Earth, Tap into her Inexaustible resources.<span style = {{color:'green'}}> Go Green, Go Solar </span></h1>
           </div>
           </div>
           {/* END OF THIRD DIV */}

           </div>
           
        </>
    )
}
<style>
{/* #highlightsDiv{color} */}
</style>