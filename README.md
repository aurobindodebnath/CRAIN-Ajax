# CRAIN Application

## Introduction

CRAIN stands for _Cyber Report Automation INtegration_. It is an application for Windows that runs on the browser and helps the user to generate excel reports for various Cyber Security related activities such as Application Security Assessment, Vulnerability Assessment et al. in a standard format. It pulls the observation writeups from the CRAIN-db-microservice.
A user may create report by selecting the observations and importing the images. Alteratively, for vulnerability assessment, the tool directly reads output of Elliot creates a vulnerability excel report.
The tool takes care of picking up standard writeups, the formatting, the alignment and arrangment of the images, linking of annexures, conversion of Elliot's text-based output into image evidences et al.

## Architecture and Technological Stack

```
 ________________________ CRAIN _____________________                       ______ THIRD PARTY TOOLS _____
|                                                    |                     |                              |

 ________________                     _______________
|                |                   |               |
|    CRAIN DB    |  ---------------> |     CRAIN     |    
|  MICROSERVICE  |                   |  APPLICATION  |  <----------------- [+] ELLIOT
|________________|                   |_______________|      (Optional)         Command line python based
                                                                               tool to gather Vulnerability
 [+] Remote Server                   [+] Local Machine                         Assessment evidences via
    [] Python                           [] HTML, CSS, JS                       automated procedures.
    [] Django REST                      [] NodeJS
       Framework
       
```

## Installation
```
[] Clone this repository
[] Request the base.xlsx file from the admin and place it in the templates directory
[] Double Click on src/Install.bat
```
## Usage

__Development__
```
[] Clone the CRAIN-db-microservice reporsitory
[] Follow instructions in the README of that repository
[] Set the value of domain in variables.js to localhost:port
    (port = port at which CRAIN-db-microservice is running locally)
```
__Production__
```
[] Connect to the CyberLab VPN
[] Double Click on run_Crain.bat
```

## User Guide
_Coming Soon_

## Contributors
- Aurobindo Debnath
- Akriti Aggarwal
