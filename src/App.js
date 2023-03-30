import { useState } from "react";
import style from "./styles/style.module.scss";

const apiKey = "b7d3bda1e0818bb4b407638b5d0b4006";
const imgPath = "https://image.tmdb.org/t/p/w1280";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [Movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [popUp, setPopUp] = useState();

  const getMovies = async () => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}&language=zh-TW`
    );
    const respData = await resp.json();
    setMovies(respData.results);
  };

  const handleClick = () => {
    if (inputValue === "") {
      return setTitle("");
    } else return setTitle("Search Results...");
  };

  const card = (e) => {
    return (
      <div className={style.card} data-id={e.id}>
        <div className={style.img}>
          <img src={imgPath + e.poster_path} />
        </div>

        <div className={style.info}>
          <h2>{e.title}</h2>
          <div className={style.singleInfo}>
            <span>Rate:</span>
            <span>{e.vote_average}</span>
          </div>

          <div className={style.singleInfo}>
            <span>Release Date:</span>
            <span>{e.release_date}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={style.container}>
      <div className={style.search}>
        <input
          type="text"
          placeholder="Search ..."
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></input>

        <button
          onClick={() => {
            getMovies();
            handleClick();
          }}
        >
          Search
        </button>
      </div>
      <div className={style.moviesContainer}>
        <h1>{title}</h1>
        <div className={style.moviesGrid}>
          {Movies.map((e) => {
            return card(e);
          })}
        </div>
      </div>
      <div className={style.popUpContainer}>
        <span className={style.xIcon}>&#10006;</span>
        <div className={style.content}>
          <div className={style.left}>
            <div className={style.posterImg}>
              <img src="https://unsplash.it/500/1000"></img>
            </div>
            <div className={style.singleInfo}>
              <span>Add to Favorites:</span>
              <span className={style.heartIcon}>&#9829;</span>
            </div>
          </div>
          <div className={style.right}>
            <h1>Movie Title</h1>
            <h3>Movie Tagline</h3>
            <div className={style.singleInfoContainer}>
              <div className={style.singleInfo}>
                <span>Language:</span>
                <span>English</span>
              </div>
              <div className={style.singleInfo}>
                <span>Length:</span>
                <span>120 mins</span>
              </div>
              <div className={style.singleInfo}>
                <span>Rate:</span>
                <span>10 / 10</span>
              </div>
              <div className={style.singleInfo}>
                <span>Budget:</span>
                <span>1,350,000$</span>
              </div>
              <div className={style.singleInfo}>
                <span>Release Date:</span>
                <span>2022/05/07</span>
              </div>
            </div>
            <div className={style.genres}>
              <h2>Genres</h2>
              <ul>
                <li>Action</li>
                <li>Drama</li>
                <li>Romance</li>
              </ul>
            </div>
            <div className={style.overView}>
              <h2>Overview</h2>
              <p>
                asdasdhjfuaoipwehfgwoe;ighwoe;ighaw;oieghwae;oighweiogdfhjadsuif
              </p>
            </div>
            <div className={style.trailer}>
              <h2>Trailer</h2>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Kmo8NLKkfcQ"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
