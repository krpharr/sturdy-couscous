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

// serve static files from /public directory
app.use(express.static('public'));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// let preNotes = [new Note("Lorem", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, aperiam?"),
//     new Note("Ipsum", "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, et molestiae sint itaque quae deserunt"),
//     new Note("Velit", "Lorem ipsum dolor, sit amet consectetur adipisicing elit.")
// ];

let db = new Db(__dirname);


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
    let notes = db.getNotes();
    return notes === "undefined" ? {} : res.json(notes);
});

// deletes a single note, or returns true or false
app.delete("/api/notes/:id", function(req, res) {
    let notes = db.getNotes();
    if (notes === "undefined") {
        return res.json(false);
    }
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

// Create New Note - takes in JSON input
app.post("/api/notes", function(req, res) {
    let { title, text } = req.body;
    let newNote = new Note(title, text);
    console.log(newNote);
    let notes = db.getNotes();
    if (notes === "undefined") {
        notes = [];
    }
    notes.push(newNote);
    db.setNotes(notes);
    res.json(newNote);
});

// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});