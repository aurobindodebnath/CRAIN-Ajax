function clearImagePane(){
  $("#imagePane").empty()
}

function drawImages(data){
  console.log("this is me", data);
  for(var plugin in data){
    var node = '<br><h3 style="text-align:left;background-color:#6a7f9a;padding:10px;color:white">(#'+plugin+') <b>'+ file_obj["obs"][plugin]["observation"] +'</b></h3><br>'
    $("#imagePane").append(node)
    for(ip in data[plugin]){
      let ip_split = ip.split("_")
      node = '<div><p style="text-align:left;"><b> IP Address: <span style="color:blue;">'+ ip_split[0] +'</span> &nbsp; Port: <span style="color:green">'+ ip_split[1] +'</span></b></p><div style="margin-left:50px; margin-right:310px;"><pre style="min-height: 250px; white-space: pre-wrap; padding-top:20px; padding-bottom:20px;background-color: #222; color:#eee; text-align:left;">'+ data[plugin][ip] +'</pre></div></div>'
      console.log(ip)
      console.log(data[plugin][ip])
      $("#imagePane").append(node)
    }
  }
}

function readImages(){
  var path = document.getElementById("elliotPath").value
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/va/elliotEvidences/',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({path: path, plugins: file_obj["stock"]}),
    success: function(data) {
      if(data.error)
      {
        alert(data.error);
      }
      else{
        console.log(data);
        clearImagePane();
        drawImages(data);
      }
    }
  })
}
