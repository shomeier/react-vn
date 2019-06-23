import { CmisSessionWrapper } from "./CmisSessionWrapper"
import { CmisWord } from "./model/CmisLingoModel"
import { cmis } from "../../lib/cmis";
import { SuccinctCmisObject } from "./model/CmisSpecModel";
import * as shortid from 'shortid'

export class CmisLingoService {

    public static readonly LANGUAGE_VN = 'vn'
    public static readonly LANGUAGE_EN = 'en'
    private static readonly BASE_FOLDER = '/lingo'
    private static readonly BASE_FOLDER_WORDS = CmisLingoService.BASE_FOLDER + '/words'
    private static readonly BASE_FOLDER_SEMANTICS = CmisLingoService.BASE_FOLDER + '/semantics'

    private static readonly WORD_MARKER = "P:lingo:word";
    private static readonly POS_MARKER = "P:lingo:part_of_speech";
    public static readonly SEMANTIC_MARKER = "P:lingo:semantic";
    private static readonly LANGUAGE_MARKER_PREFIX = "P:lingo:language";

    private sessionWrapper: CmisSessionWrapper
    private cmisSession: cmis.CmisSession

    constructor(sessionWrapper: CmisSessionWrapper) {
        this.sessionWrapper = sessionWrapper
        this.cmisSession = sessionWrapper.getWrappedSession();
    }

    public async saveWord(word: CmisWord):Promise<any> {
        
        console.log("Saving word: " + JSON.stringify(word))
        const folder = CmisLingoService.BASE_FOLDER_WORDS + '/' + word.language;
        const cmisName = word.word + '_' + word.partOfSpeech;
        return this.createWord(folder, cmisName, word)
        // try {
        //     const folder = CmisLingoService.BASE_FOLDER_WORDS + '/' + word.language;
        //     const cmisName = word.word + '_' + word.partOfSpeech;
        //     // const text = await this.createText(folder, cmisName, word.word)
        //     const text = await this.createWord(folder, cmisName, word)
        //     // const textId = text.succinctProperties["cmis:objectId"]
        //     // const textChangeToken = text.succinctProperties["cmis:changeToken"]
        //     // await this.markAs(textId, textChangeToken, CmisLingoService.WORD_MARKER)
        //     return new Promise<boolean>(resolve => { resolve(true) })
        // } catch (e) {
        //     console.log("Error while saving word: " + e)
        //     return new Promise<boolean>(resolve => { resolve(false) })
        // }
    }
    
    public async saveSemantic(semantic: string):Promise<any> {
        console.log("Saving semantic: " + semantic)
        const folder = CmisLingoService.BASE_FOLDER_SEMANTICS
        
        return this.createDocument(folder, {
            "cmis:objectTypeId": "D:lingo:document",
            "cmis:name": shortid.generate(),
            "lingo:semantic": semantic,
            "cmis:secondaryObjectTypeIds": [CmisLingoService.SEMANTIC_MARKER] 
        });

        // try {
        //     // return new Promise<boolean>(resolve => { resolve(true) })
        // } catch (e) {
        //     console.log("Error while saving semantic: " + e)
        //     return new Promise<boolean>(resolve => { resolve(false) })
        // }

    }

    public async createRelationship(sourceId:string, targetId:string, marker:Array<string>):Promise<any> {
        console.log("Saving relationship ...")
        return this.cmisSession.createRelationship({
            "cmis:sourceId": sourceId,
            "cmis:targetId": targetId,
            "cmis:objectTypeId": "R:lingo:relationship",
            "cmis:secondaryObjectTypeIds": marker 
        })
    }

    private async createText(folder: string, cmisName: string, text: string): Promise<SuccinctCmisObject> {
        try {
            const doc_vn = await this.createDocument(folder, { "cmis:objectTypeId": "D:lingo:text", "cmis:name": cmisName, "lingo:text": text });
            const doc_vn_id = doc_vn.succinctProperties['cmis:objectId']
            const doc_vn_changeToken = doc_vn.succinctProperties['cmis:changeToken']

            return doc_vn;
        } catch (e) {
            console.log("Error while creating text: " + e);
        }
    }
    
    private async createWord(folder: string, cmisName: string, word: CmisWord): Promise<SuccinctCmisObject> {
        return this.createDocument(folder, {
            "cmis:objectTypeId": "D:lingo:document",
            "cmis:name": cmisName,
            "lingo:word": word.word,
            "lingo:part_of_speech": word.partOfSpeech,
            "lingo:language": word.language,
            "cmis:secondaryObjectTypeIds": [CmisLingoService.WORD_MARKER, CmisLingoService.LANGUAGE_MARKER_PREFIX, CmisLingoService.POS_MARKER]
        });
        // try {
        //     const doc_vn = await this.createDocument(folder, {
        //         "cmis:objectTypeId": "D:lingo:document",
        //         "cmis:name": cmisName,
        //         "lingo:word": word.word,
        //         "lingo:part_of_speech": word.partOfSpeech,
        //         "lingo:language": word.language,
        //         "cmis:secondaryObjectTypeIds": [CmisLingoService.WORD_MARKER, CmisLingoService.LANGUAGE_MARKER_PREFIX, CmisLingoService.POS_MARKER]
        //     });
        //     const doc_vn_id = doc_vn.succinctProperties['cmis:objectId']
        //     const doc_vn_changeToken = doc_vn.succinctProperties['cmis:changeToken']

        //     return doc_vn;
        // } catch (e) {
        //     console.log("Error while creating text: " + e);
        // }
    }

    private async createDocument(folderPath: string, input: { 'cmis:name': string, 'cmis:objectTypeId'?: string, [k: string]: string | string[] | number | number[] | Date | Date[] }, content?: string | Blob | Buffer) {
        const folder = await this.cmisSession.getObjectByPath(folderPath);
        const folderId = folder.succinctProperties['cmis:objectId'];
        return this.cmisSession.createDocument(folderId, new Blob(), input);
        // try {
        //     const folder = await this.cmisSession.getObjectByPath(folderPath);
        //     const folderId = folder.succinctProperties['cmis:objectId'];
        //     return await this.cmisSession.createDocument(folderId, new Blob(), input);
        //     return document;
        // }
        // catch (e) {
        //     console.log("Error while creating document: " + e);
        // }
    }

    private async markAs(doc_id: string, doc_changeToken: string, marker_cotid: string) {
        try {
            const data = await this.cmisSession.updateProperties(doc_id,
                { "cmis:secondaryObjectTypeIds": marker_cotid }, {
                    changeToken: doc_changeToken,
                    succinct: true
                })
            return data;
        } catch (e) {
            console.log("Error while marking document: " + e);
        }
    }
}