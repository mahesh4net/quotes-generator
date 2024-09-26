import { useEffect, useRef, useState } from "react";
import Main from "./main";
import Loader from "./loader";

export default function Quote() {
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    const [isloading, setIsloading] = useState()
    const selectval = useRef()

    function showQuote(value) {
        setIsloading(true)
        let category = `?category=${value}`
        if (value == 'all') {
            category = ''
        }

        let url = `https://api.api-ninjas.com/v1/quotes${category}`
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {'X-Api-Key': 'fLHsLGcdXDGrAAKG0W8WlQ==2hNJloDhyUrrGtCf'}
    }
        ).then(Response => {
           return Response.json()
        }).then(data => {
            setIsloading(false)
            setQuote(data[0].quote)
            setAuthor(data[0].author)
            
        }).catch(error => {
            setQuote(error)
        })

    }


    useEffect(() => {
        showQuote('all')
    }, [])
    
    



    return (
        <>
        <div className="main-container">
                <Main>
                    
                    <h3>{isloading ? <Loader/> : quote}</h3>
            <p>{isloading ? null :  ("- " + author)}</p>
                </Main>

                <div className="controls">
                <select name="category" id="category" ref={selectval}>
                    <option value="all">All</option>
                    <option value="amazing">amazing</option>
                    <option value="art">art</option>
                    <option value="business">business</option>
                    <option value="computers">computers</option>
                    <option value="death">death</option>
                    <option value="education">education</option>
                    <option value="freedom">freedom</option>
                    <option value="happiness">happiness</option>
                    <option value="success">success</option>

             </select>
                

                    <button onClick={() => showQuote(selectval.current.value)}>GET QUOTE</button>
                    </div>
        </div> 
        </>
    )
}