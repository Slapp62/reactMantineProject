import { TCards } from "@/Types";
import { Card, Center, Text, Image, List, ListItem, Flex } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export  function  FullCard() {
    
    const [card, setCard] = useState<TCards>();
    const {id} = useParams();

    const getCard = async () => {
        return await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
    }

    useEffect(() => {
        const loadCard = async () => {
            const response = await getCard();
            setCard(response.data);
            
            
        }  
    loadCard();
    }, [])
    
    
    return (
        <Center>
           {card && <Card miw='30%' h='100%' shadow="sm" padding="lg" radius="md" withBorder my={20} >
                <Card.Section>
                    <Image
                    src={card!.image.url}
                    height={200}
                    alt="picture"
                    fit='cover'
                    loading='lazy'
                    fallbackSrc='https://www.irisoele.com/img/noimage.png'
                    p={10}
                    />
                </Card.Section> 

                <Card.Section p={15} >
                    <Text  size="xl" fw={500}>{card!.title}</Text>
      
                    <Text  size="lg" w='90%'>{card!.description}</Text>
                    <hr/>
                    <Text size='md'>{card!.subtitle}</Text>

                    <Flex justify='space-evenly' mt={20} >
                       <List w='45%'>
                            <Text>Contact</Text>
                            <hr/>
                            <ListItem>Phone: {card!.phone}</ListItem>
                            <ListItem>Email: {card!.email}</ListItem>
                            <ListItem>Website: {card!.web}</ListItem>
                        </List> 
                                   
                        <List w='45%'>
                            <Text>Address</Text>
                            <hr/>
                            <ListItem>Country: {card!.address.country}</ListItem>
                            <ListItem>City: {card!.address.city}</ListItem>
                            <ListItem>State: {card!.address.state}</ListItem>
                            <ListItem>Street: {card!.address.street}</ListItem>
                            <ListItem>Number: {card!.address.houseNumber}</ListItem>
                            <ListItem>Zipcode: {card!.address.zip}</ListItem>
                        </List>
                    </Flex>

                </Card.Section>
            </Card>}
        </Center>
            
          
       
    )
}