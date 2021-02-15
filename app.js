
const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
    const song = ["All Alone", "All By Myself", "All of Me", "All of You",
    "Angel Eyes", "As Time Goes By", "Baby Won't You Please Come Home", "Blame It On My Youth",
    "Blue Moon", "Body and Soul", "Bye, Bye Blackbird", "Chicago (That Toddlin' Town)",
    "The Christmass Song", "Close to You", "Dancing in the Dark", "Dream a Little Dream of Me",
    "Fly Me to the Moon", "Jingle Bells", "Let It Snow!, Let It Snow!, Let It Snow!", "New york, New York"];
    const randomSong = Math.floor(Math.random() * song.length);
    res.send(song[randomSong]);
});

app.get('/birth_date', (req, res) => {
    res.send("12 December 1915");
});

app.get('/birth_city', (req, res) => {
    res.send("Hoboken");
});

app.get('/wives', (req, res) => {
    res.send("Barbara, Ava, Nancy, Mia");
});

app.get("/picture",(req,res) => {
    var picture = "<img src = https://upload.wikimedia.org/wikipedia/commons/a/af/Frank_Sinatra_%2757.jpg / >";
    res.send(picture);
});

//app.get("/restricted", function(req, res, next){
//
//  // Grab the "Authorization" header.
//  var auth = req.get("authorization");
//
//  // On the first request, the "Authorization" header won't exist, so we'll set a Response
//  // header that prompts the browser to ask for a username and password.
//  if (!auth) {
//    res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
//    // If the user cancels the dialog, or enters the password wrong too many times,
//    // show the Access Restricted error message.
//    return res.status(401).send("Authorization Required");
//  } else {
//    // If the user enters a username and password, the browser re-requests the route
//    // and includes a Base64 string of those credentials.
//    var credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");
//    if (credentials[0] === "username" && credentials[1] === "password") {
//      // The username and password are correct, so the user is authorized.
//      return res.send("Access Granted!");
//    } else {
//      // The user typed in the username or password wrong.
//      return res.status(403).send("Access Denied (incorrect credentials)");
//    }
//  }
//
//});

const basicAuth = require('express-basic-auth');

app.get('/public', (req, res) => {
    res.send('Everybody can see this page');
});

app.use(
    basicAuth({
        users: { admin: 'admin' },
        unauthorizedResponse: (req) => {
           return '401 Not authorized';
        },
    })
);

app.get('/protected', (req, res) => {
    res.send('Welcome, authenticated client');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

