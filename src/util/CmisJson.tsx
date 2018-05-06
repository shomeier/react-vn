export interface CmisPropertyDefinition {
    displayName: string,
    description: string,
    choice: CmisChoice[]
}

export interface CmisChoice {
    value: string;
    displayName: string;
}