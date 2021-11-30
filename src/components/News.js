import React from 'react'
import { MdDateRange } from "react-icons/md";
export default function News({ NewsTitle, Newsdescription, NewsImg, Timing, Newslink, author, source }) {
    return (
        <>
            <div className="card my-2 mx-2 position-relative" style={{ width: "300px", height: "max-content" }}>
                <span className="position-absolute start-100 top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: "1"}}>
                    {source}
                </span>
                <img src={NewsImg} style={{ width: "250px", objectFit: "contain", height: "170px" }} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{NewsTitle}</h5>
                    <p className="card-text">{Newsdescription}</p>
                    <p className="card-text text-muted"><MdDateRange />&nbsp;By {author} on {new Date(Timing).toLocaleDateString()}</p>
                    <a href={Newslink} target="_blank" rel="noreferrer" className="btn btn-primary">Read full news</a>
                </div>
            </div>
        </> 
    )
}
