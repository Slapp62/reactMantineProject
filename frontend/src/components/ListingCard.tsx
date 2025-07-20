import { Card, Image, Text, Button, Flex, ListItem, List, Box, Group, Modal, Skeleton} from '@mantine/core';
import { IconArrowBackUp, IconEdit, IconTrash } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Link, useLocation } from 'react-router-dom';
import { useDeleteListing } from '@/hooks/UseDeleteCard';
import { FavoritesButton } from './Buttons/FavoritesButton';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useTranslateHEtoEN } from '../hooks/UseTranslateHEtoEN';
import { BsTranslate } from 'react-icons/bs';
import React from 'react';
import { motion } from 'framer-motion';
import SocialIcons from './SocialMedia';

function ListingCard({ listingID} : { listingID: string}) {
    const listing = useSelector((state:RootState) => state.listingSlice.listings?.find((listing) => listing._id === listingID));
    const isLoading = useSelector((state:RootState) => state.listingSlice.loading);
    if (!listing) {return null};
    
    const [opened, { open, close }] = useDisclosure(false);

    const deleteCard = useDeleteListing();
    const location = useLocation();
    const myListingsPage = location.pathname === '/my-listings';
    const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
    const isMobile = useMediaQuery('(max-width: 500px)');
    const {currentLang,translatedText, handleTranslate, containsHebrew, translationLoading, cardString} = 
    useTranslateHEtoEN(listing.title, listing.subtitle, listing.description);

  return (
    <motion.div
        key={listing._id}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        style={{width: isMobile ? '90%' : '320px'}}
        >
            
        <Card shadow="sm" radius="md" withBorder>
        <Card.Section>
            <Skeleton visible={isLoading}>
                <Image
                src={listing.image.url}
                height={160}
                alt="picture"
                fit='cover'
                loading='lazy'
                fallbackSrc='https://images.pexels.com/photos/5598328/pexels-photo-5598328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                />
            </Skeleton>
        
        </Card.Section> 

        <Card.Section px={15}>
            <Box p={5}>
                <Text truncate my="xs" fw={500}>{translatedText ? translatedText[0] : listing.title} </Text>
                <Text truncate >{translatedText ? translatedText[1] : listing.subtitle}</Text>
                <hr/>
                <Text truncate >{translatedText ? translatedText[2] : listing.description} </Text>
            
                <List>
                    <ListItem>{listing.phone}</ListItem>
                    <ListItem>{listing.email}</ListItem>
                    
                </List>
                {listing.createdAt && <Text fw={500} size='sm' mt={10}>Posted On: {new Date(listing.createdAt).toLocaleDateString()}</Text>}
            </Box>

            <Flex mx="auto"  my={10} gap={5} direction='column'>
                <Group justify='center'>
                    <Button  h={40} style={{flex: 1}} fullWidth={!containsHebrew} variant='filled' fz={12} component={Link} to={`/listing-details/${listing._id}`}>
                        <Text fw='bold'>More Info</Text>
                    </Button>

                    {containsHebrew &&    
                        <Button 
                            h={40}
                            style={{flex: 1}}
                            loading={translationLoading} 
                            leftSection={currentLang === 'he' ? <BsTranslate/> : <IconArrowBackUp/>} 
                            variant='outline' fz={12} 
                            onClick={() => handleTranslate(cardString)}
                            >
                            <Text fw='bold'>{currentLang === 'he' ? 'Translate' : "Original"}</Text>
                        </Button>}

                </Group>
                

                <Group justify='center'>
                    {loggedIn && myListingsPage && 
                    <Button variant='outline' color='green' style={{flex: 1}} component={Link} to={`/edit-card/${listing._id}`}>
                        <IconEdit/>
                    </Button>}

                    {myListingsPage && 
                    <Button variant='outline' style={{flex: 1}} color='red' onClick={open}>
                        <IconTrash />
                    </Button>}
                 </Group>
                
                <Group>
                    {loggedIn && <FavoritesButton listing={listing}/>}

                    <Group mx='auto'>
                        <SocialIcons listingID={listing._id}/>
                    </Group>
                </Group>
            </Flex>
        </Card.Section>
        </Card>

        <Modal centered opened={opened} onClose={close} title="Confirmation">
            <Text>Are you sure you want to delete this card?</Text>
            <Group mt={20} justify="center">
                <Button color="red" onClick={() => {
                    deleteCard(listing);
                    close();
                }}>
                Yes, Delete It</Button>
                <Button variant="outline" onClick={close}>No, Take Me Back</Button>
            </Group>
        </Modal>
    </motion.div>
  );
}

export default React.memo(ListingCard, (prev, next) => prev.listingID === next.listingID);
