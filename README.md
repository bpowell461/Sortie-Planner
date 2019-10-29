# Sortie Planner

Project to help with planning sorties for the air force (More to come...)

### Requirements  
*Node*: Version 10.16.3 (https://nodejs.org/en/download/)  
*Npm*: Version 6.9.0  
*Angular*: Version 8.3.5 (See below for installation steps)    

Note that downloading Node will also download NPM  

### Recommended
*Visual Studio Code*: (https://code.visualstudio.com/download)  
*Git for Windows*: (https://git-scm.com/download/win)  

### Install Angular
Open up a powershell or bash shell and enter this line of code:  
`npm install -g @angular/cli`

### Getting Started
*Learn Angular*: Tour of Heroes App Tutorial (https://angular.io/tutorial)  
*Learn Node and Express*: Local Library Website Tutorial (https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website)

### Launching the project  
1. To launch the client, open your shell and navigate to **\sortie-planner\SortieClient\src\app**  
2. Enter the command: `$npm start`  
3. On your browser, go to the IP it says it is listening on at the bottom line (This is usually localhost:4200)  
4. You should see the I-SPAMM website open up.  
5. To launch the server, navigate to the **\i-spamm\SortieServer** on the project folder  
6. Enter the command: `$node .\server.js`  
7. Go to 'localhost:8000' on your browser to interact with the server.  