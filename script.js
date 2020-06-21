'use strict'; 

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isEmpty(s) {
    if (s === '') {
        return false;}
    else {
        return true;
    }
}

let budgetDay;


const appData = {
    income: {},
    money: 100000,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 3,
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    budgetMonth: 0,
    budgetDay: 0,
    targetMonth: 0,
    asking: function() {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            do {  
                itemIncome = prompt('Какой есть дополнительный заработок?', 'Разработка сайтов');
            } while (!isEmpty(itemIncome));

            let cashIncome;
            do {  
                cashIncome = prompt('Сколько зарабатываете дополнительно?', 30000);
            } while (!isNumber(cashIncome));
            this.income[itemIncome] = cashIncome;
        }
        
        do {
            this.money = +prompt('Ваш месячный доход?', 100000);
        } while (!isNumber(appData.money));

        let addExpenses = prompt('Перечислите возможные расходы:', 'sex,drugs,rocknroll');
        this.addExpenses = addExpenses.toLowerCase().split(',');

        this.deposit = confirm('А депозит есть?');

        for (let i = 0; i < 2; i++) {

            let exptext; 
            do {  
                exptext = prompt('Введи обязательную статью расхода:'); 
            } while (!isEmpty(exptext));    
            
            do {  
                this.expenses[exptext] = prompt('Во сколько это обойдется?');
            } while (!isNumber(appData.expenses[exptext]));

        }    
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
        this.budgetMonth = Number(appData.money) - Number(appData.getExpensesMonth());
        this.budgetDay = Math.floor(this.budgetMonth/30);
    },
    getTargetMonth: function () {
        this.targetMonth = Number(Math.ceil(this.mission / this.budgetMonth));
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
        if (this.deposit) {
            do {  
                this.percentDeposit = prompt('Какой годовой процент депозита?', 7);
            } while (!isNumber(this.percentDeposit));

            do {  
                this.moneyDeposit = prompt('Сколько денег в депозите?', 300000);
            } while (!isNumber(this.moneyDeposit));
            
        }        
    },
    calcSavedMoney: function() {
        return this.budgetMonth * this.period;
    }
}

appData.asking();
appData.getExpensesMonth();
appData.getBudgetMonth();
appData.getTargetMonth();
appData.getInfoDeposit();
console.log(appData);

console.log('Бюджет на день: ', appData.budgetDay);

if (appData.targetMonth > 0) {
    console.log('Твоя цель будет достигнута за: ' + appData.targetMonth + ' месяцев');
} else if (appData.targetMonth <= 0){
    console.log('Никаких тебе достижений');
}

appData.getStatusIncome();



let array = appData.addExpenses,
    newarray = [],
    item;

for (let i = 0; i < array.length; i++) {
    item = array[i];
    newarray[i] = item[0].toUpperCase() + item.slice(1);    
}

console.log(newarray.join(', '));