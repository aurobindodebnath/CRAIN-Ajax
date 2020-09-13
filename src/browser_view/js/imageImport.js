
/* ----------------------- IMAGE UPLOAD FUNCTIONS ------------------------------------*/

function callImageImport(id){
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

function selectImagePath(id){
  document.getElementById("filepicker"+id).click()
}

/*INDIVIDUAL IMAGE DELETE*/
function deleteImages(id){
  file_obj["obs"][id]["images"]={}
  file_obj["obs"][id]["annexure"]=false
  document.getElementById('screenshot'+id).innerHTML="0"
  console.log(file_obj)
}

