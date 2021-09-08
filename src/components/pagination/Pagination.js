import React, {useState, useEffect} from "react";
import './Pagination.css';

const PAGE_SIZES = [5,10,15,25,-1];
const DEFAULT_SIZE = PAGE_SIZES[0];

export default function Pagination({items, sizes, selectedSize, options, callback}) {
    const [pageSize, setPageSize] = useState(selectedSize || DEFAULT_SIZE);
    const [pageNum, setPageNum] = useState(1);
    const [pages, setPages] = useState([]);

    const availablePageSizes = sizes || PAGE_SIZES;

    if ((selectedSize && sizes) && !sizes.includes(selectedSize)) {
        throw new Error(`Page size: ${selectedSize} provided is not a valid page size in the provided sizes`);
    }

    const pageData = (pageNumber, pageSize, total) => {
        let start = (pageNumber - 1) * pageSize;
        console.log(`Page start: ${start}`);
        let end = Number(start) + Number(pageSize);
        console.log(`Page end: ${end}`);
        if (pageNumber > (total / pageSize)) {
            //lastpage
            end = total;
            console.log(`lastpage end: ${end}`);
        }
        setPageNum(pageNumber);
        callback(items.slice(start, end));
    }

    const resize = (size) => {
        console.log(`Page size changed to: ${size}`);
        setPageSize(size);
        setPageNum(1);
        pageData(1, size, items.length);
        
    }

    useEffect(() => {
        let n = Math.ceil(items.length / pageSize);
        let pageNumbers = [];
        for (let i = 1; i <= n; i++) {
            pageNumbers.push(i);
        }
        setPages(pageNumbers);
    }, [pageSize, items]);


    return (<div className="pagination-container">
        <div>
            <div className="pagination-pages">
                {pages && pages.map(pg => <button className={pg === pageNum ? 'pagination-btn current' : 'pagination-btn'} key={pg} 
                    onClick={e => pageData(pg, pageSize, items.length)}>{pg}</button >)}
            </div>
            {Number(pageSize) !== -1 && <p className="pagination-current">Showing from {(pageNum - 1) * pageSize + 1} to {(pageNum > (items.length / pageSize)) ? items.length : (pageNum - 1) * Number(pageSize) + Number(pageSize)}</p>}
        </div>
        <select className="pagination-size-selector" onChange={(event) => resize(event.target.value)} value={pageSize}>
            {availablePageSizes.map((size) => <option key={size} value={size}>{size === -1 ? 'All' : size}</option>)}
        </select>
        
    </div>)
}