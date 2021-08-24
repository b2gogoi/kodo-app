import React, { useState } from "react";

export default function SortBy({ options, selected, onSelect}: props) {
    const [sortBy, setSortBy] = useState(selected || options[0]);

    const changeSort = (value) => {
        setSortBy(value);
        onSelect(value);
    }

    return (<select onChange={(event) => changeSort(event.target.value)} value={sortBy}>
        {options.map((opt) => <option key={opt}>{opt}</option>)}
    </select>);
}