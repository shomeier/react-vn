import React, { Component } from 'react';
import cmis from 'cmis';

class CmisSearchResultList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            isLoading: false,
        };
    };

    componentDidMount() {
        this.setState({ isLoading: true });

        this.props.cmisSession.query(this.props.query, false, {
            // includeAllowableActions: false,
            // includeRelationships: false,
            // maxItems: 3,
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
        // fetch(API + DEFAULT_QUERY)
        //     .then(response => response.json())
        //     .then(data => this.setState({ hits: data.hits, isLoading: false }));
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
                <ul>{listItems}</ul>
            </div>
        );
    };
}

export default CmisSearchResultList;