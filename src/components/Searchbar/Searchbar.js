import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { ReactComponent as SearchBtn } from './search.svg';
import propTypes from 'prop-types';
import Notiflix from 'notiflix';





const Searchbar = ({onSubmit}) => {
  
   const [searchQuery, setSearchQuery] = useState('');       

    const handleSubmit = e => {         
        e.preventDefault();        
        const query = searchQuery.trim();
        if(query === '') {           
            Notiflix.Notify.info('Enter search word');           
            return;
        }
       
        onSubmit(query);
        setSearchQuery('');        
    }

   
    const handleChange = e => {
        setSearchQuery(e.currentTarget.value);        
    }
    
        return(
            <header className={styles.searchbar}>
            <form 
                className={styles.form}
                onSubmit={handleSubmit}
                >
                <button type="submit" className={styles.button} >
                <span className={styles.buttonLabel} ><SearchBtn width="40" height="40"/></span>
                </button>

                <input                
                className={styles.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={searchQuery}
                onChange={handleChange}
                />
            </form>
            </header>
        )
    
}

Searchbar.propTypes = {
    onSubmit: propTypes.func.isRequired,    
  }

export default Searchbar;