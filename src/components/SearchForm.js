import React from 'react';

const SearchForm = (props) => {
    const { handleChange, handleSubmit } = props;

    return (
        <div className="search-form">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search a location" onChange={(e) => handleChange(e)} />
            </form>
        </div>
    )
}

export default SearchForm;