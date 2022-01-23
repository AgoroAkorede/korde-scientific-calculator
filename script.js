
// -----------CALCULATOR SELECTOR--------------

const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelectorAll('[data-equals]')
const previousOperandTextElement  = document.querySelector('[data-previous]')
const currentOperandTextElement = document.querySelector('[data-current]')
const percentageButton = document.querySelector('[data-percentage]')
const clearAllButton = document.querySelector('[data-clearAll]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const inverseButton = document.querySelector('[data-inverse]')
const squareButton = document.querySelector('[data-square]')
const squareRootButton = document.querySelector('[data-squareRoot]')
const bracketButton = document.querySelector('[data-bracket]')
const btnCube = document.querySelector('[data-cube]')
const btnPi = document.querySelector('[data-pi]')
const btnExponential = document.querySelector('[data-exponential]')
const btnModulus = document.querySelector('[data-modulus]')
const btnLogarithm = document.querySelector('[data-logarithm]')
const btnCos = document.querySelector('[data-cos]')
const btnSin = document.querySelector('[data-sin]')
const btnTan = document.querySelector('[data-tan]')
const btnFactorial = document.querySelector('[data-factorial]')
const btnBracketOpen = document.querySelector('[data-bracket-open]')
const btnBracketClose = document.querySelector('[data-bracket-close]')
const signButton = document.querySelector('[data-sign]');

// --------------OTHER SELECTOR----------------
// const calculatorBody = document.querySelectorAll('.calculator_keys')
const others = document.getElementById('others')
const standardBtn = document.getElementById('standard-button')
const scientificBtn = document.getElementById('scientific-button')

// --------------History Operations----------------
const historyContainer = document.getElementById('history');

let history = ''
const addToHistory = function (value) {
  const historyArr = [];
  history += `${value + "<br/>"}`;
  let historyAnswerValue = history;
  historyArr.push(historyAnswerValue)
 for (let i = 0; i < historyArr.length; i++){
    const markup =  `
  <h1 id="history" class="history">History
      <div class="active">  </div>
</h1>
  <div id="history_content" class="history_content">  ${historyAnswerValue ? historyAnswerValue : history}  <br></br> </div> 

  <img src="delete.png" alt="deleteImg" class="deleteImg" id="deleteImg">
`
  historyContainer.innerHTML = "";

  historyContainer.insertAdjacentHTML("afterbegin", markup);
  }
  const deleteImg = document.getElementById('deleteImg')
    deleteImg.addEventListener('click', () => {
      history=''
      const markup =  `
    <h1 id="history" class="history">History
        <div class="active">  </div>

    <div id="history_content" class="history_content"> </div>

    <img src="delete.png" alt="deleteImg" class="deleteImg" id="deleteImg">
  `
        
    historyContainer.innerHTML = " ";
    historyContainer.insertAdjacentHTML("afterbegin", markup);
      
    })
 
  // const historyContent = document.getElementById('history_content')
  // if (historyContent == " ") {
    
  //  };

}
class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
  }
  
  // ----------General Operations-----------
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
      this.opreration = undefined

  }
  clearAll() {
    this.currentOperand = ''
    this.previousOperand = ''
  this.opreration = undefined
  addToHistory('')
}
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if(number==='.'&&this.currentOperand.includes('.'))return
      this.currentOperand=this.currentOperand.toString()+ number.toString() 
    }
    chooseOperation(operation) {
        if (this.currentOperand === '')
            return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
      this.currentOperand = ''
      // addToHistory(opreration)
     
  }
  // ----------Standard part-----------
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current

            addToHistory(`${prev} + ${current} =  ${computation}`)
            break
          case '-':
            computation = prev - current
            addToHistory(`${prev} - ${current} =  ${computation}`)
      
            break
          case 'X':
            computation = prev * current
            addToHistory(`${prev} × ${current} =  ${computation}`)
            break
          case '/':
            computation = prev / current
            addToHistory(`${prev} ÷ ${current} =  ${computation}`)
            break 
          default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
      this.previousOperand = ''
    
  }
    
    getDisplayNumber(number) {
        const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
      }
  }
  BracketClose() {
    this.currentOperand = '('

  }
  signChange() {
    this.currentOperand = -this.currentOperand
}
    
    deleteOne() {
        this.currentOperand=this.currentOperand.toString().slice(0, -1)
  }
  percent() {
    this.currentOperand = this.currentOperand / 100
    // addToHistory(`${this.previousOperand} % = ${this.currentOperand}`)
  }
  square() {
    this.currentOperand=this.currentOperand*this.currentOperand
  }
  root() {
    this.currentOperand= (Math.sqrt(this.currentOperand))
  }
  inverse() {
    this.currentOperand=1/this.currentOperand
  }

  //----------- Scientific part ------------


  cube() {
    this.currentOperand=this.currentOperand*this.currentOperand*this.currentOperand
  }
  pi() {
    this.previousOperand=Math.PI
    this.currentOperand=this.previousOperand*this.currentOperand
  }
  modulus() {
    this.currentOperand= (Math.sign(this.currentOperand))*this.currentOperand
  }
  logarithm() {
    this.currentOperand=(Math.LOG10E*(this.currentOperand))
  }
  exponent() {
    this.currentOperand=(Math.E*(this.currentOperand))
  }
 
  sin() {
    this.currentOperand=(Math.sin(this.currentOperand*Math.PI/180))
  }

  cos() {
    this.currentOperand=(Math.cos(this.currentOperand*Math.PI/180))
  }
  tan() {
    this.currentOperand=(Math.tan(this.currentOperand*Math.PI/180))
  }
  factorize() {
   this.currentOperand= fractionalize(this.currentOperand)
   
  } 
  
  displayOne() { this.currentOperand === '1' }
}

