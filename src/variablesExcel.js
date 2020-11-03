module.exports = {

    cat : {
        "appsec":"Web Application Security Assessment",
        "mobsec":"Mobile Application Security Assessment",
        "scr":"Source Code Review",
        "va":"Vulnerability and Penetration Testing"
    },

    switch_keyword : "EDIT",

    dimensions : {
        "inc_row":18,
        "inc_col":12,
        "ini_col":2,
        "threshold":2
    },

    dimensions2 : {
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

   



}