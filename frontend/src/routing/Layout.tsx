import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MobileBottomNav } from '@/components/Navigation/MobileNav.tsx';
import { useAuthInit } from '@/hooks/UseAuthInit.ts';
import { useScrollToTop } from '@/hooks/useScrollToTop.ts';
import { fetchListingsThunk } from '@/store/listingSlice.tsx';
import { RootState } from '@/store/store.ts';
import { Footer } from '../components/Navigation/Footer.tsx';
import { Navbar } from '../components/Navigation/Header.tsx';

export function Layout() {
  // refresh all cards in redux when visitin hompage
  const dispatch = useDispatch();
  const location = useLocation();
  const fetchedRef = useRef(false);
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isBusiness = useSelector(
    (state: RootState) => state.userSlice.user?.userData.userType === 'business'
  );

  useEffect(() => {
    if (location.pathname === '/' || location.pathname.startsWith('/card-details')) {
      if (!fetchedRef.current) {
        dispatch(fetchListingsThunk() as any);
        fetchedRef.current = true;
      }
    } else {
      fetchedRef.current = false;
    }
  }, [location.pathname, dispatch]);

  // persist log in between sessions
  useAuthInit();

  //ensure top scrolled on page change
  useScrollToTop();

  return (
    <>
      <Flex direction="column" mih="100vh">
        <Navbar />

        <main style={{ flex: 1 }}>
          <Outlet />
        </main>

        <Footer />

        {isMobile && isBusiness && <MobileBottomNav />}

        <ToastContainer
          position={isMobile ? 'top-right' : 'bottom-right'}
          toastClassName="custom-toast"
          newestOnTop={!isMobile}
          theme="light"
          autoClose={3000}
          closeOnClick
        />
      </Flex>
    </>
  );
}
