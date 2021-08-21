import React from "react";

export default function FeedCard({feed}: props) {
    return (<div className="feed-card-box">
        <img src={feed.image} alt={feed.name} />
        <h4>{feed.name}</h4>
        <p>{feed.description}</p>
    </div>)
}