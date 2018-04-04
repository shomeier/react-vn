## Enable CORS

- In tomcat/webapps/alfresco/WEB-INF/web.xml uncomment the _CORS Filter_ and _CORS Filter Mappings_
- For _cors.allowOrigin_ set: the following values: "http://localhost:8080, http://localhost:3000"
- Restart Alfresco

## Enable Smartfolders
- In tomcat/shared/alfresco-global.properties set property _smart.folders.enabled=true_ 

## Start with root (for JLAN binding to ports <1024)

- In tomcat/bin: _sudo ./startup.sh_ 
