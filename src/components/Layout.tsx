import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/asdf.tsx";
import { Flex } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer.tsx";

export function Layout() {
    return (
      <>
        <Flex direction='column' mih='100vh'>
          <ToastContainer/>
          
          <Navbar />
          
          <main style={{flex: 1, margin: 0, }}>
            <Outlet />
          </main>
          
          <Footer/>
        </Flex>
      </>
    );
  }