NemakiWare Wiki:
https://github.com/aegif/NemakiWare/wiki

Start:
Core: 'mvn jetty:run' in core folder
Solr: 'mvn jetty:run' in solr folder
UI: 'activator run' in ui folder

See also: https://github.com/aegif/NemakiWare/wiki/Development_-Development-in-Eclipse

UI available at:  http://localhost:8080/ui/repo/bedroom/login

Repository URL:
http://localhost:8080/core/browser/bedroom?cmisselector=repositoryInfo

Always necessary to include allowable actions! For CMIS Workbench add the following param:
cmis.workbench.folder.includeAllowableActions=true

Solr is available at:
http://localhost:8983/solr/#/

Force Index via URL:
http://localhost:8983/solr/admin/cores?core=nemaki&action=index&tracking=AUTO&repositoryId=bedroom

action can be 'index', 'init' or 'change_password'
tracking can be 'AUTO', 'FULL' or 'DELTA'
-> see NemakiCoreAdminHandler.java