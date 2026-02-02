import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  displayValue = '0';
  currentOperator: string | null = null;
  firstOperand: number | null = null;
  waitingForSecondOperand = false;

  digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  operators = ['+', '-', '*', '/'];

  onDigitClick(digit: string) {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
    }
  }
  
  onOperatorClick(operator: string) {
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.displayValue);
    } else if (this.currentOperator) {
      this.calculate();
    }
  
    this.currentOperator = operator;
    this.waitingForSecondOperand = true;
  }
  
  onEqual() {
    this.calculate();
    this.currentOperator = null;
  }
  
  calculate() {
    const secondOperand = parseFloat(this.displayValue);
  
    if (this.currentOperator && this.firstOperand !== null) {
      switch (this.currentOperator) {
        case '+':
          this.firstOperand += secondOperand;
          break;
        case '-':
          this.firstOperand -= secondOperand;
          break;
        case '*':
          this.firstOperand *= secondOperand;
          break;
        case '/':
          this.firstOperand /= secondOperand;
          break;
      }
  
      this.displayValue = String(this.firstOperand);
      this.waitingForSecondOperand = true;
    }
  }
  
  onClear() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.currentOperator = null;
    this.waitingForSecondOperand = false;
  }

}
