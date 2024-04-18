 import React from 'react';
 import styles from './styles/CountryListItem.module.css';
 
 const CountryListItem = ({id, name, flag}) => {
    return (
        <li className={styles.country_list_item}>
            <span>{flag}</span>
            <span>{name}</span>
        </li>
    );
 }
 
 export default CountryListItem;
 