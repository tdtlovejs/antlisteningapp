import React from 'react';
import {createContext, useEffect, useState} from 'react';
import {getAllMyPlaylist, getWordsByListIds} from "../../../../databases/db";

export const MyPlaylistContext = createContext({});

const MyPlaylistContextProvider = ({children}) => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    const [wordsByMyPlaylist, setWordsByMyPlaylist] = useState([]);
    const [myPlaylist, setMyPlaylist] = useState(null);
    const [loadingMyPlaylists, setLoadingMyPlaylists] = useState(true);
    const [loadingMyPlaylist, setLoadingMyPlaylist] = useState(false);
    useEffect(() => {
        if (Array.isArray(myPlaylist?.words)) {
            setLoadingMyPlaylist(true);
            // getWordsByListIds(MyPlaylist.words)
            //     .then(res => {
            //         setWordsByMyPlaylist(res);
            //         setLoadingMyPlaylist(false);
            //
            //     })
            //     .catch(err => {
            //         setLoadingMyPlaylist(false);
            //     })
        } else {
            setWordsByMyPlaylist([]);
        }
    }, [myPlaylist])



    const getMyPlaylists = () => {
        setLoadingMyPlaylists(true);
        getAllMyPlaylist()
            .then(res => {
                setMyPlaylists(res);
                setLoadingMyPlaylists(false);
            })
            .catch(err => {
                setLoadingMyPlaylists(false)
            })
    }


    const HomeContextData = {
        myPlaylists,
        setMyPlaylists,
        getMyPlaylists,
        wordsByMyPlaylist,
        myPlaylist,
        setMyPlaylist,
        loadingMyPlaylists,
        loadingMyPlaylist
    }
    return (
        <MyPlaylistContext.Provider value={HomeContextData}>
            {children}
        </MyPlaylistContext.Provider>
    )
}

export default MyPlaylistContextProvider;
