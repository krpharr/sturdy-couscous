const moment = require("moment");

class Note {
    constructor(text) {
        this.id = moment().format();
        this.text = text;
    }
}

module.exports = Note;