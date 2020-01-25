const fs = require("fs");

class Db {
    constructor(appPath) {
        this.path = appPath + "/lib/json/db.json";
    }
    getNotes() {
        fs.readFile(this.path, "utf8", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let obj = JSON.parse(data);
            // console.log(obj);
            return obj;
        });
    }
    setNotes(notes) {
        fs.writeFile(this.path, JSON.stringify(notes), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("file written");
        });
    }
}

module.exports = Db;