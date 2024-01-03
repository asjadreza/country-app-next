import React from 'react'
import styles from '../src/app/page.module.css'
import { IoSearch } from 'react-icons/io5'


const Searchbar = ({ onSearchChange }) => {
  return (
    <div className={`container-md ${styles.containerMedium} ${styles.searchBar}`}>
      <input
        type='text'
        className={`form-control`}
        placeholder='Search country...'
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <IoSearch className={`${styles.searchIcon}`} />

    </div>
  );
};

export default Searchbar;