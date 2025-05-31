import { TCards } from "@/Types";
import { Card, Text, Image, List, ListItem, Flex, Title, Container} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { FavoritesButton } from "@/components/Buttons/AddToFavorites";
import { toast } from "react-toastify";

export function CardDetails() {
    const isMobile = useMediaQuery('(max-width: 700px)');
    const [card, setCard] = useState<TCards>();
    const {id} = useParams();

    const getCard = async () => {
        return await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
    }

    useEffect(() => {
        const loadCard = async () => {
            try {
                const response = await getCard();
                setCard(response.data);
            } catch (error : any) {
                toast.error(error, {position: "bottom-right"});
            }
        }  
    loadCard();
    }, [])
    
    
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
                            src={`https://www.google.com/maps?q=${encodeURIComponent(
                            `${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.country}`
                            )}&output=embed`}
                            allowFullScreen
                        />}
                    </Flex>     
                </Card.Section>

                <Flex my={5} justify="space-evenly">
                        {card && <FavoritesButton card={card} />}
                </Flex>
            </Card>
        </Container>
    )
}