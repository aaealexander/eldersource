const express = require('express')
const path = require('path')
const referralsRouter = require('./routes/referrals')

const app = express()
const PORT = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/referrals', referralsRouter)
app.get('/', (_req, res) => res.redirect('/referrals'))

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`))
