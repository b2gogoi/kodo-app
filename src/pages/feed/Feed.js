import React from "react";
import FeedCard from "../../components/feedCard/FeedCard";
import SearchBar from "../../components/searchBar/SearchBar";
import SortBy from "../../components/sortBy/SortBy";

import './Feed.css';

const sortOptions = ['name', 'lastEdit'];

const defaultSort = sortOptions[0];

const changeSort = (sortBy) => {
  console.log('sortBy', sortBy);
}

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
      },
      {
        "name": "Regional Configuration Designer",
        "image": "http://lorempixel.com/640/480",
        "description": "Rerum voluptatibus deleniti. Et quo ea magnam quisquam aliquam sequi sed praesentium. Similique est maiores. Tempora sed ad dolores error deserunt possimus sed perferendis molestiae. Doloribus fuga velit ipsum voluptatem ut ducimus.",
        "dateLastEdited": "2018-07-27T21:33:53.485Z"
      },
      {
        "name": "District Metrics Executive",
        "image": "http://lorempixel.com/640/480",
        "description": "Odit repudiandae et nemo voluptas quae. Voluptatibus inventore iure deserunt aliquid qui esse. Impedit molestias ea sed. Neque perspiciatis excepturi odit. Quibusdam facere dolor. Adipisci recusandae recusandae.",
        "dateLastEdited": "2018-07-14T21:01:42.717Z"
      },
      {
        "name": "International Brand Analyst",
        "image": "http://lorempixel.com/640/480",
        "description": "Fuga cupiditate dolorum eos. Quia vel et eos qui tempora. Et et et et alias at suscipit. Corporis eum nostrum recusandae similique rerum sit perferendis ut. Qui excepturi laborum est et fugit laborum.",
        "dateLastEdited": "2018-04-18T08:53:42.053Z"
      },
      {
        "name": "Human Factors Analyst",
        "image": "http://lorempixel.com/640/480",
        "description": "Quis eos in repudiandae. Dicta dolore rerum unde sapiente. Consequatur ea rerum non alias et sapiente dolore aliquid. Eius quia delectus porro id non voluptas.",
        "dateLastEdited": "2018-07-27T05:58:52.006Z"
      },];
    return (<>
        <h1>Feed</h1>
        <div className="filter-box">
            <SearchBar />
            <SortBy options={sortOptions} selected={defaultSort} onSelect={changeSort} />
        </div>

        <div className="feed-grid-container">
            {feeds.length > 0 && feeds.map(feed => <FeedCard key={feed.name} feed={feed} />)}
        </div>

        <div className="feed-table-container">

        </div>
    </>);
}