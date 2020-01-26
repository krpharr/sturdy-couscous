// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const Note = require("./lib/js/Note");
const Db = require("./lib/js/Db");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// let notes = [new Note("Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, aperiam?"),
//     new Note("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, et molestiae sint itaque quae deserunt"),
//     new Note("Lorem ipsum dolor, sit amet consectetur adipisicing elit.")
// ];

let db = new Db(__dirname);

//let notes = db.getNotes();


//console.log("notes", notes);
// Routes
// =============================================================

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
    let notes = db.getNotes();
    // console.log(notes);
    return res.json(notes);
});

// deletes a single note, or returns true or false
app.delete("/api/notes/:id", function(req, res) {
    let notes = db.getNotes();
    var chosen = req.params.id;

    console.log(chosen);

    for (var i = 0; i < notes.length; i++) {
        console.log(notes[i].id);
        if (chosen === notes[i].id) {
            notes.splice(i, 1);
            db.setNotes(notes);
            return res.json(true);
        }
    }

    return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let newNote = new Note(req.body.text);

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newNote.routeName = newNote.id;

    console.log(newNote);
    let notes = db.getNotes();
    notes.push(newNote);
    db.setNotes(notes);
    res.json(newNote);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});