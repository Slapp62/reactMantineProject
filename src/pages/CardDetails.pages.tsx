import { Card, Text, Image, List, ListItem, Flex, Title, Container} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useParams } from "react-router-dom"
import { FavoritesButton } from "@/components/Buttons/AddToFavorites";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function CardDetails() {
    const isMobile = useMediaQuery('(max-width: 700px)');
    const {id} = useParams();
    const user = useSelector((state:RootState) => state.userSlice.user);
    const allCards = useSelector((state:RootState) => state.cardSlice.cards);
    const card = allCards?.find((card) => card._id === id);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    
    return ( 
        <Container style={{width: isMobile ? "90%" : "40%"}}>
            <Title ta="center" my={10}>Card Details</Title>
            <Card shadow="sm" padding="lg" radius="md" withBorder mx="auto">
                <Card.Section>
                    <Image
                    src={card?.image.url}
                    height={250}
                    alt="picture"
                    fit='cover'
                    loading='lazy'
                    fallbackSrc='https://www.irisoele.com/img/noimage.png'
                    p={10}
                    style={{objectPosition:"center"}}
                    />
                </Card.Section> 

                <Card.Section p={15} >
                    <Text  size="xl" fw={500}><strong>Title:</strong> {card?.title}</Text>
                    <Text size='md'><strong>Subtitle:</strong> {card?.subtitle}</Text>
                    <hr/>
                    <Text  size="lg" w='90%'><strong>Description:</strong> {card?.description}</Text>
                    <hr/>
                    <Flex justify='space-between' mt={10} gap={10} direction='column'>
                        <List spacing={5} style={{wordBreak: 'break-word'}} w='100%'>
                            <Title order={4}>Contact</Title>
                            <ListItem><strong>Phone:</strong> {card?.phone}</ListItem>
                            <ListItem><strong>Email:</strong> {card?.email}</ListItem>
                            <ListItem ><strong>Website:</strong> {card?.web}</ListItem>
                        </List> 

                        <List spacing={5} style={{wordBreak: 'break-word'}} w='100%'>
                            <hr/>
                            <Title order={4}>Address</Title>
                            <ListItem><strong>Country:</strong> {card?.address.country}</ListItem>
                            <ListItem><strong>City:</strong> {card?.address.city}</ListItem>
                            <ListItem><strong>State:</strong> {card?.address.state}</ListItem>
                            <ListItem><strong>Street:</strong> {card?.address.street}</ListItem>
                            <ListItem><strong>Number:</strong> {card?.address.houseNumber}</ListItem>
                            <ListItem><strong>Zipcode:</strong> {card?.address.zip}</ListItem>
                        </List>

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
                </Card.Section>

            {user && 
            <Flex my={5} justify="space-evenly">
                    {card && <FavoritesButton card={card} />}
            </Flex>}
            </Card>
        </Container>
    )
}