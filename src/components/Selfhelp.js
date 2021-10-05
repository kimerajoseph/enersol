import React, { Component } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

// const [state, setState] = React.useState({
//   firstName: "",
//   lastName: ""
// })
  class Selfhelp extends Component {
     state = {showing: true, kimera:true }; 
    constructor(props) {
      super(props);  
      this.state = {
        identifier: '',
        country: '', 
        timeStamp: '',
        cost:'', 
        loan:'',  
        intRate:6, 
        monthlyPayt: '',
        totalInterest: '', 
        paytPrd:12,
        totalCost:'',
        downPayt:0, 
        ourCountries: [], 
        capacityArray:[],
        costArray:[],
        result:{},
        category:'',     
      };  
    }
    categoryChange = (e) =>{
      const ourCategory = e.target.value.trim();
       this.setState({
        category: ourCategory,
    }) 
    const { category } = {'category':ourCategory}
    const itemReq = {
      category,
    }; 
    axios({
      method: 'post',
      url: '/countries',
      data: itemReq,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      }) .then((resp) => {
        const result = resp.data;
        console.log("OUR RESULT ", result)
        var finalArray = []    
    for(var i=0;i<result.length;i++){
      console.log("COUNTRY OF ORIGIN ",result[i].origin)
      finalArray.push(result[i].origin)
    }
    console.log(finalArray)
        this.setState({
          ourCountries:  finalArray,
          result:result,
        })
       }).catch((error)=> {
        console.log("got errr while posting data", error);
    })
    }

    //AUTO APPEND CAPACITY OPTIONS
        handleChange = (e) => {              
       const selValue = e.target.value.trim();
       const checkCategory = this.state.category     
       var capacityArray = [] 
       var ourResult = this.state.result
       console.log("RESULT IS ", ourResult)
       for(var i=0;i<ourResult.length;i++){
         if(ourResult[i].origin === selValue && ourResult[i].category === checkCategory){
           console.log("OUR RESS",ourResult[i])
          capacityArray.push(ourResult[i].capacity)
         console.log("SELECTED CAPACITY ",ourResult[i].capacity)
         }       
      }  
      console.log("SELECTED CAPACITY ",capacityArray) 
      this.setState({
        capacityArray:  capacityArray,
        country: selValue,        
      })
    }   
    
// //CREATE TABLE FXN
// renderTableData() {
//   return this.state.students.map((student, index) => {
//      const { id, name, age, email } = student //destructuring
//      return (
//         <tr key={id}>
//            <td>{id}</td>
//            <td>{name}</td>
//            <td>{age}</td>
//            <td>{email}</td>
//         </tr>
//      )
//   })
// }

    //AUTO APPEND COST OPTIONS
    costChange = (e) => {  
      console.log("COST FXN CALLED ")
      const selCapacity = e.target.value.trim();
      const checkCategory = this.state.category
      const checkCountry = this.state.country
      var ourResult = this.state.result
      console.log("CHECKING" ,selCapacity,checkCategory,checkCountry)
      var costArray = [] 
      console.log("RESULT IS ", ourResult)
      for(var i=0;i<ourResult.length;i++){
        if(ourResult[i].origin === checkCountry && ourResult[i].category === checkCategory  &&  ourResult[i].capacity == selCapacity){
          console.log("OUR RESS",ourResult[i])
          costArray.push(ourResult[i].cost)
        console.log("SELECTED COST ",ourResult[i].cost)
        }       
     }  
     console.log("SELECTED COST ",costArray) 
     this.setState({
      costArray:  costArray,
       capacity: selCapacity,        
     })
    }
    setCost = (e) =>{
      const selCost = e.target.value.trim();
      this.setState({        
        cost:e.target.value.trim(),        
       })
    }
                
            
                  //DISPLAYING VARIOUS PAY OPTIONS FORM
          paytOption = (e) => {  
            var paymentOption = e.target.value.trim();
            if(paymentOption === 'cashLoan'){
               this.setState({ kimera: !this.state.kimera })
               this.setState({ showing: false })
               //console.log("SELECTED OPTION ", paymentOption)
            }
            else if(paymentOption === 'instal'){
              this.setState({ showing: !this.state.showing })
              this.setState({ kimera: false })
               //console.log("SELECTED OPTION ", paymentOption)
            }
            else if(paymentOption === 'cash'){
              this.setState({ kimera: false })
              this.setState({ showing: false })
            }
          }    

          //UPDATEING FORM ON CHANGE
          componentDidUpdate(prevProps, prevState) {
            const payment = this.state.monthlyPayt
             const payPeriod = this.state.paytPrd
            //  console.log("PAYMENT FROM COMPONENT FXN ",payment)
            //  console.log("PERIOD FROM COMPONENT FXN ",payPeriod)
           
           }


          //LOAN OPTION PROCESSING          
          loanOption = (e) =>{
            let targetVal = e.target.name.trim();
            let downPayment = this.state.downPayt
            let totalPayts = this.state.paytPrd
            var myCost = this.state.cost
            console.log("THE COST IS ",myCost)  
            if (targetVal == 'downPayt'){
              downPayment = e.target.value.trim();
              var loanAmount = myCost - downPayment
              this.setState({
                loan:loanAmount,
                downPayt:downPayment
              },() =>
              console.log("THIS IS THE LOAN AMOUNT ", this.state.loan)               
              )
              
            }
            //END OF DOWN PAYMENT ADJUSTEMENT
            else if (targetVal == 'paytPrd'){
              totalPayts = e.target.value.trim();
              downPayment = this.state.downPayt
              loanAmount = this.state.loan
              this.setState({
                paytPrd:totalPayts
              })    
            }  
             console.log("THIS IS THE DOWN PAYMENT ", downPayment)
            console.log("THIS IS MY COST ", myCost)
              console.log("THIS IS THE LOAN AMOUNT ", loanAmount)
              console.log("THIS IS THE PAYMENT PRD ", totalPayts)
              var amount = loanAmount
            var r = 0.005   //6% ANNUAL INTEREST DIVIDE BY 12
            var r1 = 1 + r
            var r1Factor = Math.pow(r1,totalPayts)
            var upFactor = r1Factor - 1
            var lowFactor = r1Factor * r
            var paytx = amount * lowFactor/upFactor
            var payt = parseFloat(paytx).toFixed(2);            
            var beginningBalance = amount
            let cumulativeInterestx = 0
            var amortize = [[]]
            var roundArray = []
            for (var k=1;k<totalPayts+1;k++){
                if(beginningBalance < payt){
                    payt = beginningBalance
                    console.log("FINAL PAYMENT ", payt)
                }
            var interestPaid = +((r * beginningBalance).toFixed(2))
            //var principalPayT = +((payt - interestPaid).toFixed(2))
            //var endingBalance = +((beginningBalance - principalPayT).toFixed(2))
            cumulativeInterestx += interestPaid
            var cumulativeInterest = parseFloat(cumulativeInterestx).toFixed(2);
             roundArray.push(amount,beginningBalance,interestPaid,cumulativeInterest,payt)
             console.log("LENGTH IS ", roundArray.length)
             console.log("THIS ROUND ", roundArray)
             amortize.push(...roundArray);
             console.log("TYPE IS ", typeof(roundArray))
             roundArray.length = 0
              }
              console.log("FINAL NESTED ARRAY ",amortize)
             //END OF SCHEDULE CALCULATION
            let myTotalCost = parseFloat(amount) + parseFloat(cumulativeInterest)
            this.setState({
              monthlyPayt: payt,
              totalInterest: cumulativeInterest,
              totalCost:myTotalCost, 
            }, () =>
            console.log("THIS IS THE PAYMENT ", this.state.monthlyPayt))
          }


          render() {
            const { showing, kimera } = this.state;
            let optionTemplate = this.state.ourCountries.map(v => (
              <option value={v}>{v}</option>
           ));
           let optionTemplate1 = this.state.capacityArray.map(v => (
            <option value={v}>{v}</option>
         ));
         let optionTemplate2 = this.state.costArray.map(v => (
          <option value={v}>{v}</option>
       ));
         
              return(                       
          <>          
           <div className = "w-100 bg-light">
           {/* <h1>Welcome to the test page</h1>  */}
           <Container>
        <Form style = {{fontSize:20}} className = "pt-5">           
  <Form.Group as={Row} className="mb-3" id = "equipment" >
    <Form.Label column sm="2">Equipment Category</Form.Label>
    <Col sm="3">
    <select className="browser-default custom-select mt-2 w-100 " size = 'lg'  name = "category" onChange={this.categoryChange}
    style = {{padding:5,fontSize:20}}>
          <option selected disabled>Choose your option</option>
          <option value="panel">Solar Panel</option>
          <option value="battery">Battery</option>
          <option value="inverters">Inverters</option>
          <option value="meters">Energy Meter</option>
          <option value="accessories">Accessories</option>
        </select>
    </Col>

    <Form.Label column sm="2">Country of origin</Form.Label>
    <Col sm="3">
    <select className="browser-default custom-select mt-2 w-100 " onChange={this.handleChange}
    style = {{padding:5,fontSize:20}}>
    <option selected disabled>Select Country</option>
      {optionTemplate}
    </select>
    </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3">
    <Form.Label column sm="2">Capacity</Form.Label>
    <Col sm="3">
      <select className="browser-default custom-select mt-2 w-100 " onChange={this.costChange}
    style = {{padding:5,fontSize:20}}>
    <option selected disabled>Select Capacity</option>
      {optionTemplate1}
    </select>
    </Col>
    <Form.Label column sm="2">Cost</Form.Label>
    <Col sm="3">
      <select className="browser-default custom-select mt-2 w-100 "  name = 'costSet' id="costSet"  onChange={this.setCost}
    style = {{padding:5,fontSize:20}}>
    <option selected disabled>Select Cost</option>
      {optionTemplate2}
    </select>
    </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3 bg-primary " style = {{width:'100%',display:'flex', alignItems:'center',justifyContent:'center'}}>
    {/* d-flex justify-content-center align-items-center */}
    <Form.Label className = 'text-align-center'>PAYMENT OPTIONS</Form.Label>
    </Form.Group>
<Form.Group as={Row} className="mb-3">
<Form.Label column sm = '2'>Select Mode</Form.Label>
<Col sm="3">
<select className="browser-default custom-select mt-2 w-100 " name = "paytOpt" onChange={this.paytOption}
    style = {{padding:5,fontSize:20}}>
  <option selected disabled>Select Payment Type</option>
  <option value="cash" >Cash</option>
  <option value="cashLoan">Cash and Loan</option>
  <option value="instal">Installments</option>
    </select>
</Col>
<Form.Label column sm = "2">Cost</Form.Label>
<Col sm="3">
<Form.Control type="text" placeholder="cost" name = "cost" value = {this.state.cost} readOnly/>
</Col>
</Form.Group>


{/*START OF LOAN PART */}
<div style={{ display: (kimera ? 'block' : 'none') }}>
<Form.Group as={Row} className="mb-3">
<Form.Label column sm = "2">Dowm Payment</Form.Label>
<Col sm="3">
<Form.Control type="text" placeholder="Initial Deposit" name = "downPayt" onChange = {this.loanOption} />

</Col>
<Form.Label column sm = "2">Loan Amount</Form.Label>
<Col sm="3">
<Form.Control type="text" placeholder="Borrowed Amount" name = "loan" value = {this.state.loan} readOnly/>
</Col>
</Form.Group>

<Form.Group as={Row} className="mb-3">
<Form.Label column sm = "2">Payment Period</Form.Label>
<Col sm="3">
<Form.Control type="text" placeholder="Payment Period in Months" name = "paytPrd" onChange = {this.loanOption} value = {this.state.paytPrd} />
{/* onChange = {this.loanOption} value = {this.state.paytPrd} */}
</Col>
<Form.Label column sm = "2">Interest Rate</Form.Label>
<Col sm="3">
<Form.Control type="text" placeholder="Interest On Loan" name = "intRate" readOnly value = {this.state.intRate} />
{/* value={loanOption.state.totalCost} */}
</Col>
</Form.Group>

<Form.Group as={Row} className="mb-3">
<Form.Label column sm = "2">Monthly Payment</Form.Label>
<Col sm="3">
<Form.Control type="text" placeholder="Monthly Payments" name = "monthlyPayt" readOnly  value = {this.state.monthlyPayt}/>
</Col>
<Form.Label column sm = "2">Total Interest Paid</Form.Label>
<Col sm="3">
<Form.Control type="text" placeholder="Total Interest" name = "totalInterest" readOnly  value = {this.state.totalInterest}/>
</Col>
</Form.Group>

<Form.Group as={Row} className="mb-3">
<Form.Label column sm = "2">Total Cost</Form.Label>
<Col sm="3">
<Form.Control type="text" placeholder="Total Cost" name = "totalCost" readOnly value = {this.state.totalCost}/>
</Col>
<Form.Label column sm = "2"></Form.Label>
<Col sm="3">
<Button className = "btn-secondary col-sm-12" >View Schedule Here</Button>
</Col>
</Form.Group>
</div>
{/* END OF LOAN PART */}
{/* <Form.Group>
<Button className = "btn-primary btn-lg col-sm-12" onClick={() => this.setState({ kimera: !kimera })}>Get System</Button>
</Form.Group> */}

{/* FOR INSTALLMENTS */}
<div style={{ display: (showing ? 'block' : 'none') }}>
<Form.Group as={Row} className="mb-3">
<Form.Label column sm = "2">First Installment</Form.Label>
<Col sm="2">
<Form.Control type="text" placeholder="Deposit" name = "loan" readOnly/>
</Col>
<Form.Label column sm = "2">Monthly Installments</Form.Label>
<Col sm="2">
<Form.Control type="text" placeholder="instalments" name = "instalments" readOnly/>
</Col>
<Col sm="2">
<Button className = "btn-secondary col-sm-12" onClick={() => this.makeTable}>View Schedule</Button>
</Col>
</Form.Group>
</div>


<Form.Group as={Row} className="mb-3">
<Button className = "btn-primary btn-lg col-sm-12" >Get System</Button>
{/* onClick={() => this.setState({ showing: !showing })} */}
</Form.Group>


    </Form>

{/* START OF SCHEDULE FORM */}
    {/* <Form>  
<div>
            <h1 id='title'>Loan Payments</h1>
            <table id='loanSchedule'>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
    </Form> */}

    {/* END OF SCHEDULE FORM */}
    </Container>
           
           </div>
        </>
                      )
                  }
}
export default Selfhelp;