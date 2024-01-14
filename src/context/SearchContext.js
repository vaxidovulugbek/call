import { createContext } from "react";

export const SearchContext = createContext({
    isOpen: false,
    handleOpen: () => {},
    handleClose: () => {},
    searchText: '',
    setSearchText: () => {},
    customerId: '',
    setCustomerId: () => {}
})
