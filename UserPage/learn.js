// array of objects 
const Cars = [
{
    name : 'bmw',
    model : 2022,
    address : {
        country : 'Morocco',
        city : 'tiflet'
    },
    serie : ['M5', 'X6', 'M2'],
    isCar : true
},
{
    name : 'audi',
    age : 2025,
    address : {
        country : 'Morocco',
        city : 'tiflet'
    },
    serie : ['Rs6', 'Q8', 'Xdrive'],
    isCar : true
},
{
    name : 'pikala',
    isCar : false,
    unique : 'Biycle'
}
]

// convert javascript into JSON

const jsonScript = JSON.stringify(Cars);
console.log(jsonScript);

// loop objects
for (let todo of Cars)
{
    console.log(Cars.name);
}

//High Order Array Methods
// --> forEach
Cars.forEach(function (gy)
{
    console.log (gy.name);
});
// --> map
const todoText = Cars.map(function(todo) {
    return todo.unique;
});
console.log(todoText);
// --> filter
const isCar = Cars.filter(function(todo) {
    return todo.isCar === true;
});
console.log(isCar);

// conditions 
const val = 10;
if (val === 10)
    console.log("is 10 with same data type")


const justTesting = (num1 = 2, num2 = 5) => {
    num1 + num2;
}
console.log(justTesting());

// constructor function 
function Person(firstName, lastName, BirthDay) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.BirthDay = BirthDay;
    this.getFullName = () => {
        return (this.firstName + " " + this.lastName);
    }
}
Person.prototype.BirthDayDay
const person1 = new Person('amine', 'hmida', 2003);
const person2 = new Person('simo', 'kbila', 2000);
console.log(person1.getFullName());

// class

class Person 
{
    constructor(firstName, lastName, BirthDay)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.BirthDay = BirthDay;
    }
    getbestDay()
    {
        return this.BirthDay;
    }
}