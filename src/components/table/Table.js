import React from "react";
import { format } from '../../utils/utils';
import './Table.css';

export default function Table({data, colOrderSeq}: props) {

    return (<div className="table-container">
        <div className="table-headers-row">
            {colOrderSeq.map((col, i) => <div key={col} className={`column-${i}`}>{col.toUpperCase()}</div>)}
        </div>
        <div className="table-body-container">
            {data.map((row, i) => <div key={`${row.name}-${i}`} className="table-row">
                {colOrderSeq.map((col, i) => <div key={`${col}-${i}`} className={`column-${i}`}>{col !== 'dateLastEdited' ? row[col] : format(row[col])}</div>)}
            </div>)}
        </div>
    </div>)
}