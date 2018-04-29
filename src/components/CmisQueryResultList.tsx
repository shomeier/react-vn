import * as React from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../lib/cmis';
import * as ReactList from 'react-list';

interface Props {
    cmisSession: cmis.CmisSession,
    query: string,
};

interface State {
    results: {succinctProperties:string}[];
    isLoading: boolean;
}

export class CmisQueryResultList extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);

        this.state = {
            results: [],
            isLoading: true,
        };
    };

    executeCmisQuery(skipCount) {

        this.props.cmisSession.query(this.props.query, false, {
            // includeAllowableActions: false,
            // includeRelationships: false,
            maxItems: 1000,
            // orderBy: 'cmis:name',
            // renditionFilter: 'none',
            // skipCount: 0,
            // succinct: false
        }).then(data => {
            console.log("Data: " + JSON.stringify(data));
            this.setState({ results: data.results, isLoading: false });
        }).catch(err => {

            if (err.response) {
                console.log("Jumped in here ...");
                err.response.json().then(json => {
                    console.warn("Type creation is not supported in this repository");
                    console.log("json: " + JSON.stringify(json));
                });
            }
        });
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        this.executeCmisQuery(0);

        // fetch(API + DEFAULT_QUERY)
        //     .then(response => response.json())
        //     .then(data => this.setState({ hits: data.hits, isLoading: false }));
    }

    renderItem(index, key) {
        if (!this.state.isLoading) {

            console.log("Loading object at index: " + index + "...");
            const object = this.state.results[index];
            if (!object)
                return <div>{`Error loading cmis object at index ${index}`}</div>
            else
                return <div key={key}>{this.state.results[index].succinctProperties['cmis:name']}</div>;
        } else {
            return <div>Loading ...</div>
        }
    }

    render() {
        const results = this.state.results;
        const listItems = results.map((cmisObject) =>
            <li key={cmisObject.succinctProperties['cmis:objectId']}>
                {cmisObject.succinctProperties['cmis:name']}
            </li>
        );
        return (
            <div>
                {/* <ul>{listItems}</ul> */}
                <div style={{ overflow: 'auto', maxHeight: 400, width: '18%' }}>
                    <ReactList
                        itemRenderer={this.renderItem}
                        length={results.length}
                    // type='uniform'
                    />
                </div>
            </div>
        );
    };
}