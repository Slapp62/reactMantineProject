import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/navigation";
import { MyFooter } from "./Footer/footerComp";
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