const fs = require('fs');
const users = {};
const User = require('./model/user.model');

// Globale Stier til filer og mapper.
users.userFile = './data/users.json';

// Get Users - Her henter vi vores brugere fra vores bruger fil.

// Get Users - Her henter vi vores brugere fra vores bruger fil.
users.getUsersFromFile = async (callback) => {

    fs.readFile(users.userFile, 'utf8', (err, data) => {
  
      if(err) {
          return callback(301, {'message' : 'der skete en fejl'});
      }
  
      return callback(200, data);
  
    });
  
};

users.getUsers = (callback) => {

    let data = {'test' : 'get all users'};
    return callback(200, data);

};

users.deleteUser = (payload, callback) => {

    let query = {'email' : payload.email};
  
    User.deleteOne(query).then( (result) => {
  
      if(result.deletedCount === 0)
      {
        callback(200, {'message' : 'Brugeren kunne ikke slettes', 'result' : {}})
      }
      else {
  
        callback(200, {'message' : 'Brugeren er slettet', 'result' : result})
        
      }
  
  
    }).catch(error =>  callback(503, error))
  
  }

  users.registerUser = (payload, callback) => {

    console.log('payload fra clienten', payload);

    // Et eksempel på en hardcoded bruger.
    // const user = User.create({
    //   name : 'Flemming Nielsen',
    //   username : 'Flemse',
    //   email : 'Flemming@medieskolerne.dk',
    //   password : '1234',
    //   address : {
    //     zipcode : '7190',
    //     city : 'Billund'
    //   }
    // });

    // MongoDB - Query til at finde en bruger.
    
    // let query = {$or:[{"email" : payload.email}, {"username" : payload.username}]}
    let query = {'email' : payload.email};

    User.find(query).then( (result) => {

      console.log('Found: ', result);

      if(result.length === 0) {

        // Hvis vi ikke finder en bruger opretter vi en ny med vores payload.
        User.create(payload).then( () => {

            callback(200, {'message' : 'Ny bruger er oprettet'});

        })
      

      } else {

        // Vi returnere en besked om at brugeren ikke kunne oprettes.
        callback(200, {'message' : 'Bruger kunne ikke oprettes'})

      }

    });

};

module.exports = users;