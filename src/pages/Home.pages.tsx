import { useGetCards } from '@/hooks_and_functions/UseGetCards';
import { Hero } from '@/components/Hero';
import { RootState } from '@/store/store';
import { TCards } from '@/Types';
import { Box, Button, Center, Flex, Loader, Pagination, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconArrowUp } from '@tabler/icons-react';
import MiniCard from '@/components/Cards/MiniCard';

export function HomePage() {
    const {cards, isLoading} = useGetCards();
    const searchWord = useSelector((state: RootState)=> state.searchSlice.searchWord)
    const sortOption = useSelector((state: RootState) => state.cardSlice.sortOption);

    const sortedCards = useMemo(() => {
        if (!cards) {return []};

        return [...cards].sort((a, b) => {
        if (sortOption === 'title-asc'){
        return a.title.localeCompare(b.title);
        } else if (sortOption === 'title-desc') {
        return b.title.localeCompare(a.title);
        } else if (sortOption === 'date-created-old'){
        if (a.createdAt && b.createdAt){
            return a.createdAt?.localeCompare(b.createdAt)
        }
        } else if (sortOption === 'date-created-new'){
        if (a.createdAt && b.createdAt){
            return b.createdAt?.localeCompare(a.createdAt)
        }
        }
        return 0
    });
    }, [cards, sortOption]);

    const searchCards = useMemo(() => {
        return sortedCards.filter((card:TCards) => {
            const keyWord = searchWord.toLowerCase();
            return (
                card.title.toLowerCase().includes(keyWord) ||
                card.subtitle.toLowerCase().includes(keyWord) ||
                card.description.toLowerCase().includes(keyWord)
            )
        });
    }, [sortedCards, searchWord]);
  
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12;
    
    const paginatedCards = searchCards ? searchCards.slice(
        (currentPage - 1) * cardsPerPage, currentPage * cardsPerPage) : [];

    useEffect(() => {
        setCurrentPage(1);
    }, [searchCards]);

    if (isLoading) {
        return <>
        <Box pos='relative'>
            <Hero/>
        </Box>

        <Center>
            <Loader color="cyan" size="xl" mt={30}/>
        </Center>
        </>      
    }
    
  return (
    <>
      <Hero/>
        <Flex direction='column' align='center' gap={20}>
            
                <Flex wrap="wrap" gap={20} justify="space-evenly" w="70%" mx='auto'>
                    {paginatedCards.map((card:TCards) => (
                    <motion.div
                        key={card._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.2 }}
                        >
                        
                        <MiniCard card={card} />
                    
                    </motion.div>
                    ))}
                </Flex>
            
            <Text >Showing {(currentPage-1)*cardsPerPage+1} to {currentPage*cardsPerPage} of {cards?.length}</Text>
            <Pagination
            total={searchCards ? Math.ceil(searchCards.length / cardsPerPage) : 0}
            value={currentPage}
            onChange={(page)=>{
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            mt="md"
            />
            <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                mt={20}
                c='green'
                variant='light'
                rightSection={<IconArrowUp/>}
            > Back to Top</Button>
        </Flex>
    </>
  );
}
