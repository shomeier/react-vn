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