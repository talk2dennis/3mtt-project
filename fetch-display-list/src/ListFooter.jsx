import { useState } from 'react';

const ListFooter = ({ prev, next, pages, setUrl, page, setPage }) => {

    // Function to handle page change
    const handleNextPage = () => {
        if (page < pages) {
            setUrl(next);
            setPage(page + 1);
        }
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setUrl(prev);
            setPage(page - 1);
        }
    }
    return (
        <div className="list-footer">
        <button onClick={handlePrevPage} disabled={!prev}>
            Previous
        </button>
        <span>{`Total pages: ${page} of ${pages}`}</span>
        <button onClick={handleNextPage} disabled={!next}>
            Next
        </button>
        </div>
    );
}

export default ListFooter;