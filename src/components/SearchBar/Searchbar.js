import React, {useState} from "react";
import style from './styles/Searchbar.module.scss';


export default function Searchbar({onClick}){

    const [query,setQuery]=useState('');

    const handleChangeQuery =(e)=> {
        setQuery(e.currentTarget.value);
    }

    const handleSubmitForm =(e) => {
        e.preventDefault();
        onClick(query);
        setQuery('')
    }


        return (
            <header className={style.SearchBar}>
                <form className={style.SearchForm} onSubmit={handleSubmitForm}>
                    <button type="submit" className={style.SearchFormButton}>
                        <span className={style.SearchFormButtonLabel}>Search</span>
                    </button>
                    <input
                        className={style.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={handleChangeQuery}
                    />
                </form>
            </header>
        )
    }


