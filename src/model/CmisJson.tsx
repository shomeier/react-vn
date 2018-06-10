export interface CmisPropertyDefinition {
    defaultValue: string,
    displayName: string,
    description: string,
    choice: CmisChoice[]
}

export interface CmisChoice {
    value: string;
    displayName: string;
}