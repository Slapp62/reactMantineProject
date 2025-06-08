import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navigation.tsx";
import { Flex } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import {Footer} from "../components/Footer.tsx";


export function Layout() {
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