function fractionalize(num) {
  if (num === 0 || num === 1) return 1;
  for (let i = num - 1; i >= 1; i--){
    num*=i
  }
  return num
}



// scientific .scientific = false
// standard .stcientific = true

scientificBtn.addEventListener('click', () => {
  const scientificBtns = [ inverseButton, squareButton, squareRootButton, btnCube, btnPi, btnExponential, btnFactorial, btnPi, btnModulus, btnLogarithm,btnSin,btnTan,btnCos
    
  ]
  scientificBtns.forEach(button => {
    button.classList.remove('scientific')
  })
  const calculatorBody = document.querySelector('.calculator_keys')
  calculatorBody.style. gridTemplateColumns = "repeat(5, minmax(3.5rem,7rem))";
  calculatorBody.style. gridTemplateRows = 'repeat(6, minmax(3.5rem,7rem))';
})
standardBtn.addEventListener('click', () => {
  const scientificBtns = [ inverseButton, squareButton, squareRootButton, btnCube, btnPi, btnExponential, btnFactorial, btnPi, btnModulus, btnLogarithm,
    btnSin,btnTan,btnCos
  ]
  scientificBtns.forEach(button => {
    button.classList.add('scientific')
  })
  const calculatorBody = document.querySelector('.calculator_keys')
  calculatorBody.style. gridTemplateColumns = "repeat(4, minmax(3.5rem,7rem))";
  calculatorBody.style. gridTemplateRows = 'repeat(4, minmax(3.5rem,7rem))';
    
})

// --------------Calculator Operations-------------
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()  
    })
});
signButton.addEventListener('click', () => {
 calculator.signChange()
  calculator.updateDisplay()
});


operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()   
    })
});
btnBracketClose.addEventListener('click',()=> {
  calculator.appendNumber('(');
  calculator.updateDisplay();
})

equalsButton.forEach(button => {
    button.addEventListener('click', () => {
      calculator.compute();
      calculator.updateDisplay() 
      setTimeout(() => {
        const randomColor=Math.floor(Math.random()*16777215).toString(16)
    
      document.getElementById('btn-equals').style.backgroundColor ="#"+randomColor
      
    }, 200);
    }) 
});

