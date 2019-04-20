import * as React from "react"
import { useState } from "react"
import { WordTable } from "./WordTable"
import { ModalWrapper } from "../ModalWrapper";
import { Button } from "react-bootstrap";
import { AddWordForm } from "../forms/AddWordForm";

export function WritableWordTable() {

    const showState = useState(false)
    const[showForm, setShowForm] = showState

    return (
        <div>
            <ModalWrapper showState={showState} title="Add a new word">
                <AddWordForm/>
            </ModalWrapper>
            <WordTable/>
            <div className="alignRight">
                <Button onClick={() => {setShowForm(true)}}>Add Word</Button>
            </div>
        </div>
    )
}