import { cmis } from '../lib/cmis';
import { SimpleTranslation, Translation } from '../model/CmisTranslation';
import { v4 as uuid } from 'uuid';

export class CmisControlller {

    private cmisSession: cmis.CmisSession;
    static readonly BASE_FOLDER = '/lingo';
    static readonly BASE_FOLDER_WORDS = CmisControlller.BASE_FOLDER + '/words';
    static readonly BASE_FOLDER_SEMANTICS = CmisControlller.BASE_FOLDER + '/semantics';

    constructor(cmisSession: cmis.CmisSession) {
        this.cmisSession = cmisSession;
    }

    public async saveSimpleTranslation(simpleTranslation: SimpleTranslation) {

        // const folder_vn = CmisControlller.BASE_FOLDER + 'vn';
        // const cmisName_vn = simpleTranslation.wordVn + '_' + simpleTranslation.partOfSpeech;
        // const doc_vn = await this.createDocument(folder_vn, { "cmis:objectTypeId": "D:lingo:text", "cmis:name": cmisName_vn, "lingo:text": simpleTranslation.wordVn});
        // const doc_vn_id = doc_vn.succinctProperties['cmis:objectId']
        // await this.markAs(doc_vn_id, "P:lingo:word");

        try {
            const cmisName_vn = simpleTranslation.wordVn + '_' + simpleTranslation.partOfSpeech;
            const doc_vn = await this.createText(CmisControlller.BASE_FOLDER_WORDS + '/vn', cmisName_vn, simpleTranslation.wordVn, "P:lingo:word");
            const doc_vn_id = doc_vn.succinctProperties['cmis:objectId']

            const doc_semantic = await this.createText(CmisControlller.BASE_FOLDER_SEMANTICS, uuid(), simpleTranslation.semantic, "P:lingo:semantic");
            const doc_semantic_id = doc_semantic.succinctProperties['cmis:objectId']

            const cmisName_en = simpleTranslation.wordEn + '_' + simpleTranslation.partOfSpeech;
            const doc_en = await this.createText(CmisControlller.BASE_FOLDER_WORDS + '/en', cmisName_en, simpleTranslation.wordEn, "P:lingo:word");
            const doc_en_id = doc_en.succinctProperties['cmis:objectId'];

            const rel_vn_semantic = await this.createRelationship(doc_vn_id, doc_semantic_id, "P:lingo:semantic");
            // const rel_vn_semantic_id = rel_vn_semantic.succinctProperties['cmis:objectId'];
            // this.markAs(rel_vn_semantic_id, "P:lingo:semantic");

            const rel_en_semantic = await this.createRelationship(doc_en_id, doc_semantic_id, "P:lingo:semantic");
            // const rel_en_semantic_id = rel_en_semantic.succinctProperties['cmis:objectId'];
            // this.markAs(rel_en_semantic_id, "P:lingo:semantic");
        } catch (e) {
            console.log("Error: " + e);
        }
    }

    private async createText(folder: string, cmisName: string, text: string, markAs: string) {
        // const cmisName_vn = simpleTranslation.wordVn + '_' + simpleTranslation.partOfSpeech;
        const doc_vn = await this.createDocument(folder, { "cmis:objectTypeId": "D:lingo:text", "cmis:name": cmisName, "lingo:text": text });
        const doc_vn_id = doc_vn.succinctProperties['cmis:objectId']
        const doc_vn_changeToken = doc_vn.succinctProperties['cmis:changeToken']
        await this.markAs(doc_vn_id, doc_vn_changeToken, markAs);

        return doc_vn;
    }

    private async markAs(doc_id: string, doc_changeToken : string, marker_cotid: string) {
        const data = await this.cmisSession.updateProperties(doc_id,
            { "cmis:secondaryObjectTypeIds": marker_cotid }, {
                changeToken: doc_changeToken,
                succinct: true
              }).catch((err) => {
                console.log("Error in updateProperties: " + err);
                console.log("Error in updateProperties: " + JSON.stringify(err.response));
                if (err.response) {
                    err.response.json().then(json => {
                        console.log("Err JSON: " + JSON.stringify(json));
                    });
                }
            });
        console.log("Marked SecProp " + marker_cotid + ": " + JSON.stringify(data));
        return data;
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

    private async createDocument(folderPath: string, input: { 'cmis:name': string, 'cmis:objectTypeId'?: string, [k: string]: string | string[] | number | number[] | Date | Date[] }, content?: string | Blob | Buffer) {
        try {
            const folder = await this.cmisSession.getObjectByPath(folderPath);
            const folderId = folder.succinctProperties['cmis:objectId'];
            const document = await this.cmisSession.createDocument(folderId, content, input);
            return document;
        }
        catch (e) {
            console.log("Error: " + e);
        }
    }

    private async createRelTranslation(sourceCoid: string, targetCoid: string) {
        const data = await this.cmisSession.createRelationship({ "cmis:objectTypeId": "R:cmiscustom:assoc", "cmis:sourceId": sourceCoid, "cmis:targetId": targetCoid });
        console.log("CreateRelationship Response: " + JSON.stringify(data));
        return data;
    }
    
    private async createRelationship(sourceCoid: string, targetCoid: string, secObjectTypeIds: string) {
        try {
        const data = await this.cmisSession.createRelationship({ "cmis:objectTypeId": "R:lingo:relationship", "cmis:sourceId": sourceCoid, "cmis:targetId": targetCoid,  "cmis:secondaryObjectTypeIds": secObjectTypeIds});
        console.log("CreateRelationship Response: " + JSON.stringify(data));
        return data;
        } catch (e) {
            console.log("Error: " + e);
        }
    }
}