(function () {
    var filename = process.argv[2];
    var fs = require("fs");
    var data = fs.readFileSync(filename).toString();
    var CsvToJson = /** @class */ (function () {
        function CsvToJson() {
        }
        CsvToJson.convert = function (inputCsv) {
            var tempArray = inputCsv.replace(/\/r/g, "").split("\n");
            var csvArray = tempArray.map(function (v) {
                return v.split(",");
            });
            var infoTitle = csvArray.shift();
            var csvToJson = csvArray.map(function (v) {
                var temp = {};
                for (var i in infoTitle) {
                    temp[infoTitle[i]] = v.at(parseInt(i));
                }
                return temp;
            });
            return csvToJson;
        };
        return CsvToJson;
    }());
    var result = CsvToJson.convert(data);
    fs.writeFileSync(filename.split(".").at(0) + ".json", JSON.stringify(result));
    console.log(result);
})();
