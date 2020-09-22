import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';

function Search({ onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center relative w-full md:w-1/2 md:mx-auto">
        <input
          className="shadow appearance-none border rounded-lg w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search for any IP address or domain"
          onChange={onChange}
        />
        <button className="absolute right-0 top-0 bottom-0 py-3 bg-gray-700 text-white rounded-lg px-8">
          <FontAwesomeIcon icon={faGreaterThan} />
        </button>
      </div>
    </form>
  );
}

export default Search;
