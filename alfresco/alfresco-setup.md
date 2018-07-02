## Enable CORS
- In tomcat/webapps/alfresco/WEB-INF/web.xml uncomment the _CORS Filter_ and _CORS Filter Mappings_
- For _cors.allowOrigin_ set: the following values: "http://localhost:8080, http://127.0.0.1:8080, http://localhost:3000"
- Restart Alfresco

## Enable Smartfolders
- In tomcat/shared/classes/alfresco-global.properties set property _smart.folders.enabled=true_ 

## Start all services
- _./alfresco.sh start_

## Start with root (for JLAN binding to ports <1024)
- Postgresql needs to be started separately: _./postgresql/scripts/ctl.sh start_
- _sudo ./tomcat/scripts/ctl.sh start_ 

## Setup folders
Create following folders in Repository:
* lingo
* lingo/languages
* lingo/languages/en 
* lingo/languages/vn
* lingo/users

