/*function doSomething(){
    console.log(`screen: (${event.screenX},${event.screenY}),
        page: (${event.pageX},${event.pageY}), 
        client: (${event.clientX},${event.clientY})`);
}

addEventListener('click', doSomething);*/

const clickParagraph = document.getElementById('click');

clickParagraph.addEventListener('click', () => console.log('click') );
clickParagraph.addEventListener('mousedown', () => console.log('down') );
clickParagraph.addEventListener('mouseup', () => console.log('up') );

const dbclickParagraph = document.getElementById('dblclick');
dbclickParagraph.addEventListener('dblclick', highlight);

function highlight(event) {
    event.target.classList.toggle('highlight');
}

const mouseParagraph = document.getElementById('mouse');
mouseParagraph.addEventListener('mouseover', highlight);
mouseParagraph.addEventListener('mouseout', highlight);
mouseParagraph.addEventListener('mousemove', () => console.log('You Moved!') );

addEventListener('keydown', highlight);
addEventListener('keyup', (event) => console.log(`You stopped pressing the key on ${new Date}!`));

addEventListener('keydown', (event) => console.log(`You pressed the ${event.key} character`));

const onceParagraph = document.getElementById('once');
onceParagraph.addEventListener('click', remove);

function remove(event) {
    console.log('Enjoy This While It Lasts!');
    onceParagraph.style.backgroundColor = 'pink';
    onceParagraph.removeEventListener('click',remove);
}