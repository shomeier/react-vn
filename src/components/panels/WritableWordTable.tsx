import * as React from "react"
import { useState } from "react"
import { WordTable } from "./WordTable"
import { ModalWrapper } from "../ModalWrapper";
import { Button } from "react-bootstrap";
import { AddWordForm } from "../forms/AddWordForm";
import { CmisLingoService } from "../cmis/CmisLingoService";
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";

const query = "SELECT lingo:text, cmis:name from lingo:text ORDER BY lingo:text";

export function WritableWordTable() {

    const showState = useState(false)
    const[showForm, setShowForm] = showState

    const [partOfSpeech, setPartOfSpeech] = useState()
    const [word, setWord] = useState()

    const handleSubmit = () => {
        console.log("partOfSpeech: " + partOfSpeech)
        let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())
        cmisLingoService.saveWord({partOfSpeech:partOfSpeech, word:word, language: "vn"})
        .then(res => {if(res === true) {setShowForm(false)}})
    }

    return (
        <div>
            <ModalWrapper showState={showState} title="Add a new word">
                <AddWordForm setPartOfSpeech={setPartOfSpeech} setWord={setWord} onSubmit={handleSubmit}/>
            </ModalWrapper>
            <WordTable statement={query}/>
            <div className="alignRight">
                <Button onClick={() => {setShowForm(true)}}>Add Word</Button>
            </div>
        </div>
    )
}