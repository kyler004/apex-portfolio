import React from "react";

/** Fixed film grain + vignette layered over the whole page. */
const FilmOverlay: React.FC = () => (
  <>
    <div className="film-grain" aria-hidden />
    <div className="film-vignette" aria-hidden />
  </>
);

export default FilmOverlay;

