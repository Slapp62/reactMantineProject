import { Card, Text, Image, List, ListItem, Flex, Title, Container, Button, Group} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useParams } from "react-router-dom"
import { FavoritesButton } from "@/components/Buttons/FavoritesButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useTranslateHEtoEN from "@/hooks/UseTranslateHEtoEN";
import { BsTranslate } from "react-icons/bs";
import SocialIcons from "@/components/SocialMedia";

export function CardDetails() {
    const isMobile = useMediaQuery('(max-width: 700px)');
    const {id} = useParams();
    const user = useSelector((state:RootState) => state.userSlice.user);
    const allCards = useSelector((state:RootState) => state.cardSlice.cards);
    const card = allCards.find((card) => card._id === id);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const {currentLang, translatedText, handleTranslate, containsHebrew, translationLoading, cardString} = 
        useTranslateHEtoEN(card?.title, card?.subtitle, card?.description);
    
    
    return ( 
        <Container style={{width: isMobile ? "100%" : "40%"}}>
            <Title ta="center" my={10}>Card Details</Title>
            <Card shadow="sm" padding="lg" radius="md" withBorder mx="auto">
                <Card.Section>
                    <Image
                    src={card?.image.url}
                    height={250}
                    alt="picture"
                    fit='cover'
                    loading='lazy'
                    fallbackSrc='https://images.pexels.com/photos/5598328/pexels-photo-5598328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    p={10}
                    style={{objectPosition:"center"}}
                    />
                </Card.Section> 

                <Card.Section p={15} >
                    <Flex direction='column' gap={10}>
                        <Text size="xl" fw={500}><strong>Title:</strong> {translatedText ? translatedText[0] : card?.title}</Text>
                        <Text size='md'><strong>Subtitle:</strong> {translatedText ? translatedText[1] : card?.subtitle}</Text>
                        <Text size="md" w='95%'><strong>Description:</strong> {translatedText ? translatedText[2] : card?.description} </Text>
                        {card?.createdAt && <Text size="sm" mt={5}><strong>Posted: </strong>{new Date(card?.createdAt).toLocaleDateString()}</Text>}
                    
                    
                    {containsHebrew &&    
                    <Button loading={translationLoading} rightSection={<BsTranslate/>} variant='outline' fz={12} 
                        onClick={() => handleTranslate(cardString)}>
                        <Text fw='bold'>{currentLang === 'he' ? 'Translate' : 'Show Original'}</Text>
                    </Button>}
                    </Flex>

                    <hr/>
                    <Flex justify='space-between' mt={10} gap={10} direction='column'>
                        <List spacing={5} style={{wordBreak: 'break-word'}} w='100%'>
                            <Title order={4}>Contact</Title>
                            <ListItem><strong>Phone:</strong> {card?.phone}</ListItem>
                            <ListItem><strong>Email:</strong> {card?.email}</ListItem>
                            {card?.web && <ListItem ><strong>Website:</strong> {card?.web}</ListItem>}
                            <hr/>
                        </List> 

                        <Flex justify='space-between' direction='column' gap={20}>    
                            <List spacing={5} style={{wordBreak: 'break-word'}}>
                                <Title order={4}>Address</Title>
                                <ListItem><strong>Country:</strong> {card?.address.country}</ListItem>
                                <ListItem><strong>City:</strong> {card?.address.city}</ListItem>
                                {card?.address.state && <ListItem><strong>State:</strong> {card?.address.state}</ListItem>}
                                <ListItem><strong>Street:</strong> {card?.address.street}</ListItem>
                                <ListItem><strong>Number:</strong> {card?.address.houseNumber}</ListItem>
                                <ListItem><strong>Zipcode:</strong> {card?.address.zip}</ListItem>
                            </List>

                            <Flex>
                                {card && 
                                <iframe
                                    title="Google Map"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0, borderRadius: "10px", marginTop: "0rem" }}
                                    src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
                                        `${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.country}`
                                    )}`}
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                />}
                            </Flex>
                        </Flex>
                    </Flex>     
                </Card.Section>

            {user && 
            <Group my={5} justify="space-evenly">
                    {card && <FavoritesButton card={card} />}
                    {card && <SocialIcons cardID={card._id} />}
            </Group>}
            </Card>
        </Container>
    )
}