app.use(express.static('public'))
app.use(bodyParser.json())

const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vadar',
        quote: 'I find your lack of faith disturbing.'
      })
    })
    app.put('/quotes', (req, res) => {
        console.log(req.body)
    })
})