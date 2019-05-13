import * as React from "react"
import { useState, useRef, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { CmisQueryService } from "../../cmis/CmisQueryService";

interface Props {
    statement: string
    columns: any
}

export default function GenericeBootstrapCmisTable(props: Props) {

    const [data, setData] = useState([]);

    // When sorting, filters, pageSize, or pageIndex change, fetch new data
    useEffect(
        () => {
            console.log("Rerendering with statement: " + props.statement)
            fetchData();
        },
        [props.statement]
    );

    const fetchData = async () => {
        // setLoading(true);

        // We can use a ref to disregard any outdated requests
        // const id = Date.now();
        // currentRequestRef.current = id;

        // Call our server for the data
        let filters = "";
        let sortBy = "";
        let pageSize = 100;
        let pageIndex = 0;
        const { rows, pageCount } = await CmisQueryService.getTableServerData(
            props.statement,
            filters,
            sortBy,
            pageSize,
            pageIndex
        );
        console.log("Rows: " + JSON.stringify(rows))

        // If this is an outdated request, disregard the results
        // if (currentRequestRef.current !== id) {
        //     return;
        // }

        // Set the data and pageCount
        setData(rows);
        // setState(old => ({
        //     ...old,
        //     pageCount
        // }));
        // console.log("STATE IN FETCH: " + JSON.stringify(props.state[0]));

        // setLoading(false);
    };

    return (
        <div>
            <BootstrapTable
                striped
                hover
                keyField='succinctProperties[cmis:objectId]'
                data={data}
                columns={props.columns} />
        </div>
    )
}