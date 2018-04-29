import * as React from 'react';
// import { cmis } from 'cmis';
import { cmis } from '../lib/cmis';
import { ControlLabel, FormControl } from 'react-bootstrap';

interface Props {
    cmisSession: cmis.CmisSession,
};

interface State {
    options: CmisChoice[];
}

interface CmisChoice {
    value: string;
    displayName: string;
}

class PartOfSpeechForm extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = { options: [] };
    }


    componentDidMount() {
        const cmisSession = this.props.cmisSession;
        cmisSession.getTypeDefinition("D:sho:word").then((res) => {
            console.log("Word Type Def: " + JSON.stringify(res));
            let options = res.propertyDefinitions['sho:partOfSpeech'].choice
            console.log("Choices: " + JSON.stringify(options));
            this.setState({ options: options });
        });
    }

    render() {

        let options;
        if (this.state.options) {
            options = this.state.options.map(function (itemData) {
                return <option value={itemData.value}>{itemData.displayName}</option>;
            });
        }
        return (
            <div className="partOfSpeechForm">
                <ControlLabel>Part Of Speech</ControlLabel>
                <FormControl
                    componentClass="select"
                    placeholder="select">
                    {options}
                </FormControl>
            </div>
        );
    }
}

export default PartOfSpeechForm;