import React, { useState, useEffect } from "react";

export default function SortBy({ options, selected, onSelect}: props) {
    const [sortBy, setSortBy] = useState(selected || options[0]);

    console.log('selected: ', selected);

    const changeSort = (value) => {
        setSortBy(value);
        onSelect(value);
    }

    useEffect(() => {
        setSortBy(selected);
    }, [selected]);

    return (<select onChange={(event) => changeSort(event.target.value)} value={sortBy}>
        {options.map((opt) => <option key={opt}>{opt}</option>)}
    </select>);
}