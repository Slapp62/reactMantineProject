import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/navigation";
import { Footer } from "./Footer/Footer";
import { Flex } from "@mantine/core";
import { ToastContainer } from "react-toastify";

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