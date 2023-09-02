((): void => {
  const filename: string = process.argv[2];
  const fs: any = require("fs");
  const data: string = fs.readFileSync(filename).toString();

  class CsvToJson {
    static convert(inputCsv: string) {
      const tempArray: string[] = inputCsv.replace(/\/r/g, "").split("\n");
      const csvArray: string[][] = tempArray.map((v: string) => {
        return v.split(",");
      });
      const infoTitle: string[] = csvArray.shift() as string[];
      const csvToJson: { [key: string]: string }[] = csvArray.map(
        (v: string[]): { [key: string]: string } => {
          const temp: { [key: string]: string } = {};
          for (const i in infoTitle) {
            temp[infoTitle[i]] = v.at(parseInt(i)) as string;
          }
          return temp;
        }
      );
      return csvToJson;
    }
  }

  const result: any = CsvToJson.convert(data);

  fs.writeFileSync(filename.split(".").at(0) + ".json", JSON.stringify(result));
  console.log(result);
})();
