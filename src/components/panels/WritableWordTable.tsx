import * as React from "react"
import { useState } from "react"
import { useTableState } from "react-table"
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

     // Make a new controllable table state instance
     const state = useTableState({pageCount: 0 })
     console.log("STATE 1: " + JSON.stringify(state[0]));
     const [, setState] = state
     console.log("STATE 2: " + JSON.stringify(state[0]));

    const handleSubmit = () => {
        let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())
        cmisLingoService.saveWord({ partOfSpeech: partOfSpeech, word: word, language: "vn" })
            .then((res) => {
                if (res === true) {
                    setShowForm(false)
                }
                setState(old => ({
                    ...old,
                    filters:{"word":word}
                }));
            }
            )
    }

    return (
        <div>
            <ModalWrapper showState={showState} title="Add a new word">
                <AddWordForm setPartOfSpeech={setPartOfSpeech} setWord={setWord} onSubmit={handleSubmit} />
            </ModalWrapper>
            {console.log("Instanciating writable word table ....")}
            <WordTable query={statement} state={state}/>
            <div className="alignRight">
                <Button onClick={() => { setShowForm(true) }}>Add Word</Button>
            </div>
        </div>
    )
}