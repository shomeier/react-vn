import * as React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTableState, HeaderColumn, Cell} from "react-table";
import { CmisLingoService } from "../cmis/CmisLingoService";
import { CmisSessionWrapper } from "../cmis/CmisSessionWrapper";
import { AddWordForm } from "../forms/AddWordForm";
import { ModalWrapper } from "../ModalWrapper";
import { GenericCmisQueryTable } from "./generic/GenericCmisQueryTable";
import { Input } from "./generic/Styles";
import JsonTree from "react-json-tree";

interface Props {
    language: string;
    handleCellClick: any
}

// const statement = "SELECT t.lingo:text, t.cmis:name FROM lingo:text AS t JOIN lingo:word AS w ON t.cmis:objectId = w.cmis:objectId  ORDER BY lingo:text";
// const statement = "SELECT lingo:text, lingo:part_of_speech, cmis:name, cmis:secondaryObjectTypeIds FROM lingo:text WHERE ANY cmis:secondaryObjectTypeIds IN ('P:lingo:word') ORDER BY lingo:text";
const statement = "SELECT lingo:text, P.lingo:part_of_speech, cmis:name, cmis:secondaryObjectTypeIds FROM lingo:text AS T JOIN lingo:part_of_speech AS P ON T.cmis:objectId = P.cmis:objectId WHERE ANY cmis:secondaryObjectTypeIds IN ('P:lingo:word') ORDER BY lingo:text";

export function WritableWordQueryTable(props:Props) {

    const showState = useState(false)
    const [showForm, setShowForm] = showState

    const [partOfSpeech, setPartOfSpeech] = useState()
    const [word, setWord] = useState()

     // Make a new controllable table state instance
     const state = useTableState({pageCount: 0 })
     const [, setState] = state

    const handleSubmit = () => {
        let cmisLingoService = new CmisLingoService(CmisSessionWrapper.getInstance())
        cmisLingoService.saveWord({ partOfSpeech: partOfSpeech, word: word, language: props.language })
            .then((res) => {
                if (res === true) {
                    setShowForm(false)
                }
                setState(old => ({
                    ...old,
                    filters:{"lingo:text":word}
                }));
            }
            )
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
            },
            Cell: (cell) => {
                let index = cell.row.index
                let cellData = cell.data[index].succinctProperties[cell.column.id]
                let cellCoid = cell.data[index].succinctProperties["cmis:objectId"]
                return (
                    <span onClick={() => {
                        props.handleCellClick(cell)
                        console.log("Clicked Cell...")
                        console.log("Index: " + index)
                        console.log("Cell Data COID: " + cellCoid)
                    }}>
                        {cellData}
                     {/* <JsonTree data={cell}/> */}
                    </span>
                )
            }
        },
        {
            Header: "Part of Speech",
            id: "part_of_speech",
            accessor: w => w.succinctProperties['lingo:part_of_speech'],
            minWidth: 150,
            maxWidth: 200
        },
        {
            Header: "Functions",
            id: "functions",
            minWidth: 150,
            maxWidth: 200,
            Cell: (cell) => {
                return (
                    <span style={{display: 'flex'}}>
                        <Button>Details</Button>
                    </span>
                )
            }
        }
    ];

    return (
        <div>
            <ModalWrapper showState={showState} title="Add a new word">
                <AddWordForm setPartOfSpeech={setPartOfSpeech} setWord={setWord} onSubmit={handleSubmit} />
            </ModalWrapper>
            {console.log("Instantiating writable word table ....")}
            <GenericCmisQueryTable statement={statement} state={state} columns={columns}/>
            <div className="alignRight">
                <Button onClick={() => { setShowForm(true) }}>Add Word</Button>
            </div>
        </div>
    )
}