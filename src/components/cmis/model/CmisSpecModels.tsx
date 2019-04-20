export interface CmisRepositoryInfo {
    repositoryId:string
    repositoryName:string
    productVersion:string
    rootFolderId:string
    repositoryUrl:string
    rootFolderUrl:string
}

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