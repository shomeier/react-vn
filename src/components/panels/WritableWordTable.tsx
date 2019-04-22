import * as React from "react"
import { useState } from "react"
import { WordTable } from "./WordTable"
import { ModalWrapper } from "../ModalWrapper";
import { Button } from "react-bootstrap";
import { AddWordForm } from "../forms/AddWordForm";
import { CmisLingoService } from "../cmis/CmisLingoService";
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import { Input } from "../tables/Styles";

const query = "SELECT lingo:text, cmis:name from lingo:text ORDER BY lingo:text";

export function WritableWordTable() {

    const showState = useState(false)
    const [showForm, setShowForm] = showState

    const [partOfSpeech, setPartOfSpeech] = useState()
    const [word, setWord] = useState()
    const [statement, setStatement] = useState(query)
    const [filter, setFilter] = useState({})

    const handleSubmit = () => {
        console.log("partOfSpeech: " + partOfSpeech)
        let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())
        cmisLingoService.saveWord({ partOfSpeech: partOfSpeech, word: word, language: "vn" })
            .then((res) => {
                if (res === true) {
                    setShowForm(false)
                }
                // setStatement("SELECT lingo:text, cmis:name from lingo:text WHERE lingo:text='" + word + "' ORDER BY lingo:text ")
                setFilter({"word":word})
            }
            )
    }

    return (
        <div>
            <ModalWrapper showState={showState} title="Add a new word">
                <AddWordForm setPartOfSpeech={setPartOfSpeech} setWord={setWord} onSubmit={handleSubmit} />
            </ModalWrapper>
            {console.log("Instanciating writable word table ....")}
            <WordTable query={statement} filter={filter} />
            <div className="alignRight">
                <Button onClick={() => { setShowForm(true) }}>Add Word</Button>
            </div>
        </div>
    )
}