import React, {useState} from 'react';

const GovContext = React.createContext();

export const GovProvider = ({children}) => {

    const [name, setName] = useState();
    const [wallet, setWallet] = useState();
    const [scComs, setScComs] = useState();
    const [scGov, setScGov] = useState();

 

    // const addNewName = (newName) => {
    //     setName(newName);
    // }

    const updateSignerElements = (_wallet, _scComs, _scGov) => {
        setWallet(_wallet);
        setScComs(_scComs);
        setScGov(_scGov);

    }


    return <GovContext.Provider value={{wallet, scComs, scGov, updateSignerElements, }} >
        {children}
    </GovContext.Provider>;
};

export default GovContext;



