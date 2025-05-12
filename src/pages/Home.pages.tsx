import { useGetCards } from '@/components/Cards/GetCards';
import { MiniCard } from '@/components/Cards/MiniCard';
import { Hero } from '@/components/Hero/Hero';
import { RootState } from '@/store/store';
import { TCards } from '@/Types';
import { Box, Center, Flex, Loader, Pagination } from '@mantine/core';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export function HomePage() {
  
  useGetCards();

  const cardsRef = useRef<HTMLDivElement>(null);

  const cards = useSelector((state:RootState) => state.cardSlice.cards)
  const searchWord = useSelector((state: RootState)=> state.searchSlice.searchWord)
  

  const filterSearch = () => {
    return cards ? 
      cards.filter((card:TCards) => {
        return (
          card.title.toLowerCase().includes(searchWord.toLowerCase()) ||
          card.subtitle.toLowerCase().includes(searchWord.toLowerCase()) ||
          card.description.toLowerCase().includes(searchWord.toLowerCase())
        )
      }
    ) : cards;
  }
  const filteredCards = filterSearch();
  
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;
  const paginatedCards = filteredCards ? filteredCards.slice(
    (currentPage - 1) * cardsPerPage, currentPage * cardsPerPage) : [];

  if (!cards) {
    return  <>
      <Box pos='relative'>
        <Hero/>
      </Box>

      <Center>
        <Loader color="cyan" size="xl" mt={30}/>
      </Center>;
    </>
            
  }

  return (
    <>
      <Box>
        <Box pos='relative'>
          <Hero/>
        </Box>

        <Flex ref={cardsRef} direction='column' align='center' gap={20}>
          <Flex wrap="wrap" gap="lg" align='stretch' justify="space-evenly" w="70%" mx='auto'>
            {paginatedCards.map((card:TCards) => (
              <motion.div
              key={card._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}>

              <MiniCard key={card._id} card={card} />

              </motion.div>
            ))}
          </Flex>
          
          <Pagination
            total={filteredCards ? Math.ceil(filteredCards.length / cardsPerPage) : 0}
            value={currentPage}
            onChange={(page)=>{
              setCurrentPage(page);
              cardsRef.current?.scrollIntoView({behavior:'smooth'});
            }}
            mt="md"
          />

        </Flex>
      </Box>
    </>
  );
}
