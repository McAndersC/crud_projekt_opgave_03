// Requires
const express = require('express');
const path = require('path');
const users = require('./users');
const database = require('./database');

// Constants.
const expressServer = express();

// Express server use(s).
// Dette er moduler til Express serveren.

// Dette er "middleware" services til express.
// Det er moduler der udføre opgaver og som simplificere de opgaver vi har med f.eks:

// 1. Modtage JSON.
expressServer.use(express.json());

// 2. Eksponere statiske filer
expressServer.use(express.static('client'));

// 3. Urlencode
expressServer.use(express.urlencoded({
    extended: true
}));

// Skab kontakt til database
database.connect();


// Server Module.
const server = {};

/*


    Endpoints til backoffice klient routes


*/

// Route til vores Klient forside.
expressServer.get('/', (req, res) => {
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/index.html'))

});

expressServer.get('/create', (req, res) => {
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/create.html'))

});

expressServer.get('/read', (req, res) => {
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/read.html'))

});

expressServer.get('/update', (req, res) => {
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/update.html'))

});

expressServer.get('/delete', (req, res) => {
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/delete.html'))

});

/*


    Endpoints til backend routes


*/

// Route til at hente alle brugere.
expressServer.get('/users/all', (req, res) => {

    users.getUsers( (code, returnObj) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);
    })
})

expressServer.post('/users/register', (req, res) => {

    console.log('Response', req.body)

    users.registerUser(req.body, (code, returnObj) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);
    })


})

expressServer.delete('/users/delete', (req, res) => {

    console.log('Response', req.body)

    users.deleteUser(req.body, (code, returnObj) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);
    })


})

// Undersøger om vi rammer en route vi ikke har defineret, vi sender en 404 status kode og præsentere en 404 side.
// Prøv feks "localhost:3000/minside" som vi ikke har oprettet en route til.
expressServer.get('*', (req, res) => {
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.status(404);
    res.sendFile(path.resolve(__dirname, '../client/404.html'))

});

// Starter Express server, og vi lytter på requests/forespørgelser.
server.run = () => {

    console.log('Starter server')

    const port = 3000;

    expressServer.listen(port, () => {

        console.log('Server er startet, lytter på http://localhost:' + port);

    })
}

// Exporterer vores server module objekt.
module.exports = server;