import { cmis } from '../../lib/cmis';
import * as React from 'react';
import { Button, Panel, Table } from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

interface Props {
    cmisSession: cmis.CmisSession,
};

interface State {
    data: any,
    pages: number,
    loading: boolean
}

export class LeftPanel extends React.Component<Props, State> {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.fetchData = this.fetchData.bind(this);

        this.state = {
            data: [],
            pages: 1,
            loading: true
        };
    }

    requestData(pageSize, page, sorted, filtered):Promise<any> {
        console.log("pageSize: " + pageSize);
        console.log("page: " + page);
        console.log("sorted: " + JSON.stringify(sorted));
        console.log("filtered: " + JSON.stringify(filtered));
        return this.props.cmisSession.query("SELECT * from lingo:text", false, { includeRelationships: "both", maxItems: pageSize, skipCount: (page * pageSize), orderBy: sorted })
    }

    fetchData(state, instance) {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({ loading: true });
        // Request the data however you want.  Here, we'll use our mocked service we created earlier
        this.requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered
        ).then(res => {
            console.log("Result: " + JSON.stringify(res));
            console.log("hasMoreItems: " + res.hasMoreItems);
            console.log("hasMoreItems: " + JSON.stringify(res.hasMoreItems));
            if ((res.hasMoreItems))
                console.log("TRUE");
            else
                console.log("FALSE");
            // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
            this.setState((prevState, props) => ({
                data: res.results,
                pages: (res.hasMoreItems) ? prevState.pages + 1 : prevState.pages,
                loading: false
            }));
        }).catch(err => {
            console.log("Err: " + err);
            console.log("Err: " + JSON.stringify(err));
        });
    }

    handleClick(e) {
        console.log("Clicked ... " + e);
        let cell: HTMLTableCellElement = e.target;
        console.log("Clicked ... " + e.target);
        console.log("Clicked ... " + cell.innerText);
        console.log("Clicked ... " + JSON.stringify(cell.dataset));
        console.log("Clicked ... " + e.target.value);
        console.log("Clicked ... " + JSON.stringify(e.target));
        console.log("Clicked ... " + JSON.stringify(e.target.value));
    }

    render() {
        const { data, pages, loading } = this.state;
        return (
            <div>
                <Panel>
                    <ReactTable
                        columns={[
                            {
                                Header: "Word",
                                id: "Word",
                                accessor: w => w.succinctProperties['cmis:name']
                            },
                            {
                                Header: "Part Of Speech",
                                id: "lastName",
                                accessor: p => p.succinctProperties['cmis:description']
                            }
                        ]}
                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                        data={data}
                        pages={pages} // Display the total number of pages
                        loading={loading} // Display the loading overlay when we need it
                        onFetchData={this.fetchData} // Request new data when things change
                        filterable
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                </Panel>
            </div>
        )
    };
}

export default LeftPanel;