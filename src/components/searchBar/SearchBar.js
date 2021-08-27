import React, { useState, useEffect } from "react";
import './SearchBar.css';

export default function SearchBar({filter, text}: props) {
    const [search, setSearch] = useState(text);

    useEffect(() => {
        setSearch(text);
    }, [text])
    return (<form className="search-box">
        <input type="search" value={search} placeholder="Search in name or description" onChange={(e) => {
            setSearch(e.target.value);
            filter(e.target.value);
        }} />
        <div className="search-icon"></div>
    </form>);
}