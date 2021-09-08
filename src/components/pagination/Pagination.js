import React, {useState, useEffect} from "react";
import './Pagination.css';

const PAGE_SIZES = [5,10,15,25,-1];
const DEFAULT_SIZE = PAGE_SIZES[0];

export default function Pagination({items, sizes, selectedSize, callback}) {
    const [pageSize, setPageSize] = useState(selectedSize || DEFAULT_SIZE);
    const [pageNum, setPageNum] = useState(1);
    const [pages, setPages] = useState([]);

    const { matches } = window.matchMedia('(max-width: 600px)');
    const availablePageSizes = sizes || PAGE_SIZES;

    if ((selectedSize && sizes) && !sizes.includes(selectedSize)) {
        throw new Error(`Page size: ${selectedSize} provided is not a valid page size in the provided sizes`);
    }

    const pageData = (pageNumber, pageSize, total) => {
        let start = (pageNumber - 1) * pageSize;
        let end = Number(start) + Number(pageSize);
        if (pageNumber > (total / pageSize)) {
            //lastpage
            end = total;
        }
        setPageNum(pageNumber);
        callback(items.slice(start, end));
    }

    const resize = (size) => {
        setPageSize(size);
        setPageNum(1);
        pageData(1, size, items.length);
        
    }

    const next = (e) => {
        pageData(pageNum + 1, pageSize, items.length)
    }

    const prev = (e) => {
        pageData(pageNum - 1, pageSize, items.length)
    }

    let buffer = matches ? 4 : 10;

    useEffect(() => {
        let n = Math.ceil(items.length / pageSize);
        let pageNumbers = [];
        for (let i = 1; i <= n; i++) {
            pageNumbers.push(i);
        }
        setPages(pageNumbers);
    }, [pageSize, items.length]);

    return (<div className="pagination-container">
        {Number(pageSize) !== -1 && <div>
            <div className="pagination-pages">
                {pageNum > 1 && buffer < pages.length && <button className="pagination-btn prev-icon" onClick={prev}/>}
                {pages && pages.filter(pg => {
                    if (pg > pageNum) {
                        return pg < (buffer + 1);
                    } else {
                        let res = pageNum - pg;
                        return res < buffer;
                    }
                }).map(pg => <button className={pg === pageNum ? 'pagination-btn current' : 'pagination-btn'} key={pg}
                    onClick={e => pageData(pg, pageSize, items.length)}>{pg}</button >)}
                {(pageNum < pages.length && buffer < pages.length) && <button className="pagination-btn next-icon" onClick={next}/>}
            </div>
            <p className="pagination-current">Showing from {(pageNum - 1) * pageSize + 1} to {(pageNum > (items.length / pageSize)) ? items.length : (pageNum - 1) * Number(pageSize) + Number(pageSize)}</p>
        </div>}
        <select className="pagination-size-selector" onChange={(event) => resize(event.target.value)} value={pageSize}>
            {availablePageSizes.map((size) => <option key={size} value={size}>{size === -1 ? 'All' : size}</option>)}
        </select>
        
    </div>)
}