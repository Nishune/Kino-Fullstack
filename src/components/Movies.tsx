"use client";
import { movieType } from "@/types/Movietypes";
import { useState, useEffect } from "react";
import Display from "./RenderMovies";

const Movies = () => {
  const [movies, setMovies] = useState<movieType[]>([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch("/api/movies");
        const dataMovies: movieType[] = await response.json();
        setMovies(dataMovies);
      } catch (err) {
        console.error("Couldn't get movies", err);
      }
    }

    loadMovies();
  }, []);

  const nowShowing = movies.filter((movie) =>
    movie.tags.includes("nowShowing")
  );

  shufffle(nowShowing);

  //Fisher-Yates algoritm
  function shufffle(shuff: movieType[]) {
    for (let i = shuff.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));

      [shuff[i], shuff[random]] = [shuff[random], shuff[i]];
    }
  }

  const display = nowShowing.slice(0, 5);

  return (
    <>
      <div>
        <Display display={display}> Know showing on Cinema</Display>
      </div>
    </>
  );
};
export default Movies;
