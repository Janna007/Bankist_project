'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
let currentaccount;

/////////////////////////////////////////////////

//display movements
const displaymovements=function(movements,sort=false){

  containerMovements.innerHTML='';
    const move=sort?movements.slice().sort((a,b)=>a-b):movements;

move.forEach(function(mov,i){

  const type=mov >0 ? 'deposit':'withdrawal';
  const html=`<div class="movements__row">
  <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
  
  <div class="movements__value">${mov}</div>
</div>`;
containerMovements.insertAdjacentHTML('afterbegin',html)
})
  

}
//displaymovements(account1.movements)

//create username

const createUsername=function(acco){
  acco.forEach(function(acc){
    acc.username=acc.owner
    .toLowerCase().split(' ').map(function(name){
       return name[0]
    }).join('')
  })
   
}
createUsername(accounts)
//console.log(accounts);

//display balance

const calcbalance=function(acc){
  acc. balance=acc.movements.reduce((acc,val)=>
    acc+val,0)
    
    labelBalance.textContent=`${acc.balance } ₹`
  
  
}
//calcbalance(account1)

//display summary

const calcDisplaysummary=function(movement){
  //income display
  const income=movement.filter(function(moves){
    return moves>0
  }).reduce(function(acc,move){
     return acc+move;
  },0)
  labelSumIn.textContent=`${income} ₹`
//outcome display

const outcome=movement.filter(function(move){
  return move<0
}).reduce(function(acc,moves){
   return acc+moves
},0)

labelSumOut.textContent=`${Math.abs(outcome)} ₹`


//display interest(assume 1.2%)
const interest=movement.filter(function(move){
  return move>0
}).map(function(move){
    return move*1.2/100;

}).filter(function(int){
     return int>=1 
}).reduce(function(acc,int){
     return acc+int
},0)
labelSumInterest.textContent=`${interest} ₹`

}
//calcDisplaysummary(account1.movements)


//implement login
btnLogin.addEventListener('click',function(e){
  e.preventDefault()

  currentaccount= accounts.find(function(acc){
   return  acc.username===inputLoginUsername.value
  })
  if(currentaccount?.pin===Number(inputLoginPin.value))
      //display welcome messeg
      labelWelcome.textContent=`Welcome back  ${currentaccount.owner.split(' ')[0]}`
      containerApp.style. opacity=100;

      //to clear inputfield
      inputLoginUsername.value=inputLoginPin.value=' ';
      inputLoginPin.blur()

      //display movements
      displaymovements(currentaccount.movements)

      //display balance
      calcbalance(currentaccount)
      //display summary

      calcDisplaysummary(currentaccount.movements)
})

//implement transfer

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
const amount=Number( inputTransferAmount.value)
const recieveracc=accounts.find(function(acc){
    return acc.username===inputTransferTo.value;
})
//console.log(amount,recieveracc,currentaccount)

if(amount>0 && recieveracc&& currentaccount.balance>=amount&&   recieveracc?.username!==currentaccount.username){
currentaccount.movements.push(-amount)
recieveracc.movements.push(amount)
 //display movements
 displaymovements(currentaccount.movements)

 //display balance
 calcbalance(currentaccount)
 //display summary

 calcDisplaysummary(currentaccount.movements)

}

})
//console.log(account1)

//CLOSE ACCOUNT    using findindex method

btnClose.addEventListener('click',function(e){
      e.preventDefault();
      console.log('hello')
})
     /* if(inputCloseUsername.value===currentaccount.username && inputClosePin.value===currentaccount.pin ){
        const index=accounts.findIndex(function(acc){
          return acc.username===currentaccount.username
         // console.log(index)
         
         
         // / accounts.splice(index,1)
          //containerApp.style.opacity=0;
            //console.log(accounts)
          
        })
        accounts.splice(index,1)
        containerApp.style.opacity=0;
         console.log(accounts)
        
      }
})*/

//REQUEST A LOAN  using some method 

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount=Number(inputLoanAmount.value)
  if(amount>0&&currentaccount.movements.some(function(mov){
    return mov>=amount*0.1
  }))
  currentaccount.movements.push(amount)
   //display movements
 displaymovements(currentaccount.movements)

 //display balance
 calcbalance(currentaccount)
 //display summary

 calcDisplaysummary(currentaccount.movements)

})

//SORT BUTTON using sort method

let sorted=false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displaymovements(currentaccount.movements,!sorted)

  sorted=!sorted
})





