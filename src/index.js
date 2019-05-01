document.addEventListener('DOMContentLoaded', init())

function init() {
    getQuotes()
    addEventListeners()
}

function getQuotes() {
    fetch("http://localhost:3000/quotes")
    .then(res => res.json()).then(data => data.forEach(renderQuote))
}

function renderQuote(quote) {
    console.log(quote)
    html = ` <li id=${quote.id} class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>0</span></button>
      <button data-id=${quote.id} class='btn-danger'>Delete</button>
    </blockquote>
  </li> `
    const quoteContainer = document.querySelector('#quote-list')
    quoteContainer.innerHTML += html
    const buttons = document.querySelectorAll('.btn-danger')
    buttons.forEach(function (button) {
        button.addEventListener('click', deletePost)
    })
    //debugger
}

function addEventListeners() {
    const form = document.querySelector('#new-quote-form')
    form.addEventListener('submit', saveQuote)
}

function saveQuote(event) {
    event.preventDefault()
    console.log(event)
    let quoteField = event.target.quote.value
    let authorField = event.target.author.value
    //debugger
    fetch("http://localhost:3000/quotes", 
        {   method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify( 
               { quote: quoteField,
                authore: authorField } )
        }
    ).then(response => response.json())
     .then(renderQuote, event.target.reset())
}

function deletePost(event) {
    console.log('post id:' , event.target.dataset.id)
    const postId = event.target.dataset.id
    //debugger
    fetch(`http://localhost:3000/quotes/${postId}`, 
        {   method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }
    ).then(response => response.json())
     .then(console.log)
    let post = document.getElementById(postId)
    post.remove()

}