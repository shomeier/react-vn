import * as React from "react"
import {useState} from "react"
import {Modal} from "react-bootstrap"

interface Props {
    showState:any
    title:string
    children?:any
}

export function ModalWrapper(props:Props) {

    const [show, setShow] = props.showState;

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="contained-modal-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">
                    <strong>{props.title}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {props.children}
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
                <Button type="submit" onClick={this.handleSaveWord}>Save Word</Button>
            </Modal.Footer> */}
        </Modal>
    );
}