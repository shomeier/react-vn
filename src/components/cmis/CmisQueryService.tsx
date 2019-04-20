import {CmisTableData} from "../cmis/model/CmisTableData"
import {CmisSessionWrapper} from "./CmisSessionWrapper"

export class CmisQueryService {
    
    public static async getTableServerData({statement, filters, sortBy, pageSize, pageIndex }):Promise<CmisTableData> {

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