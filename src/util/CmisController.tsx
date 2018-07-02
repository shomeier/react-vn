import { cmis } from '../lib/cmis';
import { Translation } from '../model/CmisTranslation';

export class CmisControlller {

    private cmisSession:cmis.CmisSession;
    static readonly BASE_FOLDER = '/lingo/languages/';

    constructor(cmisSession:cmis.CmisSession) {
        this.cmisSession = cmisSession;
    }

    public async saveTanslation(translation: Translation) {

        const sV = translation.sourceVocab;
        const sV_Folder = CmisControlller.BASE_FOLDER + sV.language;
        const sourceDocument = await this.createDocument(sV_Folder, { "cmis:objectTypeId": "D:cmiscustom:document", "cmis:name": sV.word + '_' + sV.partOfSpeech });
        const sV_id = sourceDocument.succinctProperties['cmis:objectId']
        await this.setWord(sV_id, translation.sourceVocab.word);

        const tV = translation.targetVocab[0];
        const tV_Folder = CmisControlller.BASE_FOLDER + tV.language;
        const targetDocument = await this.createDocument(tV_Folder, { "cmis:objectTypeId": "D:cmiscustom:document", "cmis:name": tV.word + '_' + sV.partOfSpeech });
        const tV_id: string = targetDocument.succinctProperties['cmis:objectId'];
        await this.createRelTranslation(sV_id, tV_id);
    }

    private async setWord(coid: string, word: string) {
        const data = await this.cmisSession.updateProperties(coid,
            { "cmis:secondaryObjectTypeIds": "P:lingo:word", "lingo:word": word }).catch((err) => {
                console.log("Error in updateProperties: " + err);
                console.log("Error in updateProperties: " + JSON.stringify(err.response));
                if (err.response) {
                    err.response.json().then(json => {
                        console.log("Err JSON: " + JSON.stringify(json));
                    });
                }
            });
            console.log("Created SecProp Word: " + JSON.stringify(data));
        return data;
    }

    private async createDocument(folderPath:string, input:{ 'cmis:name': string, 'cmis:objectTypeId'?: string, [k: string]: string | string[] | number | number[] | Date | Date[] }, content?: string | Blob | Buffer) {
        const folder = await this.cmisSession.getObjectByPath(folderPath);
        const folderId  = folder.succinctProperties['cmis:objectId'];
        return await this.cmisSession.createDocument(folderId, content, input);
    }

    private async createRelTranslation(sourceCoid:string, targetCoid:string) {
        const data = await this.cmisSession.createRelationship({ "cmis:objectTypeId": "R:cmiscustom:assoc", "cmis:sourceId": sourceCoid, "cmis:targetId": targetCoid });
        console.log("CreateRelationship Response: " + JSON.stringify(data));
        return data;
    }
}