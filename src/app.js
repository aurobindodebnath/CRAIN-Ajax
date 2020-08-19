const express = require('express')
const fs = require('fs')
const path = require('path')
var bodyParser = require('body-parser')

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
    res.send("4")
})


// Start Server
app.listen(PORT, ()=>{
    console.log("CRAIN local server running at port ", PORT)
})
