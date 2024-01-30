import app from './app.js'
import mongoDBconnect from './db/connection.js'

const PORT = process.env.PORT || 5000;

mongoDBconnect().then(() => {
    app.listen(PORT, () => {
        console.log(`server running in port no ${PORT}`)
    })
})