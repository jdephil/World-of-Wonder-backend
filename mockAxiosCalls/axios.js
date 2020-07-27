const { default: Axios } = require("axios")

import React, { useState } from 'react';
import axios from 'axios';

//---------------------PROFILE & ARTIFACT CALLS-----------------////

//Axios call to view profile with all saved artifacts//

const [artifacts, setArtifacts] = useState({
  name: "",
  description: "", 
  imageURL: ""
})

axios.get(`${process.env.REACT_APP_SERVER_URL}/profile`, artifacts)

//Axios call to view artifact info from API server// 

axios.get(`${process.env.REACT_APP_SERVER_URL}/artifact/`, artifacts)

//Axios call to view info about ONE SPECIFIC artifact // 

axios.get(`${process.env.REACT_APP_SERVER_URL}/artifact/:id`, artifacts)

//Axios call to SAVE an artifact to user's profile // 

axios.post(`${process.env.REACT_APP_SERVER_URL}/profile/artifact/`, artifacts)

//Axios call to DELETE an artifact from a user's profile // 

axios.delete(`${process.env.REACT_APP_SERVER_URL}/profile/artifact/:id`, artifacts)

//// -------------------- JOURNAL ENTRY AXIOS CALLS --------------- ////

/// Axios call to view all journal entries///
const [journalEntries, setJournalEntries] = useState({
  title: "",
  entry: ""
})

axios.get(`${process.env.REACT_APP_SERVER_URL}/journal`, journalEntries)


//Axios call to view just ONE journal entry
axios.get(`${process.env.REACT_APP_SERVER_URL}/journal/:id`, journalEntries)

/// Axios call to create a new journal entry
axios.post(`${process.env.REACT_APP_SERVER_URL}/journal`, journalEntries)

//Axios call to edit a journal entry
axios.put(`${process.env.REACT_APP_SERVER_URL}/journal/:id`, journalEntries)

//Axios call to delete a journal entry
axios.delete(`${process.env.REACT_APP_SERVER_URL}/journal/:id`, journalEntries)





