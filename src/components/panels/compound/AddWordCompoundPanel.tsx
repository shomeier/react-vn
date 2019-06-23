import * as React from 'react';
import { useState } from 'react';
import { SplitPanel } from '../../panels/generic/SplitPanel';
import { WritableWordQueryTable } from '../../tables/WritableWordQueryTable';
import WritableRelationshipsTable from '../../tables/WritableRelationshipsTable';
import GenericVerticalObjectTable from '../../tables/generic/GenericVerticalObjectTable';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { CmisLingoService } from '../../cmis/CmisLingoService';

export default function AddWordCompoundPanel() {

    const [language, setLanguage] = useState('vn')
    const [sourceCoid, setSourceCoid] = useState()
    const [targetCoid, setTargetCoid] = useState()

    const handleSourceRowSelect = (row) => {
        let index = row.index
        let coid = row.original.succinctProperties["cmis:objectId"]
        setSourceCoid(coid)
    }

    const handleRelationshipRowSelect = (row) => {
        let coid = row.original.succinctProperties["cmis:targetId"]
        setTargetCoid(coid)
    }

    const handleLanguageSelect = (language) => {
        setLanguage(language)
    }

    let top =
        <DropdownButton
            title="Source Language"
            variant="primary"
            id="source_language"
            key="primary">
            <Dropdown.Item
                eventKey={CmisLingoService.LANGUAGE_VN}
                onSelect={(e) => { handleLanguageSelect(e) }}>
                Vietnamese
            </Dropdown.Item>
            <Dropdown.Item
                eventKey={CmisLingoService.LANGUAGE_EN}
                onSelect={(e) => { handleLanguageSelect(e) }}>
                English
            </Dropdown.Item>
        </DropdownButton>
    return (
            <SplitPanel
                top={top}
                left={<WritableWordQueryTable language={language} onRowSelect={handleSourceRowSelect} selectedWordCoid={sourceCoid} />}
                center={<WritableRelationshipsTable onRowSelect={handleRelationshipRowSelect} sourceId={sourceCoid} />}
                right={<GenericVerticalObjectTable coid={targetCoid} />}
            />
    )
}
