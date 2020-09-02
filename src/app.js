const express = require('express')
const fs = require('fs')
const path = require('path')
var bodyParser = require('body-parser')
var varExcel = require('./variablesExcel')
const ExcelJS = require('exceljs');


// Constants
const PORT = 3000
const app = express()

// Static files and Middlewares
app.use(express.static(path.join(__dirname,'browser_view','templates')))
app.use('/work', express.static(path.join(__dirname,'browser_view','templates','workarea.html')))
app.use(express.static(path.join(__dirname,'browser_view')))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}))

// Local API Endpoints
app.get('/readProjects', (req, res)=>{
    fs.readdir(path.join('.','projectConfig'), (err, items) => {
        let response = []
        if(err){
            res.json({error: "Unable to read Files"})
        }
        else{
            for(var i=0; i<items.length;i++)
            {
                try{
                    let item = JSON.parse(fs.readFileSync(path.join('.','projectConfig',items[i])))
                    item["filename"] = items[i]
                    //TO DO: item Validation
                    response.push(item)
                }
                catch(e){
                    console.log(e.name)
                }
            }
            res.json({projects : response})
        }
    })
})    

app.post('/createProject', (req, res)=>{
    console.log("This is req body",req.body)
    let file_obj = req.body
    let filename = file_obj.projectName
    //Check if filename already exists, then error
    try{
        if(fs.existsSync(path.join('.','projectConfig', filename))){
            res.json({error: "Project with this name already exists!"})
        }
        else{
            delete file_obj.projectName
            file_obj.img_limit = 2;
            file_obj.stock = [];
            file_obj.obs = {};
            //TEST CASE : Check if filenames with special characters are permitted
            fs.writeFile(path.join('.','projectConfig', filename), JSON.stringify(file_obj), (error) =>{
                if(error){
                    res.json({error: "Error in creating the project!"})
                }
                else{
                    file_obj["projectName"] = filename
                    res.json({data: file_obj})
                }
            })
        }
    }
    catch(e){
        res.json({error: "Something went wrong!"})
    }
})


app.get('/openProject/:projectName',(req, res)=>{
    try{
        if(!fs.existsSync(path.join('.','projectConfig', req.params.projectName))){
            res.json({error: "No Such Project exists!"})
        }
        else{
            fs.readFile(path.join('.','projectConfig', req.params.projectName),(error, data)=>{
                if(error)
                {
                    res.json({error: "Unable to read Project data"})
                }
                else{
                    let project_data = JSON.parse(data)
                    project_data["projectName"] = req.params.projectName
                    res.json(project_data)
                }
            })
        }
    }
    catch(e){
        res.json({error: "Something went wrong!"})
    }
})

app.post('/save/:projectName',(req, res)=>{
    //TO DO: Input validation
    try{
        if(!fs.existsSync(path.join('.','projectConfig', req.params.projectName))){
            res.json({error: "Project does not exists!"})
        }
        else{
            let file_obj = req.body
            delete file_obj.projectName
            //TEST CASE : Check if filenames with special characters are permitted
            fs.writeFile(path.join('.','projectConfig', req.params.projectName), JSON.stringify(file_obj), (error) =>{
                if(error){
                    res.json({error: "Error in writing to the project!"})
                }
                else{
                    res.json({success: "Project Successfully Saved!"})
                }
            })
        }
    }
    catch(e){
        res.json({error: "Something went wrong!"})
    }
})


app.get('/deleteProject/:id',(req, res)=>{
    res.send("Delete Endpoint")
})


app.post('/importImages', (req, res)=>{
    console.log(req.body)
    fs.readdir(req.body.path, (err, items) => {
        let response = []
        if(err){
            res.json({error: "Unable to read Images"})
        }
        else{
            console.log(items)
            res.json(items)
        }
    })
})    


