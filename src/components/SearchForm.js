import React from 'react';

const SearchForm = (props) => {
    const { handleChange, handleSubmit, userInput } = props;

    return (
        <div className="search-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search"> Search location:
                <input 
                    type="text" 
                    placeholder="City, St" 
                    name="search"
                    value={userInput} 
                        onChange={(e) => handleChange(e)} /></label>
            </form>
        </div>
    )
}

export default SearchForm;