import { Outlet } from "react-router-dom";
import { Navbar } from "./navigation/navigation";
import { MyFooter } from "./footer/footerComp";
import { Box } from "@mantine/core";
import { ToastContainer } from "react-toastify";

export function Layout() {
    return (
      <>
        
        <Box>
          <ToastContainer/>
          
          <Navbar />
          
          <main>
            <Outlet />
          </main>
          
          <MyFooter/>
        </Box>
      </>
    );
  }