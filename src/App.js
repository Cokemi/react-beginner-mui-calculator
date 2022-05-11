import './App.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {

  const [currentNumber, setCurrentNumber] = React.useState("0");
  const [firstNumber, setFirstNumber] = React.useState("");
  const [savedSign, setSavedSign] = React.useState("");
  const [result, setResult] = React.useState("");

  function enterNumber(number){
    if (currentNumber === "0" && number === "."){
      setCurrentNumber("0" + number);
    }else if (currentNumber === "0"){
      setCurrentNumber("" + number);
    }else if (number === "." && currentNumber.includes(".")){
      //Nothing
    }else{
      setCurrentNumber(currentNumber + number);
    }
  }

  function clear(){
    setCurrentNumber("0");
    setFirstNumber("");
    setSavedSign("");
    setResult("");

  }

  const NumberButton = ({ theNumber }) => (
    <Grid item xs={3}>
      <Item onClick={ () => enterNumber(theNumber.toString() )} style={{ backgroundColor: "beige"}}>
        {theNumber}
      </Item>
    </Grid>
  );

  const ArithmeticButton = ( { sign } ) => (
    <Grid item xs={3}>
      <Item onClick={() => doArithmetic(sign)}>{sign}</Item>
    </Grid>
  )

  function doArithmetic(sign) {
    if (savedSign === ""){
      //Save current number
      setFirstNumber(currentNumber);
      //Save the sign
      setSavedSign(sign);
      //Clear the number
      setCurrentNumber("0");
    }
  }

  function doCalculation(){
    if (firstNumber !== ""){
      let number1 = parseInt(firstNumber,10); 
      let number2 = parseInt(currentNumber,10);
      if (savedSign === "+"){
        setCurrentNumber( number1 + number2);
        setResult(number1 + number2);
      }else if (savedSign === "-"){
        setCurrentNumber( number1 - number2);
        setResult(number1 - number2);
      }else if (savedSign === "*"){
        setCurrentNumber( number1 * number2);
        setResult(number1 * number2);
      }else if (savedSign === "/"){
        setCurrentNumber( number1 / number2);
        setResult(number1 / number2);
      }
    }
  }

  return (
    <>
    <div style={{ width: "200px", height:"400px"}}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Item>{currentNumber}</Item>
        </Grid>
        <Grid item xs={12}>
          <Item onClick={() => clear()}>Clear</Item>
        </Grid>
        <NumberButton theNumber={7} />
        <NumberButton theNumber={8} />
        <NumberButton theNumber={9} />
        <ArithmeticButton sign={"/"}/>
        <NumberButton theNumber={4} />
        <NumberButton theNumber={5} />
        <NumberButton theNumber={6} />
        <ArithmeticButton sign={"-"}/>
        <NumberButton theNumber={1} />
        <NumberButton theNumber={2} />
        <NumberButton theNumber={3} />
        <ArithmeticButton sign={"+"}/>
        <NumberButton theNumber={0} />
        <NumberButton theNumber={"."} />
        <Grid item xs={3}>
          <Item onClick={() => doCalculation()}>=</Item>
        </Grid>
        <ArithmeticButton sign={"*"}/>
      </Grid>
    </div>
    <div style={{ width: "200px"}}>
      <Item>currentNumber: {currentNumber}</Item>
      <Item>savedSign: {savedSign}</Item>
      <Item>firstNumber: {firstNumber}</Item>
      <Item>=</Item>
      <Item>result: {result}</Item>
    </div>
    </>
  );
}

export default App;
