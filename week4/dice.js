//------------------------Class--------------------------------------//
//object literal notation
const dice = {
    sides: 6,
    roll() {
        return Math.floor(this.sides * Math.random() + 1);
    }
}

//class declaration - more similar to tother class-based languages
//prefereable over constructor function (like below)
class Dice {
    constructor(sides=6) {
        //this.sides = sides;
        Object.defineProperty(this, 'sides', {
            get() {
                return `This dice has ${sides} sides`
            },
            set(value) {
                if(value > 0) {
                    sides = value;
                    return sides;
                }
                else {
                    throw new Error(`The number of sides must be positive`);
                }
            }
        });
    

        this.roll = function() {
            return Math.floor(this.sides * Math.random() + 1);
        }
    }

    //this is not carried over into any objects created (or instances of) using this class
    static description() {
        return 'A way of choosing random numbers'
    }
}

//constructor function (this is the object that will be returned)
//const Dice = function(sides=6) {
//    this.sides = sides; //sets the sides property of the object
//    this.roll = function() { //sets a method in object called roll
//        return Math.floor(this.sides * Math.random() + 1);
//    }
//}

const redDice = new Dice();

const blueDice = new Dice(20);

const greenDice = new redDice.constructor(10);



//---------------------Class Prototypes-----------------------------------------------//

class Turtle {
    constructor(name) { //this wil construct an instance of Turtle in an object
        this.name = name; //sets a property and value
    }

    sayHi() {
        return `Hi, dude, my name is ${this.name}`;
    }

    swim() {
        return `${this.name} paddles in the water.`
    }

    //an example of polymorphism (same method, different implementation)
    toString() {
        return `A turtle called ${this.name}`
    }
}

class NinjaTurtle extends Turtle {
    constructor(name, color) {
        this.name = name; //sets a property and value
        let _color = color;
        this.setColor = color => { 
            if (typeof color === 'string') {
                return _color = color;
            } else {
                throw new Error(`Color must be a string`);
            }
        }
        this.getColor = () => _color;
    }

    attack() {
        return 'Feel the power of my ${this.weapon}';
    }
}

const leo = new Turtle('Leonardo', 'Blue'); //constructs leo object
leo.weapon = 'hands';

Turtle.prototype;

Turtle.prototype.weapon = 'Hands';

Turtle.prototype.attack = function() {
    return `Feel the power of my ${this.weapon}!` //use the `` not '' when using ${}
}

const raph = new Turtle('Raphael', 'Red');

const don = new Turtle('Donatello', 'Purple');

//???This didn't work to overwrite all the other weapons values. Not sure why???
Turtle.prototype.weapon = 'Feet';

leo.weapon = 'Katana Blades';

raph.weapon = 'Sai';

don.weapon = 'Bo Staff';

//this DID create a new property for each instance of Turtle even after they were created. 
Turtle.prototype.food = 'Pizza';

//Add methods this way too
Turtle.prototype.eat = function() {
    return `Mm, this ${this.food} tastes great!`;
}

const mike = new Turtle('Michelangelo');
mike.weapon = 'Nunchuks';



//-------------Adding Methods to built-in Objects------------//
Number.prototype.isEven = function() {
    return this%2 === 0;
}

Number.prototype.isOdd = function() {
    return this%2 === 1;
}

Array.prototype.first = function() {
    return this[0];
}

Array.prototype.last = function() {
    return this[this.length -1];
}

const turtles = ['Leonardo', 'Donatello', 'Michaelangelo', 'Raphael' ];

Array.prototype.delete = function(i) {
    return this.splice(i, 1);
}

//trim() method to String.prototype for IE8 and below
String.prototype.trim = String.prototype.trim || function() {
    return this.replace(/^\s+|\s+$/,'');
}

//Subclass for a built-in class
class myArray extends Array {
    constructor(...args) {
        super(...args);
    }
    delete(i) {
        return this.splice(i,1);
    }
}

const list = new myArray(1,2,3);



//------------Property Attributes and Descriptors--------//
const me = {name: 'Marie'};
me.age = 21;

Object.defineProperty(me, 'eyeColor', {value: 'Blue', writable: false, enumerable: true});
//because the writable attribute was set to false, the eyeColor assignemnt can never be changed

