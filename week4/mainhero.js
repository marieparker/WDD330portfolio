const form = document.forms['hero'];

form.addEventListener('submit', makeHero, false);

//automatically checks the box using javascript(can also be done in the html 'checked')
document.forms.hero.powers[0].checked = true;

//automatically selects anti-hero
form.category[2].checked = true;

//get text from drop-down select
console.log(form.city.options[form.city.selectedIndex].text);

//set default words in textarea, can also be set in HTML by placing it between opening and closing tags
form.origin.value = 'Born as Kal-el on the planet Krypton...'

function makeHero(event) {
    //keeps the form from submitting (i.e. preents the default action from happening)
    event.preventDefault();

    //creates an object
    const hero = {};

    //creates a name key with input value as the definition
    hero.name = form.heroName.value;

    //creates a key and definition for the real name
    hero.realName = form.realName.value;

    //creates an array within the hero object with a key of powers
    hero.powers = [];
    //adds each checked item to that array
    //for (let i=0; i<form.powers.length; i++){
    //  if(form.powers[i].checked) {
    //    hero.powers.push(form.powers[i].value);
    //  }
    //}
    //another way to write it
    hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value);
        /*the three dots are the spread operator. In this case they tell the computer
        to spread out over all the values of form.powers and then make them an array(that's 
        the brackets). Then it filters them based on whether or not the box is checked. 
        Then it maps (or creates an array) with all of those checked values.*/

    hero.category = form.category.value;

    hero.age = form.age.value;

    hero.city = form.city.value;

    //alerts something like {"name":"Superman","realName":"Clark Kent"}
    //because it creates a JSON of the object
    alert(JSON.stringify(hero));

    //ensures that this new hero information is available outside this function
    return hero;
}


//checks the form for certain criteria
form.addEventListener('submit', validate, false);

function validate(event) {
    const firstLetter = form.heroName.value[0];
    if(firstLetter.toUpperCase() === 'X') {
        event.preventDefault();
        alert('Your name is not allowed to start with an X!');
    }
}


//create a div to show the error message
const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);

//adds the listener to the heroName for any keys coming up
form.heroName.addEventListener('keyup', validateInline, false);

//checks the value in heroName and shows the error div with a message if it starts with x
function validateInline() {
    let heroName = this.value.toUpperCase();
    if(heroName.startsWith('X')) {
        error.style.display = 'block';
    }
    else {
        error.style.display = 'none';
    }
}


//disabling button/enabling button
function disableSubmit(event) {
    if(event.target.value === '') {
        document.getElementById('submit').disabled = true;
    }
    else {
        document.getElementById('submit').disabled = false;
    }
}

form.heroName.addEventListener('keyup',disableSubmit,false);