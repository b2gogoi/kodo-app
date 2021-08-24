import React, { useState, useEffect } from "react";
import './Table.css';

const format = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-IN', options).format(new Date(dateString));
}

const sortByCol = (data, column) => {
    let sorted = data;
    switch (column) {
        case 'name':
            sorted = data.sort((a, b) => {
                return a[column].toLowerCase().localeCompare(b[column].toLowerCase());
            });
            break;
        case 'dateLastEdited':
            sorted = data.sort((a, b) => {
                return (new Date(b.dateLastEdited)).getTime() - (new Date(a.dateLastEdited)).getTime();
            });
            console.log(sorted.map(s => format(s.dateLastEdited)));
            break;
        default:
            break;
    }
    return sorted;
}

export default function Table({data, colOrderSeq, sortCol}: props) {
    const [ sortedData, setSortedData ] = useState([]);

    useEffect(() => {
        setSortedData(sortByCol(data, sortCol));
    }, [data, sortCol]);

    return (<div className="table-container">
        <div className="table-headers-row">
            {colOrderSeq.map((col, i) => <div key={col} className={`column-${i}`}>{col.toUpperCase()}</div>)}
        </div>
        <div className="table-body-container">
            {sortedData.map((row, i) => <div key={`${row.name}-${i}`} className="table-row">
                {colOrderSeq.map((col, i) => <div key={`${col}-${i}`} className={`column-${i}`}>{col !== 'dateLastEdited' ? row[col] : format(row[col])}</div>)}
            </div>)}
        </div>
    </div>)
}