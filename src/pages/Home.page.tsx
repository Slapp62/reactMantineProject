import { BizCard } from '@/components/Cards/cards';
import { Hero } from '@/components/hero';
import { Tcards } from '@/Types';
import { Box, Flex, Pagination } from '@mantine/core';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function HomePage() {
    // Get and set cards
    const getCards = async () => {
      return await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
  }

  const [cards, setCards] = useState<Tcards[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const loadCards = async () => {
          const response = await getCards();
          setCards(response.data);
          // eslint-disable-next-line no-console
          console.log(response.data);
      };

      loadCards();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;
  const paginatedCards = cards.slice(
    (currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  return (
    <>
      <Box style={{flexGrow:1}}>
        <Box pos='relative'>
          <Hero />
        </Box>
        
        
        <Flex ref={cardsRef} wrap="wrap" gap="lg" align='stretch' justify="space-evenly" w="70%" mx='auto'>
          {paginatedCards.map((card, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}>

              <BizCard key={index} card={card} />

              </motion.div>
          ))}
          
          <Pagination
            total={Math.ceil(cards.length / cardsPerPage)}
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
