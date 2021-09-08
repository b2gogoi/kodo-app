import React, {useState, useEffect} from "react";
import Pagination from '../pagination/Pagination';
import { format } from '../../utils/utils';
import './Table.css';

export default function Table({data, colOrderSeq, sortCol, displayHeaderMap}) {
    const [allData, setAllData] = useState(data);
    const [pageData, setPageData] = useState(data);

    useEffect(() => {
        setAllData(data);
    }, [data])
    return (<>
    <Pagination items={allData} callback={setPageData} />
    <div className="table-container">
        <div className="table-grid-header-container">
            {colOrderSeq.map((col, i) => <div key={col} className={sortCol === col ? `sorted column-headers-${col}` : `column-headers-${col}`}>
                {displayHeaderMap[col] ? displayHeaderMap[col] : col.replace(/([A-Z])/g, ' $1')}
            </div>)}
        </div>
        <div className="table-grid-container">
            {pageData.map((row, i) => {
                return colOrderSeq.map((col, i) => <div key={`${col}-${i}`} className={`column-data-${col}`}>
                    {col === 'image' ? 
                        <img src={row[col]} alt={row.name} />
                        : col !== 'dateLastEdited' ? row[col] : format(row[col])}
                </div>);
            })}
        </div>
    </div>
    </>)
}