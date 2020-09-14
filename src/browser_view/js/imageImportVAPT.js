function drawImages(data){
  alert(1);
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
        drawImages(data);
      }
    }
  })
}
