import React , { useState }from 'react';
import './App.css';
import Button from './components/Button';
import Monitor from './components/Monitor';

const App = () => {
  const buttonTexts = [
    {value: '6', type: 'number'}, 
    {value: '7', type: 'number'}, 
    {value: '8', type: 'number'}, 
    {value: '9', type: 'number'}, 
    {value: '5', type: 'number'}, 
    {value: '4', type: 'number'}, 
    {value: '3', type: 'number'}, 
    {value: '2', type: 'number'}, 
    {value: '1', type: 'number'}, 
    {value: '0', type: 'number'}, 
    {value: '.', type: 'decimal'},
    {value: 'AC', type: 'delete'}, 
    {value: '+', type: 'operator'}, 
    {value: '-', type: 'operator'}, 
    {value: '*', type: 'operator'}, 
    {value: '/', type: 'operator'}, 
    {value: 'Enter', type: 'enter'}, 
  ]

  const [monitorText, setMonitorText] = useState('');
  const [number1, setNumber1] = useState(0);
  const [operator, setOperator] = useState('');
  const [decimalCount, setDecimalCount] = useState(0);
  const [enterCount, setEnterCount] = useState(0);
  const [currentNumber, setCurrentNumber] = useState('0');

  const fnCurrentNumber = value =>{
    let newNumber;
    if(currentNumber !== '0'){
      newNumber = currentNumber + value.toString();
      if(enterCount !== 0){setEnterCount(0)}
    }else{newNumber=value.toString()}

    setCurrentNumber(newNumber);
    setMonitorText(newNumber);
  };
  const fnDecimal = value => {
    if(decimalCount === 0){
      let newNumber;
      setDecimalCount(1);

      enterCount !== 0 ? newNumber = '0' + value.toString()
      :newNumber = currentNumber + value.toString()

      setCurrentNumber(newNumber);
      setMonitorText(newNumber);
      console.log(newNumber)
    }
  };
  const fnOpertor = value => {
    setNumber1(currentNumber);
    setOperator(value);
    setCurrentNumber('0');
    setDecimalCount(0);
    setMonitorText(value);
  };
  const fnCalculation = () => {
    if(operator !== ''){
      let number2 = parseFloat(currentNumber);
      let total=0;
      switch(operator){
        case "+": total = parseFloat(number1) + parseFloat(number2);break;
        case "-": total = number1 - number2;break;
        case "*": total = number1 * number2;break;
        case "/": if(number2 !== 0){total = number1 / number2;}
                  else{window.alert()("The number can not be devided by 0");} break;
        default: break;
      }
      setCurrentNumber(total);
      setNumber1(total);
      setOperator('');
      setDecimalCount(0);
      setEnterCount(1);
      setMonitorText(total);
    }
  }
  const fnDelete = () => {
    setMonitorText('0');
    setCurrentNumber('0');
    setOperator('');
    setDecimalCount(0);
    setEnterCount(0);
  };

  const onClickTask = (type,value) => {
    switch(type){
      case 'number': fnCurrentNumber(value);break;
      case 'decimal': fnDecimal(value);break;
      case 'operator': fnOpertor(value);break;
      case 'enter': fnCalculation();break;
      case 'delete': fnDelete();break;
      default: break;
    }
    
  }

const renderButtons = buttonTexts.map((obj,index) => <Button key = {index} value={obj.value} type = {obj.type} onClickTask={onClickTask}/>);

  return(
      <div className = "calculator">
        <Monitor display = {monitorText}/>
        <div>{renderButtons}</div>
      </div>
  );
}

export default App;
