powershell -Command "Invoke-WebRequest https://nodejs.org/dist/v12.18.3/node-v12.18.3-x64.msi -OutFile node.msi"
if errorlevel 1 exit
node.msi
mkdir projectConfig
mkdir ..\reports
del node.msi
npm install
echo **** Installation Complete ****
