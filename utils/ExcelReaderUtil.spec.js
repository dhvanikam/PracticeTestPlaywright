
const ExcelJS = require('exceljs');

module.exports = {
    async getRegistrationData(sheetName, rowNum) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile("./testData/Excel_Data_Login_Register.xlsx");

        const worksheet = workbook.getWorksheet(sheetName);
        const data = [];


        worksheet.eachRow((row, rowNumber) => {

            if (rowNum === null) {//no rownumber has been specified in datatable, then read whole excel file
                if (rowNumber > 1 && rowNumber < 9) {

                    //cell level operation
                    const username = String(row.getCell(1).value);
                    const password = String(row.getCell(2).value);
                    const confirmpassword = String(row.getCell(3).value);
                    //collect all data in an array
                    data.push({ username, password, confirmpassword });
                }
            }
            else {
                if (rowNumber === rowNum) {

                    const username = String(row.getCell(1).value);
                    const password = String(row.getCell(2).value);
                    const confirmpassword = String(row.getCell(3).value);

                    //collected data for the specified row number
                    data.push({ username, password, confirmpassword });
                }
            }

        })

        return data;
    },

    async getLoginData(sheetName, rowNum) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile("./testData/Excel_Data_Login_Register.xlsx");

        const worksheet = workbook.getWorksheet(sheetName);
        const data = [];

        worksheet.eachRow((row, rowNumber) => {

            if (rowNumber === rowNum) {
                const username = String(row.getCell(1).value);
                const password = String(row.getCell(2).value);

                //collected data for the specified row number
                data.push({ username, password });
            }

        })

        return data;
    },
    /*
    This function readExcel reads an Excel file named PythonCode.xlsx located in the testData directory. 
    The function takes a sheetName parameter ==> the name of the sheet in the Excel file to read.
    1) Creates a new Workbook object from ExcelJS,
    2) Reads the Excel file using workbook.xlsx.readFile, 
    3) Gets the worksheet with the specified sheetName.
    4) It then iterates over each row in the worksheet, 
    skipping the first row as its header row
    For each row, it creates a new Map object called columnMapData and populates it 
    with key-value pairs where the key is the header name and 
    the value is the cell value at the corresponding column for that row.
    */
    async readExcel(sheetName) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile("./testData/PythonCode.xlsx");
        const worksheet = workbook.getWorksheet(sheetName);
        let excelRows = [];

        worksheet.eachRow((row, rowNumber) => {

            if (rowNumber === 1) {
                return;
            }

            let columnMapData = new Map();
            row.eachCell((cell, colNumber) => {
                cell = worksheet.getRow(rowNumber);
                let columnHeaderName = worksheet.getRow(1).getCell(colNumber).value;

                columnMapData.set(columnHeaderName, cell.getCell(colNumber).value);
            })
            excelRows.push(columnMapData);

        })
        return excelRows;
    }

}


