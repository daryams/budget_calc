'use strict'; 

const calcButton = document.getElementById('start'),
      incomeAdd = document.querySelector('.income_add'),
      expensesAdd = document.querySelector('.expenses_add');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

const salaryAmount = document.querySelector('.salary-amount'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      expensesAmounts = document.querySelectorAll('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositCheck = document.getElementById('deposit-check'),
      targetAmount = document.querySelector('.target-amount');

const budgetMonth = document.querySelector('.budget_month-value'),
      budgetDay = document.querySelector('.budget_day-value'),
      expensesMonth = document.querySelector('.expenses_month-value'),
      additionalIncomeResult = document.querySelector('.additional_income-value'),
      additionalExpensesResult = document.querySelector('.additional_expenses-value'),
      incomePeriod = document.querySelector('.income_period-value'),
      targetMonth = document.querySelector('.target_month-value'),
      periodMonths = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount');

const typeText = document.querySelectorAll('input[type="text"]');


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function onlyRussian(s) {
    return s.replace(/[^?!,.а-яёЁ\s\-]+$/,'');
}



function isEmpty(s) {
    if (s === '') {
        return false;}
    else {
        return true;
    }
}

const appData = {
    budget: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 0,
    period: 0,
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    budgetMonth: 0,
    budgetDay: 0,
    targetMonth: 0,

    start: function() {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();     
        appData.getAddExpenses();
        appData.getBudgetMonth();
        appData.getAddIncome();   
        appData.getTargetMonth();
        appData.getInfoDeposit();

        appData.showResult();
        
        
    },
    addExpensesBlock: function() {
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.childNodes[1].value = '';
        cloneExpensesItem.childNodes[3].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.childNodes[1].value = '';
        cloneIncomeItem.childNodes[3].value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let amountExpenses = item.querySelector('.expenses-amount').value;
            if ( itemExpenses !== '' && amountExpenses !== '') {
                appData.expenses[itemExpenses] = amountExpenses;
            }
        })
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let amountIncome = item.querySelector('.income-amount').value;
            if ( itemIncome !== '' && amountIncome !== '') {
                appData.income[itemIncome] = +amountIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
        
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item != '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (item.value != '') {
                appData.addIncome.push(itemValue);
            }
        })
    },

    showResult: function() {
        budgetMonth.value = appData.budgetMonth;
        budgetDay.value = appData.budgetDay;
        expensesMonth.value = appData.expensesMonth;
        additionalExpensesResult.value = appData.addExpenses.join(', ');
        additionalIncomeResult.value = appData.addIncome.join(', ');
        targetMonth.value = appData.targetMonth;
        incomePeriod.value = appData.calcSavedMoney();
    },
    asking: function() {

        

        // if (confirm('Есть ли у вас дополнительный источник заработка?')) {
        //     let itemIncome;
        //     do {  
        //         // itemIncome = prompt('Какой есть дополнительный заработок?', 'Разработка сайтов');
        //     } while (!isEmpty(itemIncome));

        //     let cashIncome;
        //     do {  
        //         // cashIncome = prompt('Сколько зарабатываете дополнительно?', 30000);
        //     } while (!isNumber(cashIncome));
        //     this.income[itemIncome] = cashIncome;
        // }
        
        // do {
        //     this.money = +salaryAmount.value;
        // } while (!isNumber(this.money));

        // // let addExpenses = prompt('Перечислите возможные расходы:', 'sex,drugs,rocknroll');
        // this.addExpenses = addExpenses.toLowerCase().split(',');

        // // this.deposit = confirm('А депозит есть?');

 
    },
    
    getExpensesMonth: function () {
        let sum=0;
        for (let exp in appData.expenses) {
            sum += Number(appData.expenses[exp]);
        }        
        this.expensesMonth = sum;
        return sum;
    },  
    getBudgetMonth: function () {
        this.budgetMonth = Number(appData.budget) - Number(appData.getExpensesMonth()) + Number(appData.incomeMonth);
        this.budgetDay = Math.floor(this.budgetMonth/30);
    },
    getTargetMonth: function () {
        this.targetMonth = Number(Math.ceil(targetAmount.value / this.budgetMonth));
    },
    getStatusIncome: function () {
        let b = this.budgetDay;
        if (b > 1200 || b == 1200) {
            console.log('Слишком много денег!');
        } else if (b > 600 && b < 1200) {
            console.log('Средненько -_-');
        } else if ((b < 600 && b > 0) || b == 600) {
            console.log('Нищеброд ебаный!');
        } else if (b < 0 || b == 0) {
            console.log('Это пиздец');
        }    
    },
    getInfoDeposit: function() {
        this.deposit = depositCheck.value;

        console.log(depositCheck);

        // if (this.deposit) {
        //     do {  
        //         this.percentDeposit = prompt('Какой годовой процент депозита?', 7);
        //     } while (!isNumber(this.percentDeposit));

        //     do {  
        //         this.moneyDeposit = prompt('Сколько денег в депозите?', 300000);
        //     } while (!isNumber(this.moneyDeposit));            
        // }        
    },
    calcSavedMoney: function() {
        return this.budgetMonth * periodMonths.value;
    }
}


// console.log(appData);

// console.log('Бюджет на день: ', appData.budgetDay);

// if (appData.targetMonth > 0) {
//     console.log('Твоя цель будет достигнута за: ' + appData.targetMonth + ' месяцев');
// } else if (appData.targetMonth <= 0){
//     console.log('Никаких тебе достижений');
// }

// appData.getStatusIncome();



// let array = appData.addExpenses,
//     newarray = [],
//     item;

// for (let i = 0; i < array.length; i++) {
//     item = array[i];
//     newarray[i] = item[0].toUpperCase() + item.slice(1);    
// }

// console.log(newarray.join(', '));

calcButton.disabled = true;
salaryAmount.addEventListener( 'change', function() {
    if (salaryAmount.value !== '') {
        calcButton.disabled = false;
    }
})


calcButton.addEventListener( 'click', appData.start);
expensesAdd.addEventListener( 'click', appData.addExpensesBlock);
incomeAdd.addEventListener( 'click', appData.addIncomeBlock);


periodMonths.addEventListener( 'change', function () {
    periodAmount.textContent = periodMonths.value;
})


typeText.forEach(function (item) {
    if ( !isNumber(item.value) && item.placeholder == 'Сумма') {
        item.addEventListener( 'input', function() {
        
            alert('Вводите только цифры!');
            item.value = '';
        });    
    }

    if ( item.placeholder == 'Наименование') {
        item.addEventListener('input',()=> {
            item.value = onlyRussian(item.value);
        }); 
    }

});
    