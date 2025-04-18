import { Outlet } from "react-router-dom";
import { Navbar } from "./navigation/navigation";
import { Footer } from "./footer/footerComp";

export function Layout() {
    return (
      <>
        <Navbar />

        <main>
          <Outlet />
        </main>
        
        <Footer />
      </>
    );
  }