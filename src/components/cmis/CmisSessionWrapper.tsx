import { cmis } from '../../lib/cmis';
import { Alert } from 'react-bootstrap';
import { CmisRepositoryInfo } from './model/spec/CmisRepositoryInfo';
import React = require('react');
import { CmisTableData } from './model/CmisTableData';

export class CmisSessionWrapper {

    // MacOs Alfreso installation: Port 8080
    // let cmisUrl = 'http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser';
    // let cmisUrl = 'http://localhost:8080/core/browser/bedroom?cmisselector=repositoryInfo';
    // let cmisUrl = 'http://localhost:8080/core/browser/bedroom';
    private static CMIS_URL = 'http://localhost:8080/core/browser/lingo';
    private session: cmis.CmisSession;
    // let cmisUrl = 'http://localhost:8082/alfresco/api/-default-/public/cmis/versions/1.1/browser';
    // let cmisUrl = 'http://127.0.0.1:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser';
    // let cmisUrl = 'https://cmis.alfresco.com/api/-default-/public/cmis/versions/1.1/browser';

    // let session = new cmis.CmisSession(cmisUrl);

    private static instance: CmisSessionWrapper;
    private constructor() {
        this.session = new cmis.CmisSession(CmisSessionWrapper.CMIS_URL);
        this.session.setErrorHandler(err => console.log(err.stack));
        this.session.defaultRepository = {
            repositoryName: "lingo",
            repositoryUrl: "http://localhost:8080/core/browser/lingo",
            rootFolderUrl: "http://localhost:8080/core/browser/lingo/root"
        };
    }
    static getInstance(): CmisSessionWrapper {
        if (!CmisSessionWrapper.instance) {
            CmisSessionWrapper.instance = new CmisSessionWrapper();
        }
        return CmisSessionWrapper.instance;
    }

    public getWrappedSession(): cmis.CmisSession {
        return this.session
    }

    public setCredentials(user: string, password: string) {
        this.session.setCredentials(user, password)
    }

    public async canLogin(): Promise<boolean> {
        let retVal: boolean = false;
        try {
            let repositoryInfo = await this.session.getRepositoryInfo()
            if (repositoryInfo) {
                retVal = true;
            }
        } catch (e) {
            console.log("Error while logging: " + JSON.stringify(e))
        }
        return new Promise<boolean>(resolve => { resolve(retVal) })
    }

    public async getRepositoryInfo(): Promise<CmisRepositoryInfo> {
        try {
            console.log("getting RepositoryInfo: ...")
            const data = await this.session.getRepositoryInfo()
            console.log("Data: " + JSON.stringify(data))
            return data;
        } catch (e) {
            console.log("Error while getting repository info: " + JSON.stringify(e))
        }
    }

    public async getTableServerData({statement, filters, sortBy, pageSize, pageIndex }):Promise<CmisTableData> {

        console.log("Getting server data with statement: " + statement);
        console.log("filters: " + filters)
        console.log("sortBy: " + sortBy)
        console.log("pageSize: " + pageSize)
        console.log("pageIndex: " + pageIndex)
    
        let cmisSession = CmisSessionWrapper.getInstance().getWrappedSession()
        let result = await cmisSession.query(statement, false, { includeRelationships: "both", includeAllowableActions: true, maxItems: pageSize, skipCount: (pageIndex * pageSize), orderBy: sortBy })
        // console.log("Result: " + JSON.stringify(result));
        // console.log("hasMoreItems: " + result.hasMoreItems);
        // console.log("hasMoreItems: " + JSON.stringify(result.hasMoreItems));
    
        // Ideally, you would pass this info to the server, but we'll do it here for convenience
        // const filtersArr = Object.entries(filters);
    
        // Apply Filters
        // if (filtersArr.length) {
        //   rows = rows.filter(row =>
        //     filtersArr.every(([key, value]) => row[key].includes(value))
        //   );
        // }
    
        // Apply Sorting
        // if (sortBy.length) {
        //   const [{ id, desc }] = sortBy;
        //   rows = [...rows].sort(
        //     (a, b) => (a[id] > b[id] ? 1 : a[id] === b[id] ? 0 : -1) * (desc ? -1 : 1)
        //   );
        // }
    
        // Get page counts
        const pageCount = Math.ceil(result.numItems / pageSize);
        // const rowStart = pageSize * pageIndex;
        // const rowEnd = rowStart + pageSize;
        
        // Get the current page
        // rows = rows.slice(rowStart, rowEnd);
        
        let rows = result.results;
        console.log("Returning rows: " + JSON.stringify(rows))
        console.log("Returning pageCount: " + pageCount)
        return {
            rows,
            pageCount
        };
    };
}