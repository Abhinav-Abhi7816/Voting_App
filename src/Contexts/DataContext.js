import { createContext, useContext } from "react";

const DataContext=createContext({logName:"",setLogName:()=>{},});

export const DataContextProvider=DataContext.Provider;

export default function useDataContext()
{
    return useContext(DataContext);
}