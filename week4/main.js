const form = document.forms['search'];

const input = form.elements.searchInput;

//***adds an event when the cursor is in the input***
//input.addEventListener('focus', () => alert('focused'), false);

//***DOES SOMETHING WHEN THE FOCUS leaves THE INPUT BOX***
input.addEventListener('blur', () => alert('blurred'), false);

//***DOES SOMETHING WHEN THE INPUT BOX HAS BEEN CHANGED***
input.addEventListener('change', () => alert('changed'), false);


form.addEventListener ('submit', search, false);

function search(event) {
    alert(`You searched for: ${input.value}`);
    event.preventDefault();
}

//***THE JAVASCRIPT WAY OF CHANGING THE DEFAULT OR PLACEHOLDER VALUE IN THE INPUT BOX ***
/*input.value = 'Search Here';

input.addEventListener('focus', function() {
    if (input.value === 'Search Here') {
        input.value = '';
    }
}, false);

input.addEventListener('blur', function() {
    if(input.value === ''){
        input.value = 'Search Here';
    }
}, false)*/

