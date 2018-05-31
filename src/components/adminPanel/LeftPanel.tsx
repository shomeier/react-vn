import * as React from 'react';
import { Panel, Table } from 'react-bootstrap';

interface Props {
    cmisObjects: any,
};

export const LeftPanel: React.StatelessComponent<Props> = (props: Props) => {

    // const cmisSession = props.cmisSession;
    return (
        <div>
            <Panel>
                <Table striped condensed hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Word</th>
                            <th>Part Of Speech</th>
                        </tr>
                        <tr>
                            <th>1</th>
                            <th>bread</th>
                            <th>noun</th>
                        </tr>
                        <tr>
                            <th>2</th>
                            <th>sweat</th>
                            <th>verb</th>
                        </tr>

                    </thead>
                </Table>
            </Panel>
        </div>
    );
}

export default LeftPanel;