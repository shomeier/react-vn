import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import GenericeBootstrapCmisTable from '../tables/generic/GenericBootstrapCmisTable';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const statement = "SELECT lingo:text, cmis:name, cmis:secondaryObjectTypeIds FROM lingo:text WHERE ANY cmis:secondaryObjectTypeIds IN ('P:lingo:word') ORDER BY lingo:text";
const products = [{
    succinctProperties: {id: 1},
    name: "Product1",
    price: 120
}, {
    succinctProperties: {id: 2},
    name: "Product2",
    price: 80
}];

const columns = [{
    dataField: 'succinctProperties[cmis:objectId]',
    text: 'Product ID'
}, {
    dataField: 'succinctProperties[lingo:text]',
    text: 'Product Name'
}, {
    dataField: 'succinctProperties[cmis:name]',
    text: 'Product Price'
}];

export function BootstrapWordTable() {
    return (
        <div className="container" style={{ marginTop: 50 }}>
        <GenericeBootstrapCmisTable
        columns={columns}
        statement={statement} />
      </div>
    );
}