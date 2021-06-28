import './App.css'
import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Auth } from './Auth';
import { Search } from './Search';
import { BuildPlaylist } from './BuildPlaylist';

export default function App() {

  const [auth_token, setAuthToken] = useState("")
  const [artist_name, setArtistName] = useState("");
  const [artist_id, setArtistId] = useState("");
  const [playlist, setPlaylist] = useState([])

  const { register, handleSubmit } = useForm();

  // Get authentication token
  useEffect(() => {
    Auth().then(response => { setAuthToken(response) })
  }, []);

  // Get artist ID from name input
  const onSubmit = (data) => {
    Search(auth_token, data.artist_name).then(response => {
      if (response) { 
        setArtistName(response[0])
        setArtistId(response[1]) 
      };
    })
  };

  // Create playlist from artist ID
  useEffect(() => {
    BuildPlaylist(auth_token, artist_id).then(response => {
      if (response) { setPlaylist(response) };
    })
  }, [artist_id, auth_token]);

  return (
    <div className="App">

      <h1>Playlist Generator</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("artist_name")} placeholder="I want to hear music similar to songs by..." />
        <input type="submit" />
      </form>

      <h2>{artist_name}</h2>
      <div className="playlist">
        {playlist.map((track) => <p key={track}>{track}</p>)}
      </div>

    </div>
  );
}
