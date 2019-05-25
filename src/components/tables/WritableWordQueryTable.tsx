import * as React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTableState, HeaderColumn, Cell } from "react-table";
import { CmisLingoService } from "../cmis/CmisLingoService";
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import { AddWordForm } from "../forms/AddWordForm";
import { ModalWrapper } from "../ModalWrapper";
import { GenericCmisQueryTable } from "./generic/GenericCmisQueryTable";
import GenericVerticalObjectTable from "./generic/GenericVerticalObjectTable";
import { Input } from "./generic/Styles";
import JsonTree from "react-json-tree";

interface Props {
    language: string;
    onRowSelect?: any,
    selectedWordCoid?: string
}

// const statement = "SELECT t.lingo:text, t.cmis:name FROM lingo:text AS t JOIN lingo:word AS w ON t.cmis:objectId = w.cmis:objectId  ORDER BY lingo:text";
// const statement = "SELECT lingo:text, lingo:part_of_speech, cmis:name, cmis:secondaryObjectTypeIds FROM lingo:text WHERE ANY cmis:secondaryObjectTypeIds IN ('P:lingo:word') ORDER BY lingo:text";
const statement = "SELECT lingo:text, P.lingo:part_of_speech, cmis:name, cmis:secondaryObjectTypeIds FROM lingo:text AS T JOIN lingo:part_of_speech AS P ON T.cmis:objectId = P.cmis:objectId WHERE ANY cmis:secondaryObjectTypeIds IN ('P:lingo:word') ORDER BY lingo:text";

export function WritableWordQueryTable(props: Props) {

    const showAddWordState = useState(false)
    const [showAddWordForm, setShowAddWordForm] = showAddWordState
    const showWordDetailsState = useState(false)
    const [showWordDetailsForm, setShowWordDetailsForm] = showWordDetailsState

    const [partOfSpeech, setPartOfSpeech] = useState()
    const [word, setWord] = useState()
    const [filters, setFilters] = useState({})

    const handleSubmit = () => {
        let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())
        cmisLingoService.saveWord({ partOfSpeech: partOfSpeech, word: word, language: props.language })
            .then((res) => {
                if (res === true) {
                    setShowAddWordForm(false)
                }
                setFilters({ "lingo:text": word })
            })
    }

    const columns = [
        {
            Header: "Word",
            id: "lingo:text",
            accessor: w => w.succinctProperties['lingo:text'],
            minWidth: 200,
            maxWidth: 250,
            Filter: (header) => {
                return (
                    <div>
                        <Input
                            placeholder='Search...'
                            value={header.filterValue || ""}
                            onChange={e => header.setFilter(e.target.value)}
                        />
                        {/* <JsonTree data={header}/> */}
                    </div>
                );
            }
        },
        {
            Header: "Part of Speech",
            id: "part_of_speech",
            accessor: w => w.succinctProperties['lingo:part_of_speech'],
            minWidth: 150,
            maxWidth: 200
        }
    ];

    return (
        <div>
            <ModalWrapper showState={showAddWordState} title="Add a new word">
                <AddWordForm setPartOfSpeech={setPartOfSpeech} setWord={setWord} onSubmit={handleSubmit} />
            </ModalWrapper>
            <ModalWrapper showState={showWordDetailsState} title="Details">
                <GenericVerticalObjectTable coid={props.selectedWordCoid} />
            </ModalWrapper>
            {console.log("Instantiating writable word table ....")}
            <GenericCmisQueryTable statement={statement} filters={filters} onRowSelect={props.onRowSelect} columns={columns} />
            <div className="alignRight">
                <Button onClick={() => { setShowAddWordForm(true) }}>Add Word</Button>
            </div>
            <div className="alignRight">
                <Button onClick={() => { setShowWordDetailsForm(true) }}>Details</Button>
            </div>
        </div>
    )
}