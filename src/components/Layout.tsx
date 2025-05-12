import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/navigation";
import { Flex } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { Footer } from "./Footer/Footer";

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