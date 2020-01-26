const Db = require("../lib/js/Db");

test("Can instantiate Db instance", () => {
    const e = new Db(__dirname);
    expect(typeof(e)).toBe("object");
});

test("Can getData() form db.json", () => {
    // const ogjOarray = [];
    const e = new Db(__dirname);
    e.getNotes().then(res => {
        console.log(res);
        expect(typeof res).toBe("object");
    });
});