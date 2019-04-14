Copied from https://github.com/aegif/NemakiWare/wiki/Development_-Development-in-Eclipse/_edit

***
# Project setup
Once the projects' setup is finished, please import them as existing projects into Eclipse.  

## CMIS Core server
1. Execute ```mvn install``` in the /action and /common folders.
2. Run ```mvn eclipse:eclipse``` in the root folder.

## UI
1. Install Activator from https://www.playframework.com/download
2. Execute ```activator eclipse``` in the folder /ui

## Eclipse
1. Launch Eclipse
2. Import the projects core, nemaki-action, nemaki-common, ui from the file system.
3. Right-click the core project, select "Properties", "Project Facets", and "Convert to faceted form"

# Application Server
## Core/Solr
They can be run on Jetty by default.  
Either run `mvn jetty:run` in the `core` folder, or run from an Eclipse plugin such as [Run Jetty Run](https://code.google.com/p/run-jetty-run/).

By default, they are running on port 8080(core), 8983(solr).  

## UI
```activator run``` (By default, port 9000)

# Debug
## UI
When running UI server, execute ```activator -jvm-debug 9999 run```  
Connect to port 9999 by Eclipse's Remote Java Application.