me.retirementAge = 65;

Object.defineProperty(me, 'yearsToRetirement', { get() {
    if(this.age > this.retirementAge) { return 0; }
    else { return this.retirementAge - this.age; }
}, set(value) {
    this.age = this.retirementAge - value;
    return value;
}
});

//See Dice class above for more get() and set() examples
const yellowDice = new Dice;



//-----------Creating Objects Using other Objects----------//
const Human = {
    arms: 2,
    legs: 2,
    walk() {console.log('Walking'); }
}
//using a capital as the first letter shows it's different

//create an instance of Human (it will inherit ALL the properties of Human)
const lois = Object.create(Human);

//add extra properties
lois.name = 'Lois Lane';
lois.job = 'Reporter';
//OR (longer way)
const jimmy = Object.create(Human, { name: {value: 'Jimmy Olsen', enumerable: true },
job: { value: 'Photographer', enumerable: true} });

const Superhuman = Object.create(Human);

Superhuman.change = function() {
    return `${this.realName} goes into a phone box and comes out as ${this.name}!`;
};
Superhuman.name = 'Name Needed';
Superhuman.realName = 'Real Name Needed';

const superman = Object.create(Superhuman);

//change the default values by hand
superman.name = 'Superman';
superman.realName = 'Clark Kent';

//change the default values by adding an init
Superhuman.init = function(name,realName) {
    this.name = name;
    this.realName = realName;
    this.init = undefined; //makes it so that this init is only used once
    return this;
}

const batman = Object.create(Superhuman);
batman.init('Batman','Bruce Wayne');

const aquaman = Object.create(Superhuman).init('Aquaman','Arthur Curry');



//---------------Mixins----------------------------------//
function mixin(target,...objects) {
    for (const object of objects) {
        if(typeof object === 'object') {
            for (const key of Object.keys(object)) {
                if (typeof object[key] === 'object') {
                    target[key] = Array.isArray(object[key]) ? [] : {};
                    mixin(target[key],object[key]);
                } 
                else { 
                    Object.assign(target,object);
                }
                }
            }
        }
    return target;
}


const a = {}, b = { foo: 'bar'}, c = { numbers: [1,2,3] };

mixin(a,b,c);


const wonderWoman = Object.create(Superhuman);
mixin(wonderWoman, { name: 'Wonder Woman', realName: 'Diana Prince'});


function copy(target) {
    const object = Object.create(Object.getPrototypeOf(target));
    mixin(object,target);
    return object;
}

//uses the copy function to create a new object for bizarro
const bizarro = copy(superman);
bizarro.name = 'Bizarro';
bizarro.realName = 'Subject B-0';

//uses copy function to make a copy, then the mixin fucntion to change the name and realName
function createSuperhuman(...mixins) {
    const object = copy(Superhuman);
    return mixin(object,...mixins);
}

const hulk = createSuperhuman({name: 'Hulk', realName: 'Bruce Banner'});

//adding things using mixins gives us more flexibilty(it's more what it has, not what it is)
const flight = {
    fly() {
        console.log(`Up, up and away! ${this.name} soars through the air!`);
        return this;
    }
}

const superSpeed = {
    move() {
        console.log(`${this.name} can move faster than a speeding bullet!`);
        return this;
    }
}

const xRayVision = {
    xray() {
        console.log(`${this.name} can see right through you!`);
        return this;
    }
}

mixin(superman, flight, superSpeed, xRayVision);
mixin(wonderWoman, flight, superSpeed);

//add the mixins to the createSuperHuman
const flash = createSuperhuman({ name: 'Flash', realName: 'Barry Allen'}, superSpeed);


//-----------------Binding-------------------------//
superman.friends = [batman,wonderWoman,aquaman];

//bind(this) method so that this doesn't change in the nested function
superman.findFriends = function() {
    this.friends.forEach(function(friend) {
        console.log(`${friend.name} is friends with ${this.name}`);
    }.bind(this));
}


//---------------Borrowing Methods from objects-----------//
const fly = superman.fly;

//fly.call(batman);
//running this in the console will invoke the fly but put in batman's name
