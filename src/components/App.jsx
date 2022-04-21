

import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Notiflix from 'notiflix';
import imagesApi from "../servises/images-api";
import Searchbar from './Searchbar';
import Loader from "./Loader";
import Button from './Button';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { animateScroll as scroll } from "react-scroll";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  let largeImageURL = '';

  useEffect(() => {
    fetchImages();
    if(images.length > 12) {
      scroll.scrollToBottom();
    }
  }, [searchQuery]);
  

  const onChangeQuery = (query) => {
    setSearchQuery(query);
  }

  const fetchImages = () => {    
    const options = {currentPage, searchQuery};
    setIsLoading(true);   
   
    imagesApi(options)    
    .then(({hits}) =>{
      if(hits.length===0) {
        Notiflix.Notify.info('No images found');
        return;
      }
      
      setImages([...images, ...hits]);
      setCurrentPage(currentPage + 1);
    })
    .catch(error => setError(error))
    .finally(setIsLoading(true));  
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = (searchId) => {
   const image = images.find(image => image.id === searchId);  
   largeImageURL = image.largeImageURL;
   toggleModal();   
  }

    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    
    return(
      <div className={styles.app}>
      {error && Notiflix.Notify.failure(error)}
      <Searchbar onSubmit={onChangeQuery}/>
      {isLoading && <Loader />}      
      {images.length > 0 && <ImageGallery openModal={openModal} images={images}/>}
      {shouldRenderLoadMoreButton &&       
        <Button onClick={fetchImages}/>      
      }
      {showModal && <Modal largeImg={largeImageURL} onClose={toggleModal}/>}
      </div>
    )
  
};

export default App;