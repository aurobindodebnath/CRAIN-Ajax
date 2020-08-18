
/* ----------------------- IMAGE UPLOAD FUNCTIONS ------------------------------------*/


/*INDIVIDUAL UPOLADS*/
/*
function importImages(imagePath,id){
//  var all_files= fs.readdirSync(imagePath);
  //TO DO : ajax API call all the files from the path
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/importImages',
    contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
      path : "C:\\Users\\KPMG\\Documents\\Development\\CRAIN-API"
    }),  	
    success: function(data) {
      console.log(data)
    }
  })
  */
/*
  for(var j in all_files)
  {
    let split_values = all_files[j].split('.')[0].split('_')
    if(isNaN(split_values[0]) || isNaN(split_values[1])){
	    continue;
    }
    file_obj["obs"][id]["images"][split_values[0]]= file_obj["obs"][id]["images"][split_values[0]] || {}
    file_obj["obs"][id]["images"][split_values[0]][split_values[1]] = path.join(imagePath,all_files[j])
  }
  let screenshotsFound = imageCount(file_obj["obs"][id]["images"])
  if(screenshotsFound>0){ file_obj["obs"][id]["annexure"]= true;}
  document.getElementById('screenshot'+id).innerHTML=screenshotsFound
  console.log(file_obj)
}
*/
function callImageImport(id){
  console.log("Inside callImageImport")
  function readMultipleImages(file){
  var reader = new FileReader()
  reader.onload = function(){
    let split_values = file.name.split('.')[0].split('_')
    if(isNaN(split_values[0]) || isNaN(split_values[1])){
    }
    file_obj["obs"][id]["images"][split_values[0]]= file_obj["obs"][id]["images"][split_values[0]] || {}
    file_obj["obs"][id]["images"][split_values[0]][split_values[1]] = reader.result
  let screenshotsFound = imageCount(file_obj["obs"][id]["images"])
  if(screenshotsFound>0){ file_obj["obs"][id]["annexure"]= true;}
  document.getElementById('screenshot'+id).innerHTML=screenshotsFound
  }
  reader.readAsDataURL(file)
}
 for (var i=0; i<event.target.files.length; i++){
   readMultipleImages(event.target.files[i])
  }
  console.log(file_obj)
  //  console.log("calling image import", event.target.files[0]).fullPath 
  //  let path = event.target.files[0].path.split("\\")
  //  importImages(path, id)
}

function setValueNull(id){
  document.getElementById("filepicker"+id).value = null
}
/*
function selectImagePath(id){
  document.getElementById("filepicker"+id).click()
}
*/
/*INDIVIDUAL IMAGE DELETE*/
function deleteImages(id){
  file_obj["obs"][id]["images"]={}
  file_obj["obs"][id]["annexure"]=false
  document.getElementById('screenshot'+id).innerHTML="0"
  console.log(file_obj)
}

