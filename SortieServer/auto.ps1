npm run tsc
node .\build\app.js

0 1 2 3 4 5 6

csc -target:library -out:UberInput.dll C:\Users\Jacob\Projects\GitProj\uberair-blue\C#\classes\UberInput\*.cs
csc -target:library -out:UberLogic.dll C:\Users\Jacob\Projects\GitProj\uberair-blue\C#\classes\UberLogic\*.cs
csc -target:library -out:UberObject.dll C:\Users\Jacob\Projects\GitProj\uberair-blue\C#\classes\UberObject\*.cs
csc -out:Planner.exe C:\Users\Jacob\Projects\GitProj\uberair-blue\C#\Planner.cs /reference:UberInput.dll

Make a Powershell and Linux make

csc -target:library -out:DLLs/UberInput.dll ./classes/UberInput/*.cs
csc -target:library -out:DLLs/UberLogic.dll ./classes/UberLogic/*.cs
csc -target:library -out:DLLs/UberObject.dll ./classes/UberObject/*.cs
csc -out:Planner.exe Planner.cs /reference:UberInput.dll /reference:UberLogic.dll /reference:UberObject.dll
