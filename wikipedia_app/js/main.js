
const searchTerm = document.querySelector('#searchTerm')
const searchbutton = document.querySelector('#searchbutton')
const randomButton = document.querySelector('#randomButton')
const output = document.querySelector('.output')

const wiki_link = 'https://en.wikipedia.org/wiki'
const randomEndpoint = '/Special:Random'


let ajaxSearch = function(){
  // console.log('Ready for Ajax Search');
  output.innerHTML = ""

  const API_URL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm.value}&format=json&callback=?`

  $.ajax({
    type: 'GET',
    url: API_URL,
    async: false,
    dataType: 'json',
    success: function (data) {
      // data[0] is the search term
      // data[1] is the title
      // data[2] is the content
      // data[3] is the url
      console.log(data);

      // create a for loop that adds onto the output element a group of list items that is appended to the list. Each list item needs a class called listItems where in your CSS you will style you list items using this class. Add an anchor tag that its href is url link given back from the data object.

      for (let i in data[1]){
        output.innerHTML += `
          <li class="listItem">
            <a href="${data[3][i]}" target="_blank"> ${data[1][i]} </a>
            <p> ${data[2][i]} </p>
          </li>
        `
      }
    },
    error: function (err) {
      console.log('There was an error');
    }
  })
}

let randomSearch = () => {
  window.open(`${wiki_link}${randomEndpoint}`)
}

searchButton.addEventListener('click', ajaxSearch)
randomButton.addEventListener('click', randomSearch)
