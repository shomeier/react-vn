## Enable CORS

- In tomcat/webapps/alfresco/WEB-INF/web.xml uncomment the _CORS Filter_ and _CORS Filter Mappings_
- For _cors.allowOrigin_ set: the following values: "http://localhost:8080, http://localhost:300"
- Restart Alfresco

## Enable Smartfolders
- In tomcat/shared/alfresco-global.properties set property _smart.folders.enabled=true_ 