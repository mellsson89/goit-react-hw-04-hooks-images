import React, { useEffect, useState} from "react";
import fetchGallery from './services/gallery-api'
import Searchbar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Modal from './components/Modal';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import style from './styles/app.module.scss';



export default function App(){

    const [imgGallery,setImgGallery]=useState([]);
    const [searchQuery,setSearchQuery]=useState('');
    const [page,setPage]=useState(1);
    const [largeImageURL,setLargeImageURL]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const [activeButton,setActiveButton]=useState(false);

    useEffect(()=> {
        if(searchQuery) {
            fetchImages();
        }
    },[searchQuery])


   const onChangeQuery = (query) => {
       setSearchQuery(query);
       setPage(1);
       setImgGallery([]);
    }
//
   const onOpenImgGallery = (id) => {
        const {largeImageURL}=imgGallery.find(img => img.id === id);

        setLargeImageURL(largeImageURL);
    }
//
   const onCloseImgGallery = () => {

       setLargeImageURL('')
    }


   const fetchImages = () => {

        setIsLoading(true);
        setActiveButton(true);

        const options={searchQuery,page};

        fetchGallery(options)
            .then((hits) => {
                    setImgGallery([...imgGallery,...hits]);
                    setPage(prevPage => prevPage + 1);
                    setActiveButton(false)})
            .then(()=> {
                if(page >1){
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                    })
                }
        }).finally(() => setIsLoading(false))

    }



        return (
            <>
                <Searchbar onClick={onChangeQuery}/>
                <ImageGallery imgGallery={imgGallery} onClickImg={onOpenImgGallery}/>
                {isLoading &&
                <Loader type="Oval" color="#00BFFF" height={30} width={30} timeout={3000} className={style.spinner}/>}
                {imgGallery.length > 0 && !isLoading &&
                <Button text="Load mode" onClick={fetchImages} status={activeButton}/>}
                {largeImageURL && <Modal onClose={onCloseImgGallery} imgLarge={largeImageURL} altImg={searchQuery}/>}

            </>
        )
    }


