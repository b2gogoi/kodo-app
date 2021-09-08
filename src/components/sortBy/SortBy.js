import React, { useState, useEffect } from "react";
import "./SortBy.css";

export default function SortBy({ options, selected, onSelect, displayHeaderMap}) {
    const [sortBy, setSortBy] = useState(selected || options[0]);

    const changeSort = (value) => {
        setSortBy(value);
        onSelect(value);
    }

    useEffect(() => {
        setSortBy(selected);
    }, [selected]);

    return (<select className="sort-selector" onChange={(event) => changeSort(event.target.value)} value={sortBy}>
        {options.map((opt) => <option key={opt} value={opt}>
            {displayHeaderMap[opt] ? displayHeaderMap[opt] : opt.replace(/([A-Z])/g, ' $1')}
        </option>)}
    </select>);
}