import React, { createContext, useContext, useState } from 'react';
import markers from './markers.json';

const DataContext = createContext();

export function DataProvider( {children} ) {

    const [value, setValue] = useState(
                {   ...markers,
                    "currentMarker": {"geometry": {
                    "type": "Point",
                    "coordinates": [0, 0]
                  }}
                }
    );
    const setValues = values => {
        setValue((prevData) => ({
            ...prevData,
            ...values,
        }));
    };

    return (
        <DataContext.Provider value={{value, setValues}}>
            {children}
        </DataContext.Provider>
    )
};

export const useData = () => useContext( DataContext )
