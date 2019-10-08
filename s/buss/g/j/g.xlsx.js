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

var dealDemo = function (workbook) {
    console.log("请自定义数据处理方法！");
    var fromTo = '', persons = [];
    for (var sheetName in workbook.Sheets) {
        if (workbook.Sheets.hasOwnProperty(sheetName)) {
            let sheet = workbook.Sheets[sheetName];
            fromTo = sheet['!ref'];
            console.log(fromTo);
            persons = persons.concat(XLSX.utils.sheet_to_json(sheet));
            console.log(persons);
        }
    }
    console.log(persons);
}

var submit = function (e, callback) {
    var files = e.target.files;
    for (let file of files) {
        readWorkbookFromLocalFile(file, function (workbook) {
            if (callback) {
                callback(workbook);
                return;
            }
            dealDemo(workbook);
        });
    }
};

export { submit };