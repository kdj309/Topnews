import React, { useState, useEffect } from 'react'
import News from './News';
import loader from '../resources/ajax-loader.gif'
import Navbar from './Navbar';
import LoadingBar from 'react-top-loading-bar'
export default function PaginationNewscontainer({ country, pagesize, category,apikey}) {
    const [news, setnews] = useState([]);
    const [page, setpage] = useState(1)
    const [totalsize, setTotalsize] = useState(0)
    const [progress, setProgress] = useState(0)
    async function fetchnews() {
        setProgress((previous)=>{
            return previous+10
        }
        )
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&sortBy=popularity&pageSize=${pagesize}&page=${page}&category=${category}&apiKey=${apikey}`);
        setProgress((previous)=>{
            return previous+30
        }
        )
        const newsdata = await response.json()
        setProgress((previous)=>{
            return previous+40
        }
        )
        setTotalsize(newsdata.totalResults)
        setnews(newsdata.articles)
        setProgress(100)
    }
    function previousHandler(e) {
        if (page > 1) {
            setpage(page - 1)
        } else {
            e.target.setAttribute("disabled", "true")
        }
    }
    function nextHandler(e) {

        if (page + 1 > Math.ceil(totalsize / 4) || news.length > pagesize) {
            e.target.setAttribute("disabled", "true")
        } else {
            setpage(page + 1)
        }
    }
    function capatalize(str) {
        return str.split(' ').map((char) => {
            return char[0].toUpperCase() + char.slice(1)
        }).join(' ')
    }

    useEffect(() => {
        document.title = `Top-News | ${capatalize(category)}`
        fetchnews()

    }, [page])

    return (
        <><LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={1}
      />
        <Navbar/>
            <h4 className="display-3 my-2 text-center">Top {capatalize(category)} News</h4>

            <div className="my-3 container d-flex flex-row justify-content-between align-items-center flex-wrap border border-primary pd-3">
                {

                    news.length > 2 ? news.map((newsdata, index) => {
                        return <News key={index + 1} NewsTitle={newsdata.title ? newsdata.title.slice(0, 50) + "..." : ""} Newsdescription={newsdata.description ? newsdata.description.slice(0, 128) + "..." : ""} NewsImg={newsdata.urlToImage ? newsdata.urlToImage : 'https://image.shutterstock.com/image-vector/breaking-news-background-world-global-260nw-719766118.jpg'} Timing={newsdata.publishedAt} Newslink={newsdata.url} author={newsdata.author ? newsdata.author : "Unknown"} source={newsdata.source.name ? newsdata.source.name : "Unknown"}></News>
                    }) : <img src={loader} width="30" alt="loading..." className="mx-auto"></img>
                }
            </div>

            <nav aria-label="Page navigation" className="my-2 mx-auto" style={{ width: "max-content" }}>
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" aria-label="Previous" onClick={(e) => { previousHandler(e) }} disabled={page <= 1 ? true : false}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" aria-label="Next" onClick={(e) => { nextHandler(e) }} disabled={page + 2 > Math.ceil(totalsize / 4) || news.length < pagesize ? true : false}>
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}
