const links = [
    {
      label: "Week 1 notes",
      type: 'notes',
      url: "week1/index.html"
    },
    {
      label: "Week 2 Notes",
      type: 'notes',
      url: "week2/index.html"
    }
  ]

for (let i = 0; i < links.length; i++) {
    let item = document.createElement('li');
    item.setAttribute('class', links[i].type);
    
    let newLink = document.createElement('a');
    newLink.setAttribute('href', links[i].url);
    newLink.textContent = links[i].label;
    item.appendChild(newLink);

    document.getElementById('list').appendChild(item);
}