import { TCards } from "@/Types";
import { Card, Text, Image, List, ListItem, Flex, Title, Container, Button, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { FavoritesButton } from "@/components/Buttons/AddToFavorites";
import { IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconShare, IconShare2, IconShare3 } from "@tabler/icons-react";

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
            } catch (error) {
                console.error(error);
            }
        }  
    loadCard();
    }, [])
    
    
    return ( 
        <Container style={{width: isMobile ? "90%" : "30%"}}>
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
                    <Text  size="xl" fw={500}>{card?.title}</Text>

                    <Text  size="lg" w='90%'>{card?.description}</Text>
                    <hr/>
                    <Text size='md'>{card?.subtitle}</Text>

                    <Flex justify='space-between' mt={20}>
                        <List style={{wordBreak: 'break-word'}} w='40%'>
                            <Title order={4}>Contact</Title>
                            <hr/>
                            <ListItem>Phone: {card?.phone}</ListItem>
                            <ListItem>Email: {card?.email}</ListItem>
                            <ListItem >Website: {card?.web}</ListItem>
                        </List> 
                                
                        <List style={{wordBreak: 'break-word'}} w='40%'>
                            <Title order={4}>Address</Title>
                            <hr/>
                            <ListItem>Country: {card?.address.country}</ListItem>
                            <ListItem>City: {card?.address.city}</ListItem>
                            <ListItem>State: {card?.address.state}</ListItem>
                            <ListItem>Street: {card?.address.street}</ListItem>
                            <ListItem>Number: {card?.address.houseNumber}</ListItem>
                            <ListItem>Zipcode: {card?.address.zip}</ListItem>
                        </List>
                    </Flex>

                </Card.Section>
            </Card>

            <Group my={10} gap={10} justify="space-evenly">
                {card && <FavoritesButton card={card} />}
                <Button variant='outline'><IconShare/></Button>
                <Button variant='outline' c="green"><IconBrandWhatsapp/></Button>
                <Button variant='outline'><IconBrandLinkedin/></Button> 
                <Button variant='outline'><IconBrandInstagram/></Button> 
            </Group>

        </Container>
    )
}