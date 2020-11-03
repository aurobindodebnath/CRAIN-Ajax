const mydomain = '192.168.1.8:8000';
//const mydomain = '127.0.0.1:8000';

const protocol = 'http';

const TOKEN = ""

var cat = {
	"appsec":"Web Application Security Assessment",
	"mobsec":"Mobile Application Security Assessment",
}

var cat2 = {
	"appsec":"Web",
	"mobsec":"Mobile",
}

var switch_keyword = "EDIT";

/*set parameters for images*/
var dimensions = {
	"inc_row":18,
	"inc_col":12,
	"ini_col":2,
	"threshold":2
}

var dimensions2 = {
	"ini_col": 2,
	"thresholds":{
		"0.5":{
			"inc_row":18,
			"inc_col":3
		},
		"2":{
			"inc_row":18,
			"inc_col":12			
		},
		"4":{
			"inc_row":11,
			"inc_col":12			
		},
		"8":{
			"inc_row":6,
			"inc_col":12			
		}
	}
}

var file_obj = null
var api_data = null
var filename = ""
var mybanner={
  "High":0,
  "Medium":0,
  "Low":0
};
