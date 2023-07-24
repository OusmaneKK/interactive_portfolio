/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'


export default function MusicCard(props) {
  const { image, title, description, genre, mp3File } = props.music

  return (
    <div className="music-card">
      <img src={image} alt="music image" />
      <h2>Title : {title}</h2>
      <p>{description}</p>
      <p>Genre: {genre}</p>
      <audio controls>
        <source src={mp3File} type="audio/mpeg" />
      </audio>
    </div>
  )
}
