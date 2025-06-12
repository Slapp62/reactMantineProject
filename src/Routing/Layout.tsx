import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navigation/Header.tsx";
import { Flex } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import {Footer} from '../components/Navigation/Footer.tsx';
import { useAuthInit } from "@/hooks_and_functions/UseAuthInit.ts";
import { fetchCardsThunk } from "@/store/cardSlice.tsx";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";


export function Layout() {
    // refresh all cards in redux when visitin hompage
    const dispatch = useDispatch();
    const location = useLocation();
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (location.pathname === '/' || location.pathname.startsWith('/card-details')) {
            if (!fetchedRef.current) {
                dispatch(fetchCardsThunk() as any);
                fetchedRef.current = true;
            }
        } else {
            fetchedRef.current = false;
        }
    }, [location.pathname, dispatch]);
    
    // persist log in between sessions
    useAuthInit();

    return (
      <>
        <Flex direction='column' mih='100vh'>
          
            <Navbar />
            
            <main style={{flex: 1, margin: 0, }}>
            <Outlet />
            </main>
            
            <Footer/>
            <ToastContainer 
                position="bottom-right"
                toastClassName="custom-toast"
            />
        </Flex>
      </>
    );
  }