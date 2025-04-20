import { Outlet } from "react-router-dom";
import { Navbar } from "./navigation/navigation";
import { Footer } from "./footer/footerComp";
import { Flex } from "@mantine/core";

export function Layout() {
    return (
      <>
      <Flex direction='column' mih='100vh'>
        <Navbar />

        <main style={{flex: 1}} >
          <Outlet />
        </main>
        
        <Footer />
      </Flex>
        
      </>
    );
  }