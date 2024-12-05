import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AnimeList() {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?page=${page}`);
        setAnimes((prevAnimes) => [...prevAnimes, ...response.data.data]);
        setLoading(false);
      } catch (error) {
        console.error('خطا در دریافت اطلاعات:', error);
        setLoading(false);
      }
    };

    fetchAnimes();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div className='itembox'>
      {animes.map((anime) => (
        <div key={anime.mal_id} style={{ display: 'flex', alignItems: 'center' }}>
          <img src={anime.images.jpg.small_image_url} alt={anime.title} style={{ width: '100px', marginRight: '10px' ,marginTop: '10px' }} />
          <span>{anime.title}</span>
         
        </div>
        
      ))}
      {loading && <div>Is Loading</div>}
    </div>
  );
}

export default AnimeList;
