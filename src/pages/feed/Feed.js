import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router";
import FeedCard from "../../components/feedCard/FeedCard";
import SearchBar from "../../components/searchBar/SearchBar";
import SortBy from "../../components/sortBy/SortBy";
import Table from "../../components/table/Table";
import { sortByCol, searchOn, parseQueryString, genQueryString } from '../../utils/utils';
import { feeds } from '../../utils/data';

import './Feed.css';

const columnSequence = ['name', 'dateLastEdited', 'image', 'description'];
const sortOptions = ['name', 'dateLastEdited'];
const defaultSort = sortOptions[0];

const displayHeaderMap = {
  dateLastEdited: 'Last Edited'
}

export default function Feed() {
    let location = useLocation();
    let history = useHistory();
    const [sortCol, setSortCol] = useState(defaultSort);
    const [searchText, setSearchText] = useState('');
    const [filteredFeed, setFilteredFeed] = useState([]);

    const changeSort = useCallback((sortBy) => {
      if (sortBy !== sortCol) {
        setSortCol(sortBy);
        setFilteredFeed(sortByCol(filteredFeed, sortBy));
        const currentFilters = [{ key: 'sortBy', value: sortBy}];

        if (searchText) {
          currentFilters.push({ key: 'search', value: searchText});
        }
        history.push(genQueryString(currentFilters));
      }
    });

    const search = useCallback((text) => {
      if (text !== searchText) {
        setSearchText(text);
        const currentFilters = [{ key: 'search', value: text}];

        if (sortCol) {
          currentFilters.push({ key: 'sortBy', value: sortCol});
        }
        history.push(genQueryString(currentFilters));
      }
    });

    useEffect(() => {
      if (location.search) {
        const filtrMap = parseQueryString(location.search);
      
        if (filtrMap['sortBy']) {
          const sortBy = filtrMap['sortBy'];
          if (sortOptions.includes(sortBy)) {
            changeSort(sortBy);
          }
        }

        if (filtrMap['search']) {
          const searchQuery = filtrMap['search'];
          search(searchQuery);
        }
      }
    }, [location.search, changeSort, search]);
    
    useEffect(() => {
      let filtered = searchText ? searchOn(searchText, feeds) : feeds;
      
      if (filtered) {
        filtered = sortByCol(filtered, sortCol);
      }
      setFilteredFeed(filtered || []);
    }, [searchText, setFilteredFeed, sortCol]);

    return (<div className="page-container">
        <h1>Feeds</h1>
        <div className="filter-box">
            <SearchBar filter={search} text={searchText} />
            <SortBy options={sortOptions} selected={sortCol} onSelect={changeSort} displayHeaderMap={displayHeaderMap} />
        </div>
        <div className="results-container">
        {filteredFeed.length > 0 && <div className="results-info">{filteredFeed.length} feeds found</div>}
          <div className="feed-grid-container">
              {filteredFeed.length > 0 && filteredFeed.map(feed => <FeedCard key={feed.name} feed={feed} />)}
          </div>

          {filteredFeed.length > 0 && <div className="feed-table-container">
            <Table colOrderSeq={columnSequence} data={filteredFeed} sortCol={sortCol} displayHeaderMap={displayHeaderMap} />
          </div>}
          {filteredFeed.length === 0 && <div className="message-info">No feeds found for the search conditions</div>}
        </div>
    </div>);
}