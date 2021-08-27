import React from "react";
import { format } from '../../utils/utils';
import './Table.css';

export default function Table({data, colOrderSeq, sortCol}: props) {

    return (<div className="table-container">
        <div className="table-headers-row">
            {colOrderSeq.map((col, i) => <div key={col} className={sortCol === col ? `sorted column-${col}` : `column-${col}`}>{col.replace(/([A-Z])/g, ' $1')}</div>)}
        </div>
        <div className="table-body-container">
            {data.map((row, i) => <div key={`${row.name}-${i}`} className="table-row">
                {colOrderSeq.map((col, i) => <div key={`${col}-${i}`} className={`column-${col}`}>
                    {col === 'image' ? 
                        <img src={row[col]} alt={row.name} />
                        : col !== 'dateLastEdited' ? row[col] : format(row[col])}
                </div>)}
            </div>)}
        </div>
    </div>)
}