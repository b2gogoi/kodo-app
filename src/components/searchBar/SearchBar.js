import React, { useState } from "react";

export default function SearchBar({filter, text}: props) {
    const [search, setSearch] = useState(text);
    return (<input type="text" value={search} onChange={(e) => {
        setSearch(e.target.value);
        filter(e.target.value);
    }} />);
}