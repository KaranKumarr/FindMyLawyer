import React from 'react';

const SearchBox = ({ handleSearching, searchQuery, setSearchQuery }) => {

    return (
        <form onSubmit={handleSearching}>
            <div className='sm:w-max'>
                <h1 className='my-1 max-sm:my-2 max-sm:text-center'>
                    Find and book the best Lawyers
                </h1>
                <div className='my-1 max-sm:my-2 w-full flex justify-evenly items-center max-sm:flex-col'>
                    <input
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); }}
                        type="text" placeholder="Search for Lawyers by name or expertise. "
                        className='standard-input bg-white text-neutral-contrast w-3/4 '
                    />
                    <button type="submit" className='primary-btn w-1/5'>Search</button>
                </div>
            </div>
        </form>
    );
};

export default SearchBox;