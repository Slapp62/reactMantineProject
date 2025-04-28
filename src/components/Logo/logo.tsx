import { Group,Image,Text } from "@mantine/core";
import flavicon from '/src/flavicon.png'
import classes from './Logo.module.css'

export function Logo() {
    
    return (
        <Group mr={10}>
              <Image
              src={flavicon}
              alt="Logo"
              style={{ width: '30px', height: '30px'}}/>
            
              <Text fw='bold' size="xl" className={classes.textColor}>Business Cards</Text>
        </Group>
    )
}