clearAllButton.addEventListener('click', button => {
    calculator.clearAll()
    calculator.updateDisplay()
})
clearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.deleteOne()
  calculator.updateDisplay()
  setTimeout(() => {
    const randomColor=Math.floor(Math.random()*16777215).toString(16)

  document.getElementById('delete-btn').style.backgroundColor ="#"+randomColor
  
}, 200);
})

    percentageButton.addEventListener('click', () => {
      calculator.percent()
      calculator.updateDisplay()   
      
    })

    squareButton.addEventListener('click', () => {
      calculator.square()
      calculator.updateDisplay()   
    })
    inverseButton.addEventListener('click', () => {
      calculator.inverse()
      calculator.updateDisplay()   
    })
    squareRootButton.addEventListener('click', () => {
    calculator.root()
      calculator.updateDisplay()   
      })

    btnCube.addEventListener('click', () => {
      calculator.cube()
      calculator.updateDisplay()  
    })
    btnPi.addEventListener('click', () => {
      calculator.pi()
      calculator.updateDisplay()   
    })
    btnModulus.addEventListener('click', () => {
      calculator.modulus()
      calculator.updateDisplay()   
    })
    btnLogarithm.addEventListener('click', () => {
      calculator.logarithm()
      calculator.updateDisplay()   
    })
    btnExponential.addEventListener('click', () => {
      calculator.exponent()
      calculator.updateDisplay()   
    })
    btnSin.addEventListener('click', () => {
      calculator.sin()
      calculator.updateDisplay()   
    })
    btnCos.addEventListener('click', () => {
      calculator.cos()
      calculator.updateDisplay()   
    })
    btnTan.addEventListener('click', () => {
      calculator.sin()
      calculator.updateDisplay()   
    })
    btnFactorial.addEventListener('click', () => {
      calculator.factorize()
      calculator.updateDisplay()   
    })


others.addEventListener('click', () => { 
 
})
// -----------KeyBoard functions---------------

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    calculator.compute();
      calculator.updateDisplay() 
      setTimeout(() => {
        const randomColor=Math.floor(Math.random()*16777215).toString(16)
    
      document.getElementById('btn-equals').style.backgroundColor ="#"+randomColor
      
    }, 200);
  }
  event.preventDefault()
})

const appendnumberToKeypress = function (event, keyCode, number = null) {
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === keyCode) {
      calculator.appendNumber(number)
      calculator.updateDisplay() 
   } event.preventDefault()
  })
}

appendnumberToKeypress(event, 48, 0)
appendnumberToKeypress(event, 57, 9)
appendnumberToKeypress(event, 49, 1)
appendnumberToKeypress(event, 50, 2)
appendnumberToKeypress(event, 51, 3)
appendnumberToKeypress(event, 52, 4)
// appendnumberToKeypress(event, 53, 5)
appendnumberToKeypress(event, 54, 6)
appendnumberToKeypress(event, 55, 7)
// appendnumberToKeypress(event, 56, 8)


// ---------- Non Number Keys--------------
const deleteKeyPress = function (event, keyCode, number = null) {
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === keyCode) {
      calculator.deleteOne()
      calculator.updateDisplay() 
   } event.preventDefault()
  })
}
deleteKeyPress(event, 8)
deleteKeyPress(event, 27)


const chooseOpertionKeypress = function (event, keyCode, operation = null) {
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === keyCode) {
      calculator.chooseOperation(operation)
      calculator.updateDisplay() 
   } event.preventDefault()
  })
}
chooseOpertionKeypress(event, 187, '+')
chooseOpertionKeypress(event, 189, '-')
chooseOpertionKeypress(event, 191, '/')

document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 53:
    if (event.shiftKey) {
      calculator.percent()
  }
    else {
      calculator.appendNumber(5)
  }
  break;
} event.preventDefault()
calculator.updateDisplay() 
})


document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 56:
    if (event.shiftKey) {
      calculator.chooseOperation('X')
  }
    else {
      calculator.appendNumber(8)
  }
  break;
} event.preventDefault()
calculator.updateDisplay() 
})

