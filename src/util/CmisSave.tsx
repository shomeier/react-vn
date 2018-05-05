import { cmis } from '../lib/cmis';

export interface Translation {
    partOfSpeech:string;
    sourceWords:string[];
    sourceLanguage:string;
    meanings:Meaning[];
}

export interface Meaning {
    classifier?:string;
    targetWord:string;
    targetLanguage:string;

}

export interface Example {
    example:string;
    translation:string;
}

export class CmisSave {
        static saveTanslation(cmisSession: cmis.CmisSession, translation: Translation) {

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

        
        cmisSession.getObjectByPath('/lingo/en').then((res) => {
            const enFolder:string = res.succinctProperties['cmis:objectId'];
            console.log("enFolder: " + enFolder);
            cmisSession.createDocument(enFolder, '', {"cmis:objectTypeId": "D:cmiscustom:document", "cmis:name": translation.sourceWords[0] + '_' + translation.partOfSpeech}).then((res) => {
                
                console.log("wordEn: " + JSON.stringify(res));
                const wordEnCoid:string = res.succinctProperties['cmis:objectId'];
                cmisSession.getObjectByPath('/lingo/vn').then((res) => {
                    const vnFolder:string = res.succinctProperties['cmis:objectId'];
                    console.log("vnFolder: " + vnFolder);
                    
                    cmisSession.createDocument(vnFolder, '', {"cmis:objectTypeId": "D:cmiscustom:document", "cmis:name": translation.meanings[0].targetWord + '_' + translation.partOfSpeech}).then((res) => {
                        console.log("wordVn: " + JSON.stringify(res));
                        const wordVnCoid:string = res.succinctProperties['cmis:objectId'];
                        cmisSession.createRelationship({"cmis:objectTypeId": "R:cmiscustom:assoc", "cmis:sourceId": wordEnCoid, "cmis:targetId": wordVnCoid}).then((res)=>{
                            console.log("CreateRelationship Response: " + JSON.stringify(res));
                        }).catch((err)=> {
                            console.log("Error in CreateRelationship: " + JSON.stringify(err));
                        });
                    });
                });
            })
        });
    }
}