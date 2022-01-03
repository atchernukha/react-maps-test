import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
// import markers from './markers.json';

const DataContext = createContext();

export function DataProvider({ children }) {

    const [value, setValue] = useState({});
    const setValues = values => {
        setValue((prevData) => ({
            ...prevData,
            ...values,
        }));
    };
    const baseURL = process.env.REACT_APP_API_HOST + 'api';
    useEffect(() => {
        axios({
            url: baseURL + '/item',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            const initial = res.data;
            setValue({
                ...initial,
                "filtered": initial.features,
                "currentMarker": null,
                "formOpened": false
            });
        })
    }, [setValue]);
    // console.log(value)

    return (
        <DataContext.Provider value={{ value, setValues }}>
            {children}
        </DataContext.Provider>
    )
};

export const useData = () => useContext(DataContext)