app.post('/generateExcel', (req, res)=>{
    let file_obj = req.body
    var workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(path.join('.','browser_view','templates','base.xlsx'))
    .then(function(){
        let startrow = 10
        let rowitr=3
        let colitr=varExcel.dimensions["ini_col"]

        //setting the author
        workbook.creator = "KPMG"

        //update the cover page
		var worksheet_cover = workbook.getWorksheet('Cover');
        let cell1 = worksheet_cover.getCell('C8').value
        cell1 = cell1.replace("var11111",file_obj["client"])
        cell1 = cell1.replace("var22222",varExcel.cat[file_obj["category"]])
        worksheet_cover.getCell('C8').value = cell1
		cell1 = worksheet_cover.getCell('C12').value
        cell1 = cell1.replace("var33333",file_obj["month"])
        cell1 = cell1.replace("var44444",file_obj["year"])
        worksheet_cover.getCell('C12').value = cell1
		cell1 = worksheet_cover.getCell('C15').value
	    cell1 = cell1.replace("var44444",file_obj["year"])
        worksheet_cover.getCell('C15').value = cell1
        
        //update disclaimer
		var worksheet_disclaimer = workbook.getWorksheet('Disclaimer and Assumptions');
		cell1 = worksheet_disclaimer.getCell('B3').value.split('var11111').join(file_obj["client"])
        worksheet_disclaimer.getCell('B3').value = cell1	
		cell1 = worksheet_disclaimer.getCell('B20').value.split('var11111').join(file_obj["client"])
        worksheet_disclaimer.getCell('B20').value = cell1	
		cell1 = worksheet_disclaimer.getCell('B22').value.split('var11111').join(file_obj["client"])
        worksheet_disclaimer.getCell('B22').value = cell1	
		cell1 = worksheet_disclaimer.getCell('B23').value.split('var11111').join(file_obj["client"])
        worksheet_disclaimer.getCell('B23').value = cell1	
		cell1 = worksheet_disclaimer.getCell('B24').value.split('var11111').join(file_obj["client"])
        worksheet_disclaimer.getCell('B24').value = cell1	

        //update observations & Annexures
        var worksheet = workbook.getWorksheet('Observations');
        var worksheet2 = workbook.getWorksheet('Annexures');
		cell1 = worksheet.getCell('A1').value
	    cell1 = cell1.replace("var11111",file_obj["app"])
        cell1 = cell1.replace("var22222",varExcel.cat[file_obj["category"]])
        let cell2 = worksheet.getCell('J9').value
        cell2 = cell2.replace("var11111", file_obj["client"])
        worksheet.getCell('A1').value = cell1
        worksheet.getCell('J9').value = cell2

        //update Annexures
		cell1 = worksheet2.getCell('A1').value
	    cell1 = cell1.replace("var11111",file_obj["app"])
        cell1 = cell1.replace("var22222",varExcel.cat[file_obj["category"]])
        worksheet2.getCell('A1').value = cell1	

        for(var i=0; i<file_obj["stock"].length;i++)
        {
          let ann = ""
          if(file_obj["obs"][file_obj["stock"][i]]["annexure"])
          {
            ann = "Annexure"
          }else{
            ann = "N/A"
          }
          
          var value = [i+1,file_obj["obs"][file_obj["stock"][i]]["observation"],file_obj["obs"][file_obj["stock"][i]]["detOb"],file_obj["obs"][file_obj["stock"][i]]["affected"],file_obj["obs"][file_obj["stock"][i]]["criticality"].toUpperCase(),file_obj["obs"][file_obj["stock"][i]]["risk"],file_obj["obs"][file_obj["stock"][i]]["recommendation"],ann]
          worksheet.spliceRows(startrow, 0, value);
          let cur_row = worksheet.getRow(startrow)
          cur_row.height = Math.min(cur_row.height, 220)
          worksheet.getCell('A'+startrow).alignment = { vertical: 'top', horizontal: 'center', wrapText: true };
          worksheet.getCell('A'+startrow).font = {name: 'Univers for KPMG',size: 10};
          worksheet.getCell('B'+startrow).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
          worksheet.getCell('B'+startrow).font = {name: 'Univers for KPMG',size: 10};
          worksheet.getCell('C'+startrow).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
          worksheet.getCell('C'+startrow).font = {name: 'Univers for KPMG',size: 10};
          worksheet.getCell('D'+startrow).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
          worksheet.getCell('D'+startrow).font = {name: 'Univers for KPMG',size: 10};
          worksheet.getCell('E'+startrow).font = {name: 'Univers for KPMG',size: 10};
          worksheet.getCell('E'+startrow).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
          worksheet.getCell('F'+startrow).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
          worksheet.getCell('F'+startrow).font = {name: 'Univers for KPMG',size: 10};
          worksheet.getCell('G'+startrow).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
          worksheet.getCell('G'+startrow).font = {name: 'Univers for KPMG',size: 10};
          worksheet.getCell('H'+startrow).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
		  worksheet.getCell('H'+startrow).font = {name: 'Univers for KPMG',size: 10, underline: true, color: { argb: 'FF0000EE' }};
		  worksheet.getCell('I'+startrow).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
          worksheet.getCell('I'+startrow).font = {name: 'Univers for KPMG',size: 10};
          
          worksheet.getCell('I'+startrow).dataValidation = {
            type: 'list',
            allowBlank: false,
            showErrorMessage: true,
            formulae: ['"OPEN, CLOSE"']
          };
          worksheet.getCell('I'+ startrow).value = "OPEN"
          worksheet.getCell('J'+startrow).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
          worksheet.getCell('J'+startrow).font = {name: 'Univers for KPMG',size: 10};
          worksheet.getCell('K'+startrow).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
          worksheet.getCell('K'+startrow).font = {name: 'Univers for KPMG',size: 10};
          worksheet.getCell('A'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
          worksheet.getCell('B'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
          worksheet.getCell('C'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
          worksheet.getCell('D'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
          worksheet.getCell('E'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
          worksheet.getCell('F'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
          worksheet.getCell('G'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
          worksheet.getCell('H'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
          worksheet.getCell('I'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
          worksheet.getCell('J'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};
          worksheet.getCell('K'+startrow).border = { top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},right: {style:'thin'}};

          if(worksheet.getCell('E'+startrow).value=="HIGH"){
            worksheet.getCell('E'+startrow).fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'FFFD3535'},bgColor:{argb:'FFFD3535'}};
          }
          else if(worksheet.getCell('E'+startrow).value=="MEDIUM"){
            worksheet.getCell('E'+startrow).fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'FFFFC000'},bgColor:{argb:'FFFFC000'}};
          }
          else if(worksheet.getCell('E'+startrow).value=="LOW"){
            worksheet.getCell('E'+startrow).fill = {type: 'pattern',pattern:'solid',fgColor:{argb:'FF92D050'},bgColor:{argb:'FF92D050'}};
          }
          startrow++;
          



        } 



        
        // code to update the table
        worksheet.getCell('C4').value = {formula: 'COUNTIF(E9:E10000, "HIGH")'}
        worksheet.getCell('C5').value = {formula: 'COUNTIF(E9:E10000, "MEDIUM")'}
        worksheet.getCell('C6').value = {formula: 'COUNTIF(E9:E10000, "LOW")'}
        worksheet.getCell('C7').value = {formula: 'C4+C5+C6'}

        worksheet.getCell('D4').value = {formula: 'COUNTIFS(E9:E10000,"HIGH",I9:I10000,"CLOSE")'}
        worksheet.getCell('D5').value = {formula: 'COUNTIFS(E9:E10000,"MEDIUM",I9:I10000,"CLOSE")'}
        worksheet.getCell('D6').value = {formula: 'COUNTIFS(E9:E10000,"LOW",I9:I10000,"CLOSE")'}
        worksheet.getCell('D7').value = {formula: 'D4+D5+D6'}

        worksheet.getCell('E4').value = {formula: 'COUNTIFS(E9:E10000,"HIGH",I9:I10000,"OPEN")'}
        worksheet.getCell('E5').value = {formula: 'COUNTIFS(E9:E10000,"MEDIUM",I9:I10000,"OPEN")'}
        worksheet.getCell('E6').value = {formula: 'COUNTIFS(E9:E10000,"LOW",I9:I10000,"OPEN")'}
        worksheet.getCell('E7').value = {formula: 'E4+E5+E6'}



        console.log("Hello")


        workbook.xlsx.writeFile(path.join('..','reports',file_obj["projectName"]+'.xlsx'))
    });
    res.json({success: "Report Saved!"})
})


// Start Server
app.listen(PORT, ()=>{
    console.log("CRAIN local server running at port ", PORT)
})
