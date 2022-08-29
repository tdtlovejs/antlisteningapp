import React from 'react';
import {createContext, useEffect, useState} from 'react';
import {getAllMyGroup, getWordsByListIds} from "../../../../databases/db";

export const MyGroupContext = createContext({});

const MyGroupContextProvider = ({children}) => {
    const [myGroups, setMyGroups] = useState([]);
    const [wordsByMyGroup, setWordsByMyGroup] = useState([]);
    const [myGroup, setMyGroup] = useState(null);
    const [loadingMyGroups, setLoadingMyGroups] = useState(true);
    const [loadingMyGroup, setLoadingMyGroup] = useState(false);
    useEffect(() => {
        if (Array.isArray(myGroup?.words)) {
            setLoadingMyGroup(true);
            getWordsByListIds(myGroup.words)
                .then(res => {
                    setWordsByMyGroup(res);
                    setLoadingMyGroup(false);

                })
                .catch(err => {
                    setLoadingMyGroup(false);
                })
        } else {
            setWordsByMyGroup([]);
        }
    }, [myGroup])



    const getMyGroups = () => {
        getAllMyGroup()
            .then(res => {
                setMyGroups(res);
                setLoadingMyGroups(false);
            })
            .catch(err => {
                setLoadingMyGroups(false)
            })
    }


    const HomeContextData = {
        myGroups,
        setMyGroups,
        getMyGroups,
        wordsByMyGroup,
        myGroup,
        setMyGroup,
        loadingMyGroups,
        loadingMyGroup
    }
    return (
        <MyGroupContext.Provider value={HomeContextData}>
            {children}
        </MyGroupContext.Provider>
    )
}

export default MyGroupContextProvider;
