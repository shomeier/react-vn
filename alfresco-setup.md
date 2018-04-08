## Enable CORS
- In tomcat/webapps/alfresco/WEB-INF/web.xml uncomment the _CORS Filter_ and _CORS Filter Mappings_
- For _cors.allowOrigin_ set: the following values: "http://localhost:8080, http://localhost:3000"
- Restart Alfresco

## Enable Smartfolders
- In tomcat/shared/classes/alfresco-global.properties set property _smart.folders.enabled=true_ 

## Start all services
- _./alfresco.sh start_

## Start with root (for JLAN binding to ports <1024)
- In tomcat/bin: _sudo ./startup.sh_ 
- Then postgresql needs to be started separately: _./postgresql/scripts/ctl.sh start_
