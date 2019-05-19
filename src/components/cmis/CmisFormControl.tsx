import * as React from 'react';
import { FormLabel, FormControl } from 'react-bootstrap';
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
            // console.log("itemData.value: " + itemData.value);
            // console.log("props.value: " + props.value);
            if (itemData.value === props.value) {
                return <option onChange={(e) => props.onChange(props.item, e)} key={itemData.value} value={itemData.value} selected>{itemData.displayName}</option>;
            }
            else {
                return <option onChange={(e) => props.onChange(props.item, e)} key={itemData.value} value={itemData.value}>{itemData.displayName}</option>;
            }
        });
    }

    let form;
    if (componentClass === 'select') {
        form = <FormControl onChange={(e: any) => props.onChange(e)} as="select">
        {/* componentClass={componentClass} */}
        {/* onChange={(e) => props.onChange(props.item, e)}> */}
        {/* onChange={(e: any) => props.onChange(props.item, e)}> */}
        {options}
        </FormControl>
    } else {
        form = <FormControl
        //componentClass={componentClass}
        onChange={(e: any) => props.onChange(props.item, e)}>
        </FormControl>
    }

    return (
        <div className="cmisFormControl">
            {form}
            {/**
            <FormLabel>{label}</FormLabel>
            <FormControl as="select"
                //componentClass={componentClass}
                placeholder="select" onChange={(e) => props.onChange(props.item, e)}>
                {options}
            </FormControl>
            */}
        </div>
    );
}