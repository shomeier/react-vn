import * as React from 'react';
import { ControlLabel, FormControl } from 'react-bootstrap';
import { CmisPropertyDefinition } from "../../model/CmisJson";

export interface CmisFormControlProps {
    label?: string,
    propertyDefinition: CmisPropertyDefinition,
    value?: string;
    componentClass?: String;
    onChange?: any;
    item?: string;
};

export const CmisFormControl: React.StatelessComponent<CmisFormControlProps> = (props) => {

    const propertyDefinition = props.propertyDefinition;
    const label = (props.label) ? props.label : propertyDefinition.displayName;
    const componentClass = (props.componentClass) ? props.componentClass : 'input';

    let options;
    if (componentClass === 'select') {
        options = propertyDefinition.choice.map(function (itemData) {
            if (itemData.value === props.value) {
                return <option key={itemData.value} value={itemData.value} selected>{itemData.displayName}</option>;
            }
            else {
                return <option key={itemData.value} value={itemData.value}>{itemData.displayName}</option>;
            }
        });
    }

    return (
        <div className="cmisFormControl">
            <ControlLabel>{label}</ControlLabel>
            <FormControl
                //componentClass={componentClass}
                placeholder="select" onChange={(e) => props.onChange(props.item, e)}>
                {options}
            </FormControl>
        </div>
    );
}