/* ----------------------- CARD FUNCTIONS ------------------------------------*/

function initializeCards(){
  let pane = document.getElementById('sidepane')
  pane.innerHTML = ""
  for(var i in api_data){
    let comments = api_data[i].comments
    if(comments==null){
      comments=" ";
    }
    let node = '<div class="card" id="card'+ api_data[i].id+'" data-toggle="tooltip" title="#'+api_data[i].id+' '+comments+'" onclick="cardClick('+ api_data[i].id +')">\
           <div class="contain text-left"><!--<span style="font-size:10px;" class="badge">'+api_data[i].abbr+'</span> &nbsp;-->\
              <b>'+ api_data[i].observation+'</b>\
           </div></div>\
        ';
    $("#sidepane").append(node);
  }
  for(var i in file_obj["stock"])
  {
    let cardele = document.getElementById("card"+file_obj["stock"][i]);
    cardele.style.backgroundColor = "#333";
    cardele.style.color = "#eee";
  }
}

function checkCards(mylist){
  for(var i in mylist){
    if(file_obj["stock"].indexOf(String(mylist[i]))!=-1)
    {
      let cardele = document.getElementById("card"+mylist[i]);
      cardele.style.backgroundColor = "#333";
      cardele.style.color = "#eee";
    }
  }
}

// Event Handler: checks or unchecks the card
function cardClick(val){
  var cardele = document.getElementById("card"+val);
  if(file_obj["stock"].indexOf(String(val))== -1)
  {
    cardele.style.backgroundColor = "#333";
    cardele.style.color = "#eee";
    addToStock(val)
  }else{
    cardele.style.backgroundColor = "#eee";
    cardele.style.color = "#333";
    deleteFromStock(val)
  }
}

//function to create card in the sidepane
function createCards(mylist){
  let pane = document.getElementById('sidepane')
  pane.innerHTML = ""
  for(var i in api_data){
    if(mylist.indexOf(api_data[i]["id"])!=-1)
    {
      let node = '<div class="card" id="card'+ api_data[i].id+'" onclick="cardClick('+ api_data[i].id +')">\
             <div class="contain text-left"><!--<span style="font-size:10px;" class="badge">'+api_data[i].abbr+'</span> &nbsp;-->\
                <b>'+ api_data[i].observation+'</b>\
             </div></div>\
          ';
      $("#sidepane").append(node);
    }
  }
}