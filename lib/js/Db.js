const fs = require("fs");

class Db {
    constructor(appPath) {
        this.path = appPath + "/db/db.json";
    }
    getNotes() {
        const data = fs.readFileSync(this.path, "utf8", (err) => {
            console.log(err);
        });
        return JSON.parse(data);
    }

    setNotes(notes) {
        fs.writeFile(this.path, JSON.stringify(notes), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(this.path + "- written to disk");
        });
    }
}

module.exports = Db;