import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { SearchContext } from "context/SearchContext";
import { useState } from "react";
import { useModal } from "hooks/useModal";
import ModalContainer from "components/Modal/ModalContainer";

const Layout = props => { 
	const { children } = props;
	const [searchText, setSearchText] = useState();
	const [customerId, setCustomerId] = useState("");
	const { isOpen, handleOpen, handleClose } = useModal();
	

	const handleSearch = text => {
		setSearchText(text);
	};

	return (
		<SearchContext.Provider
			value={{
				searchText,
				setSearchText: handleSearch,
				isOpen,
				handleOpen,
				handleClose,
				customerId,
				setCustomerId
			}}>
			<div>
				<Header />
				<div className="site-wrapper">
					<SideBar />
					{children}
				</div>
				<Footer />
			</div>
			<ModalContainer customerId={customerId} isOpen={isOpen}/>
		</SearchContext.Provider>
	);
};

export default Layout;
