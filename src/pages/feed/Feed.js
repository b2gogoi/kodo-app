import React from "react";
import FeedCard from "../../components/feedCard/FeedCard";
import SearchBar from "../../components/searchBar/SearchBar";
import SortBy from "../../components/sortBy/SortBy";

export default function Feed() {
    const feeds = [{
        "name": "Customer Assurance Liaison",
        "image": "http://lorempixel.com/640/480",
        "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.",
        "dateLastEdited": "2018-05-19T12:33:25.545Z"
      },
      {
        "name": "Dynamic Infrastructure Designer",
        "image": "http://lorempixel.com/640/480",
        "description": "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.",
        "dateLastEdited": "2017-11-28T04:59:13.759Z"
      },];
    return (<>
        <h1>Feed</h1>
        <div className="filter-box">
            <SearchBar />
            <SortBy />
        </div>

        <div className="feed-grid-container">
            {feeds.length > 0 && feeds.map(feed => <FeedCard feed={feed} />)}
        </div>

        <div className="feed-table-container">

        </div>
    </>);
}