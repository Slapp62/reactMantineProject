import { TJobListing } from "@/Types";
import { Flex } from "@mantine/core"
import ListingCard from "./ListingCard";
import { useMediaQuery } from "@mantine/hooks";

function MappedListings(props: {listingsArr : TJobListing[]})  {
    const isMobile = useMediaQuery('(max-width: 500px)');
    
    return (
        <Flex 
            wrap="wrap" 
            gap="lg" 
            align='stretch' 
            justify="center" 
            w={isMobile ? "100%" : "80%"} 
            >

            {props.listingsArr.map((card:TJobListing) => (
                <ListingCard key={card._id} listingID={card._id} />
            ))}
        </Flex>
    )
}

export default MappedListings