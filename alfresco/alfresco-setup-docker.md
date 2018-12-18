# Alfresco with Docker

https://www.alfresco.com/thank-you/thank-you-downloading-alfresco-community-edition

## Starting Alfresco Services
*. Navigate to directory _docker-compose_ where the _docker-compose.yml_ file is located.
*. Run ```docker-compose up```
*. Open the following URLs in your browser to check that everything starts up:
* Share: [http://<machine_ip>:8080/share](http://localhost:8080/share)
* REST APIs and administration: [http://<machine_ip>:8082/alfresco](http://localhost:8082/alfresco)
* Search administration: [http://<machine_ip>:8083/solr](http://localhost:8083/solr)

**Note:**
* Make sure ports 5432, 8080, 8082, and 8083 are open. These are defined in the _docker-compose.yml_ file.
* If Docker is running on your local machine, the IP address will be just _localhost_.
* If you're using the [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows), run the following command to find the IP address:
```bash
docker-machine ip
```
* If you run ```docker-compose up``` after deleting a previous Docker Compose cluster, then replace step 3 with the following command:
```bash
docker-compose down && docker-compose build --no-cache && docker-compose up
```

## CORS
---
**NOTE:**
The directives below no more need to be executed. The CORS adjustments are automatically done in docker-compose.yml file!
---

The first time alfreso is started we need to adjust the CORS settings in order to allow CMIS requests from out ReactJS Client which is running at localhsot:3000:
1. Login to the alfresco container ```docker exec -i -t docker-compose_alfresco_1 /bin/bash```
2. Navigate to the _web.xml_ file where to adjust the CORS setting ```cd /usr/local/tomcat/webapps/alfresco/WEB-INF```
3. Adjust the file permissions for _web.xml_ so that we can write to it ```chmod 664 web.xml```
4. In _web.xml_ uncomment the _CORS Filter_ and _CORS Filter Mappings_
5. For _cors.allowOrigin_ in _web.xml_ set: the following values: "http://localhost:8080, http://127.0.0.1:8080, http://localhost:3000"