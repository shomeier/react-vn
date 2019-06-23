import * as React from 'react';
import { useState } from 'react';
import { SplitPanel } from '../../panels/generic/SplitPanel';
import { WritableWordQueryTable } from '../../tables/WritableWordQueryTable';
import WritableRelationshipsTable from '../../tables/WritableRelationshipsTable';
import GenericVerticalObjectTable from '../../tables/generic/GenericVerticalObjectTable';

export default function AddWordCompoundPanel() {

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

    return (
        <SplitPanel
            left={<WritableWordQueryTable language='vn' onRowSelect={handleSourceRowSelect} selectedWordCoid={sourceCoid} />}
            center={<WritableRelationshipsTable onRowSelect={handleRelationshipRowSelect} sourceId={sourceCoid} />}
            right={<GenericVerticalObjectTable coid={targetCoid}/>}
        />
    )
}
