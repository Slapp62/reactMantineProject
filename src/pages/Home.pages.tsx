import { useGetCards } from '@/hooks_and_functions/UseGetCards';
import { Hero } from '@/components/Hero';
import { RootState } from '@/store/store';
import { TCards } from '@/Types';
import { Box, Button, Center, Flex, Loader, Pagination, Text, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconArrowUp, IconMoodSad2 } from '@tabler/icons-react';
import MiniCard from '@/components/Cards/MiniCard';
import { useMediaQuery } from '@mantine/hooks';

export function HomePage() {
    const {allCards, isLoading} = useGetCards();

    if (allCards === null || isLoading) {
        return (
            <>
                <Box pos='relative'>
                    <Hero/>
                </Box>

                <Center>
                    <Loader color="cyan" size="xl" mt={30}/>
                </Center>
            </>
        )
    };

    const cards = useMemo(() => 
        [...allCards].sort((a : TCards, b : TCards) => 
            (a.createdAt && b.createdAt) ? b.createdAt?.localeCompare(a.createdAt) :  0)
    , [allCards]);
    const searchWord = useSelector((state: RootState)=> state.searchSlice.searchWord)
    const sortOption = useSelector((state: RootState) => state.cardSlice.sortOption);
    const isMobile = useMediaQuery('(max-width: 500px)');

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
    
    const paginatedCards = useMemo(() => {
        return searchCards.slice(
        (currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
    }, [searchCards, currentPage, cardsPerPage]).map((card:TCards) => card._id);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchCards]);

    const startCurrentCards = (currentPage - 1) * cardsPerPage + 1;
    const endCurrentCards = Math.min(currentPage * cardsPerPage, searchCards.length);
    const totalCurrentCards = searchCards.length;
    const noCards = searchCards.length === 0;

  return (
    <>
      <Hero/>
        <Flex direction='column' align='center' gap={20}>
            <Flex wrap="wrap" gap={30} justify="center" w={isMobile ? "100%" : "80%"} >
                {paginatedCards.map((id:string) => (
                    <MiniCard cardID={id} key={id}/>
                ))}
            </Flex>
             {!noCards && 
                <Text fw={500}>Showing {startCurrentCards} to {endCurrentCards} of {totalCurrentCards} results</Text>}

            {!noCards && 
                <Pagination
                    mt="md"
                    total={searchCards ? Math.ceil(searchCards.length / cardsPerPage) : 0}
                    value={currentPage}
                    onChange={(page)=>{
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />}

           
            {noCards && 
                <Box ta='center'>
                    <IconMoodSad2 color='red' size={80}/>
                    <Title order={2} fw={700} c='red'>No Cards Found</Title>
                </Box>}

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
