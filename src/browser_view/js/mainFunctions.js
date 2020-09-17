
/*function to count images in an object*/
function imageCount(obj){
	var count = 0
	var mykeys = Object.keys(obj)
	for(var i=0;i<mykeys.length;i++)
	{
		count+=Object.keys(obj[mykeys[i]]).length
	}
	return count
}

/* function to update the banner with total high, med and low*/
function updateBanner(){
  mybanner["High"]=0;  mybanner["Medium"]=0;  mybanner["Low"]=0;
  for(var i in file_obj["stock"]){
    if(file_obj["obs"][file_obj["stock"][i]]["criticality"]=="High")
    {mybanner["High"]++;}
    else if(file_obj["obs"][file_obj["stock"][i]]["criticality"]=="Medium")
    {mybanner["Medium"]++;}
    else if(file_obj["obs"][file_obj["stock"][i]]["criticality"]=="Low")
    {mybanner["Low"]++;}
  }
  document.getElementById('highBanner').innerHTML = mybanner["High"]
  document.getElementById('medBanner').innerHTML = mybanner["Medium"]
  document.getElementById('lowBanner').innerHTML = mybanner["Low"]
}


/*DOM: function to create/delete Observations*/
function createObsDOM(id){
    //high,medium,low...... For selecting the select box
    let critic_array = ["","",""]
    if(file_obj["obs"][id]["criticality"]=="High"){
      critic_array[0]="selected";
    }else if(file_obj["obs"][id]["criticality"]=="Medium"){
      critic_array[1]="selected";
    }else{
      critic_array[2]="selected";
    }
    var cases = Object.keys(file_obj["obs"][id]["images"])
    var count=0;
    for(var i=0;i<cases.length;i++)
    {
      count += Object.keys(file_obj["obs"][id]["images"][cases[i]]).length
    }
    //adding the actual node to DOM
    var edit_switch1 = '<b>'
    var edit_switch2 = '</b>'
    if(file_obj["obs"][id]["abbr"]==switch_keyword){
      edit_switch1 = '<textarea id="'+id+'ob" name="'+id+'ob" onkeyup="updateFileObj('+id+',\'ob\', this.value)" style="width:100%; max-width: 100% ;font-size:13px; font-weight:bold;">'
      edit_switch2 = '</textarea>'
    }
    var node ='<tr id="tr'+file_obj["obs"][id]["id"]+'">\
                  <form name="form"'+id+'>\
          			<td>\
          					'+edit_switch1+file_obj["obs"][id]["observation"]+edit_switch2+'<br>\
          					<!--<span class="badge" style="font-size:10px;">'+file_obj["obs"][id]["abbr"]+'</span>&nbsp;&nbsp;-->\
                    <span class="label label-primary"><span id="screenshot'+id+'">'+count+'</span> screenshot(s)</span><br>\
                    <select id="critic'+id+'" onfocus="updateCritic('+id+')">\
                      <option value="High"'+critic_array[0]+'>High</option>\
                      <option value="Medium"'+critic_array[1]+'>Medium</option>\
                      <option value="Low"'+critic_array[2]+'>Low</option>\
                    </select>\
            		</td>\
          				<td><textarea id="'+id+'d" name="'+id+'d" onkeyup="updateFileObj('+id+',\'d\', this.value)" style="width:100%; max-width: 100% ;font-size:11px;">'+file_obj["obs"][id]["detOb"]+'</textarea></td>\
          				<td><textarea id="'+id+'a" name="'+id+'a" onkeyup="updateFileObj('+id+',\'a\', this.value)" style="width:100%; max-width: 100% ;font-size:11px;">'+file_obj["obs"][id]["affected"]+'</textarea></td>\
          				<td><textarea id="'+id+'ri" name="'+id+'ri" onkeyup="updateFileObj('+id+',\'ri\', this.value)" style="width:100%; max-width: 100% ;font-size:11px;">'+file_obj["obs"][id]["risk"]+'</textarea></td>\
          				<td><textarea id="'+id+'re" name="'+id+'re" onkeyup="updateFileObj('+id+',\'re\', this.value)" style="width:100%; max-width: 100% ;font-size:11px;">'+file_obj["obs"][id]["recommendation"]+'</textarea></td>\
          			<td>\
                    <button class="btn btn-xs btn-default" value="Import Images" onclick="selectImagePath('+id+')">Import Images</button>\
                    <input style="display:none;" type="file" id="filepicker'+id+'" name="fileList'+id+'" onclick="setValueNull('+id+')" onchange="callImageImport('+id+')" webkitdirectory multiple/>\
                    <br><br><button class="btn btn-xs btn-default" onclick="deleteImages('+id+')">Delete Images</button>\
          			</td></form>\
          			</tr>';
        $("#ObsDOM").append(node);
		let ele1 = document.getElementById(id+'re');
		let ele2 = document.getElementById(id+'ri');
		let ele3 = document.getElementById(id+'d');
		let ele4 = document.getElementById(id+'a');
		let height = Math.max(ele1.scrollHeight, ele2.scrollHeight, ele3.scrollHeight, ele4.scrollHeight);
		ele1.style.height = height +2+'px';
		ele2.style.height = height +2+'px';
		ele3.style.height = height +2+'px';
		ele4.style.height = height +2+'px';
    updateDOM()
  }

/* ----------------------- UPDATING JSON OBJECT USING DOM ------------------------------------*/

//on adding text to textareas: affected hosts and detailed Observation
function updateFileObj(id, para, str){
  if(para == 'a')
  {file_obj["obs"][id]["affected"] = str;}
  else if(para == 'd')
  {file_obj["obs"][id]["detOb"] = str;}
  else if(para == 'ri')
  {file_obj["obs"][id]["risk"] = str;}
  else if(para == 're')
  {file_obj["obs"][id]["recommendation"] = str;}
  else if(para =='ob')
  {file_obj["obs"][id]["observation"] = str;}
}

//On updating the critticality using drop down.
function updateCritic(id){
  let obj = document.getElementById("critic"+id)
  this.addEventListener("change", ()=>{
    file_obj["obs"][id]["criticality"] = obj.value;
    updateBanner()
    console.log(file_obj)
  });
}

/*-------------------------SEARCH FUNCTIONALITY----------------------------------------*/
$('#cardSearch').keyup(function(){
      var mylist = []
      var searchField = $(this).val();
			if(searchField === '')  {
        initializeCards()
				return;
      }

      var regex = new RegExp(searchField, "i");
      var output = '<div class="row">';
			$.each(api_data, function(key, val){
				if((val.abbr != null && (val.abbr.search(regex) != -1)) || (val.observation.search(regex) != -1)) {
            mylist.push(val.id)
				  }
				}
      )
      console.log("mylist", mylist)
      createCards(mylist)
      checkCards(mylist)
		});
