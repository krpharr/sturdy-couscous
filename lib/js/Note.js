const moment = require("moment");

class Note {
    constructor(title, text) {
        this.id = moment().format();
        this.title = title;
        this.text = text;
    }
}

module.exports = Note;