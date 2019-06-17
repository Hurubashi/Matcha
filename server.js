const express = require('express')
const app = express()

app.get('/api/users', (req, res) => {
    const users = [
        {id: 1, firstName: 'John', lastName: 'Doe'}
    ]
    res.json(users)
})

const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`))