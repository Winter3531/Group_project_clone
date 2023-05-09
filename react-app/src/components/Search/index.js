import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { search } from "../../store/search";

const SearchResult = () => {
    const dispatch = useDispatch()
    const result = useSelector(state => state?.result)
    useEffect(() => {
        dispatch(search())
    }, [dispatch])

    return (
        <div>
            Test
        </div>
    )
}

export default SearchResult
