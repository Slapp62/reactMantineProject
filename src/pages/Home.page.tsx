import { BizCard } from '@/components/Cards/cards';
import { Hero } from '@/components/hero';
import { Navbar } from '@/components/navigation/navigation';
import { Tcards } from '@/components/Types';
import { Flex } from '@mantine/core';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


export function HomePage() {
    // Get and set cards
    const getCards = async () => {
      return await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
  }

  const [cards, setCards] = useState<Tcards[]>([]);

  useEffect(() => {
      const loadCards = async () => {
          const response = await getCards();
          setCards(response.data);
          // eslint-disable-next-line no-console
          console.log(response.data);
      };

      loadCards();
  }, []);

  
  return (
    <>
      <Navbar/>

      <Hero/>

      <Flex wrap="wrap" gap="md" align="center" justify="space-evenly" w="70%" mx="auto">
        {cards.map((card, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}>

            <BizCard key={index} card={card} />

            </motion.div>
        ))}
      </Flex>


    </>
  );
}
