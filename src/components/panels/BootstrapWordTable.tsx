import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const products = [{
    id: 1,
    name: "Product1",
    price: 120
}, {
    id: 2,
    name: "Product2",
    price: 80
}];

const columns = [{
    dataField: 'id',
    text: 'Product ID'
}, {
    dataField: 'name',
    text: 'Product Name'
}, {
    dataField: 'price',
    text: 'Product Price'
}];

export function BootstrapWordTable() {
    return (
        <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable 
        striped
        hover
        keyField='id' 
        data={ products } 
        columns={ columns } />
      </div>
    );
}