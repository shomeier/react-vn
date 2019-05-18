import { CmisSessionWrapper } from "./CmisSessionWrapper"
import { CmisWord } from "./model/CmisLingoModel"
import { cmis } from "../../lib/cmis";
import { SuccinctCmisObject } from "./model/CmisSpecModel";

export class CmisLingoService {

    private static readonly BASE_FOLDER = '/lingo'
    private static readonly BASE_FOLDER_WORDS = CmisLingoService.BASE_FOLDER + '/words'
    private static readonly BASE_FOLDER_SEMANTICS = CmisLingoService.BASE_FOLDER + '/semantics'

    private static readonly WORD_MARKER = "P:lingo:word";

    private sessionWrapper: CmisSessionWrapper
    private cmisSession: cmis.CmisSession

    constructor(sessionWrapper: CmisSessionWrapper) {
        this.sessionWrapper = sessionWrapper
        this.cmisSession = sessionWrapper.getWrappedSession();
    }

    public async saveWord(word: CmisWord):Promise<boolean> {
        
        console.log("Saving word: " + JSON.stringify(word))
        try {
            const folder = CmisLingoService.BASE_FOLDER_WORDS + '/' + word.language;
            const cmisName = word.word + '_' + word.partOfSpeech;
            // const text = await this.createText(folder, cmisName, word.word)
            const text = await this.createWord(folder, cmisName, word.word)
            // const textId = text.succinctProperties["cmis:objectId"]
            // const textChangeToken = text.succinctProperties["cmis:changeToken"]
            // await this.markAs(textId, textChangeToken, CmisLingoService.WORD_MARKER)
            return new Promise<boolean>(resolve => { resolve(true) })
        } catch (e) {
            console.log("Error while saving word: " + e)
            return new Promise<boolean>(resolve => { resolve(false) })
        }
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
    
    private async createWord(folder: string, cmisName: string, text: string): Promise<SuccinctCmisObject> {
        try {
            const doc_vn = await this.createDocument(folder, { "cmis:objectTypeId": "D:lingo:text", "cmis:name": cmisName, "lingo:text": text, "cmis:secondaryObjectTypeIds": CmisLingoService.WORD_MARKER });
            const doc_vn_id = doc_vn.succinctProperties['cmis:objectId']
            const doc_vn_changeToken = doc_vn.succinctProperties['cmis:changeToken']

            return doc_vn;
        } catch (e) {
            console.log("Error while creating text: " + e);
        }
    }

    private async createDocument(folderPath: string, input: { 'cmis:name': string, 'cmis:objectTypeId'?: string, [k: string]: string | string[] | number | number[] | Date | Date[] }, content?: string | Blob | Buffer) {
        try {
            const folder = await this.cmisSession.getObjectByPath(folderPath);
            const folderId = folder.succinctProperties['cmis:objectId'];
            const document = await this.cmisSession.createDocument(folderId, content, input);
            return document;
        }
        catch (e) {
            console.log("Error while creating document: " + e);
        }
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