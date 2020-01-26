const Db = require("./lib/js/Db");

let db = new Db(__dirname);

let notes = db.getNotes();

console.log(notes);