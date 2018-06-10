import { cmis } from '../lib/cmis';
import { Translation } from '../model/CmisTranslation';

export class CmisSave {

    private cmisSession:cmis.CmisSession;

    constructor(cmisSession:cmis.CmisSession) {
        this.cmisSession = cmisSession;
    }

    public saveTanslation(translation: Translation) {

        /**
        cmisSession.updateProperties("6c65f505-600e-420c-8ff6-1c445e53ec30;1.0",
            {"cmis:secondaryObjectTypeIds": "P:lingo:word", "lingo:word": translation.wordVn}).then((res) => {
                console.log("Response: " + JSON.stringify(res));
            }).catch((err)=> {
                console.log("Error in updateProperties: " + err);
                console.log("Error in updateProperties: " + JSON.stringify(err.response));
                if (err.response) {
                    err.response.json().then(json => {
                      console.log("Err JSON: " + JSON.stringify(json));
                    });
                }
            });
            */

        /** 
        cmisSession.createRelationship({"cmis:objectTypeId": "R:cmiscustom:assoc", "cmis:sourceId": "e44eaf07-9678-44f2-b1cb-8a50a60053fe;1.0", "cmis:targetId": "32c8aac6-ebdf-48b0-8040-6ac92c0ca2e4;1.0"}).then((res)=>{
            console.log("CreateRelationship Response: " + JSON.stringify(res));
        }).catch((err)=> {
            console.log("Error in CreateRelationship: " + err);
            console.log("Error in CreateRelationship: " + JSON.stringify(err.response));
            if (err.response) {
                err.response.json().then(json => {
                  console.log("Err JSON: " + JSON.stringify(json));
                });
            }
        });
        */


        const sV = translation.sourceVocab;
        const sV_Folder = '/lingo/' + sV.language;
        this.cmisSession.getObjectByPath(sV_Folder).then((res) => {
            const sV_FolderId: string = res.succinctProperties['cmis:objectId'];
            console.log("sV_FolderId (" + sV_Folder + "): " + sV_FolderId);
            this.cmisSession.createDocument(sV_FolderId, '', { "cmis:objectTypeId": "D:cmiscustom:document", "cmis:name": sV.word + '_' + sV.partOfSpeech }).then((res) => {

                console.log("sourceVocab: " + JSON.stringify(res));
                const sV_Id: string = res.succinctProperties['cmis:objectId'];

                const tV = translation.targetVocab[0];
                const tV_Folder = '/lingo/' + tV.language;
                this.setWord(sV_Id, translation.sourceVocab.word).then((res) => {
                    this.cmisSession.getObjectByPath(tV_Folder).then((res) => {
                        const tV_FolderId: string = res.succinctProperties['cmis:objectId'];
                        console.log("tV_FolderId (" + tV_Folder + "): " + tV_FolderId);

                        this.cmisSession.createDocument(tV_FolderId, '', { "cmis:objectTypeId": "D:cmiscustom:document", "cmis:name": tV.word + '_' + sV.partOfSpeech }).then((res) => {
                            console.log("targetVocab: " + JSON.stringify(res));
                            const tV_id: string = res.succinctProperties['cmis:objectId'];

                            this.createRelTranslation(sV_Id, tV_id);
                        });
                    });
                }).catch((err) => {
                    console.log("Err in setWord to coid " + sV_Id + ", Err: " + err);
                    console.log("Err in setWord to coid " + sV_Id + ", Err: " + JSON.stringify(err));
                });
            })
        });
    }

    private async setWord(coid: string, word: string) {
        const data = await this.cmisSession.updateProperties(coid,
            { "cmis:secondaryObjectTypeIds": "P:lingo:word", "lingo:word": word }).then((res) => {
                console.log("Created SecProp Word: " + JSON.stringify(res));
            }).catch((err) => {
                console.log("Error in updateProperties: " + err);
                console.log("Error in updateProperties: " + JSON.stringify(err.response));
                if (err.response) {
                    err.response.json().then(json => {
                        console.log("Err JSON: " + JSON.stringify(json));
                    });
                }
            });
        return data;
    }

    private async createRelTranslation(sourceCoid:string, targetCoid:string) {
        const data = await this.cmisSession.createRelationship({ "cmis:objectTypeId": "R:cmiscustom:assoc", "cmis:sourceId": sourceCoid, "cmis:targetId": targetCoid }).then((res) => {
            console.log("CreateRelationship Response: " + JSON.stringify(res));
        }).catch((err) => {
            console.log("Error in CreateRelationship: " + JSON.stringify(err));
        });

        return data;
    }
}