import "/s/buss/g/j/g.p.js";
var readWorkbookFromLocalFile = function (file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, { type: 'binary' });
        if (callback) callback(workbook);
    };
    reader.readAsBinaryString(file);
};

var submit = function (e) {
    var files = e.target.files;
    for (let file of files) {
        readWorkbookFromLocalFile(file, function (workbook) {
            var fromTo = '', persons = [];
            for (var sheetName in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheetName)) {
                    let sheet = workbook.Sheets[sheetName];
                    debugger
                    fromTo = sheet['!ref'];
                    console.log(fromTo);
                    persons = persons.concat(XLSX.utils.sheet_to_json(sheet));
                    console.log(persons);
                }
            }
            console.log(persons);
        });
    }
};

export { submit };