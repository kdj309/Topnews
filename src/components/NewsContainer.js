import React, { useState, useEffect } from 'react'
import News from './News';
import loader from '../resources/ajax-loader.gif'
import Navbar from './Navbar';
import InfiniteScroll from "react-infinite-scroll-component";
export default function NewsContainer({ country, pagesize, category }) {
    const [news, setnews] = useState([]);
    const [page, setpage] = useState(1)
    const [totalsize, setTotalsize] = useState(0)
    async function fetchnews() {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&sortBy=popularity&pageSize=${pagesize}&page=${page}&category=${category}&apiKey=2db029cc1b6f45bca42a63663a84c153`);
        const newsdata = await response.json()
        setTotalsize(newsdata.totalResults)
        setnews(newsdata.articles)
    }
    function capatalize(str) {
        return str.split(' ').map((char) => {
            return char[0].toUpperCase() + char.slice(1)
        }).join(' ')
    }
    async function fetchMoreData() {
        setpage(page+1)
        //currentpage=currentpage+currentpage
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&sortBy=popularity&pageSize=${pagesize}&page=${page}&category=${category}&apiKey=2db029cc1b6f45bca42a63663a84c153`);
        const newsdata = await response.json()
        setTotalsize(newsdata.totalResults)
        setnews(news.concat(newsdata.articles))
      
        console.log(news)
        //setnews(newsdata.articles)
    }
    useEffect(() => {
        document.title = `Top-News | ${capatalize(category)}`
        fetchnews()

    }, [])

    return (
        <>
            <Navbar />
            <h4 className="display-3 my-2 text-center">Top {capatalize(category)} News</h4>
            <InfiniteScroll
                dataLength={news.length}
                next={fetchMoreData}
                hasMore={news.length!==totalsize}
                loader={<img src={loader} width="30" alt="loading..." className="mx-auto"></img>}
            >
                <div className="my-3 container d-flex flex-row justify-content-between align-items-center flex-wrap border border-primary pd-3">
                    {

                        news.length > 2 ? news.map((newsdata, index) => {
                            return <News key={index + 1} NewsTitle={newsdata.title ? newsdata.title.slice(0, 50) + "..." : ""} Newsdescription={newsdata.description ? newsdata.description.slice(0, 128) + "..." : ""} NewsImg={newsdata.urlToImage ? newsdata.urlToImage : 'https://image.shutterstock.com/image-vector/breaking-news-background-world-global-260nw-719766118.jpg'} Timing={newsdata.publishedAt} Newslink={newsdata.url} author={newsdata.author ? newsdata.author : "Unknown"} source={newsdata.source.name ? newsdata.source.name : "Unknown"}></News>
                        }) : <img src={loader} width="30" alt="loading..." className="mx-auto"></img>
                    }
                </div>
            </InfiniteScroll>
        </>
    )
}
