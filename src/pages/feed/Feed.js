import React, { useState, useEffect } from "react";
import FeedCard from "../../components/feedCard/FeedCard";
import SearchBar from "../../components/searchBar/SearchBar";
import SortBy from "../../components/sortBy/SortBy";
import Table from "../../components/table/Table";
import { sortByCol } from '../../utils/utils';
import { feeds } from '../../utils/data';

import './Feed.css';

const columnSequence = ['name', 'dateLastEdited'/* , 'description' */];
const sortOptions = ['name', 'dateLastEdited'];
const defaultSort = sortOptions[0];

export default function Feed() {
    const [sortCol, setSortCol] = useState(defaultSort);
    const [searchText, setSearchText] = useState('');
    const [filteredFeed, setFilteredFeed] = useState([]);

    const changeSort = (sortBy) => {
      console.log('changeSort', sortBy);
      setSortCol(sortBy);
      setFilteredFeed(sortByCol(filteredFeed, sortBy));
    }

    const search = (text) => {
      setSearchText(text);
    }
    
    useEffect(() => {
      const filtered = searchText ? feeds.filter(feed => feed.name.toLowerCase().includes(searchText.toLowerCase())) : feeds;
      setFilteredFeed(sortByCol(filtered, sortCol));
    }, [searchText, setFilteredFeed, sortCol]);

    return (<>
        <h1>Feed</h1>
        <div className="filter-box">
            <SearchBar filter={search} text={searchText} />
            <SortBy options={sortOptions} selected={sortCol} onSelect={changeSort} />
        </div>

        <div className="feed-grid-container">
            {filteredFeed.length > 0 && filteredFeed.map(feed => <FeedCard key={feed.name} feed={feed} />)}
        </div>

        <div className="feed-table-container">
          <Table colOrderSeq={columnSequence} data={filteredFeed} />
        </div>
    </>);
}