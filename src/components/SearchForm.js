import React from 'react';

const SearchForm = (props) => {
    const { handleChange, handleSubmit, userInput } = props;

    return (
        <div className="search-form">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Search a location" 
                    value={userInput} 
                    onChange={(e) => handleChange(e)} />
            </form>
        </div>
    )
}

export default SearchForm;