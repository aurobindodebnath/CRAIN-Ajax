
/* ----------------------- STOCK FUNCTIONS ------------------------------------*/

// function to initialize the stock and cards
//function initializeStock(){
///    stock = Object.keys(file_obj["obs"])
///}
// function to add id to the stock
function addToStock(id){
  file_obj["stock"].push(String(id))
  for(var i in api_data)
  {
    if(api_data[i]["id"]==Number(id))
    {
      file_obj["obs"][id] = api_data[i]
      file_obj["obs"][id]["annexure"] = false
      file_obj["obs"][id]["affected"] = ""
      file_obj["obs"][id]["images"] = {}
    }
  }
  createObsDOM(id)
  updateBanner();
  console.log(file_obj)
}
//function to remove id from stock
function deleteFromStock(id){
  for( var i = 0; i < file_obj["stock"].length; i++){
   if ( file_obj["stock"][i] == String(id)) {
     file_obj["stock"].splice(i, 1);
     i--;
   }
  }
  delete file_obj["obs"][id]
  $('#tr'+id).remove()
  updateDOM()
  updateBanner();
  console.log(file_obj)
}

