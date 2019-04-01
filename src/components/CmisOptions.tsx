import * as React from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../lib/cmis';
import { FormControl } from 'react-bootstrap';

interface Props {
    cmisSession: cmis.CmisSession,
    typeDefinitionId: string,
    propertyDefinitionId: string,
    selected?: string;
};

interface State {
    options: CmisChoice[];
}

interface CmisChoice {
    value: string;
    displayName: string;
}

export class CmisOptions extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = { options: null };
    }


    componentDidMount() {
        const cmisSession = this.props.cmisSession;
        cmisSession.getTypeDefinition(this.props.typeDefinitionId).then((res) => {
            let options = res.propertyDefinitions[this.props.propertyDefinitionId].choice
            this.setState({ options: options });
        });
    }

    render() {

        const selected = this.props.selected;
        let options: any[] = [<option value='loading'>Loading ...</option>];
        if (this.state.options) {
            options = this.state.options.map(function (itemData) {
                if (itemData.value === selected) {
                    return <option key={itemData.value} value={itemData.value} selected>{itemData.displayName}</option>;
                }
                else {
                    return <option key={itemData.value} value={itemData.value}>{itemData.displayName}</option>;
                }
            });
        }
        return (
            options
        );
    }
}

export default CmisOptions;