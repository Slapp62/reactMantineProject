import { Group,Image,Text } from "@mantine/core";
import flavicon from '/src/flavicon.png'
import classes from './Logo.module.css'
import { Link } from "react-router-dom";

export function Logo() {
    
    return (
        <Group>
              <Image
              src={flavicon}
              alt="Logo"
              style={{ width: '30px', height: '30px'}}/>
            
            <Link to="/" style={{textDecoration: 'none'}}>
                <Text fw='bold' size="xl" className={classes.textColor}>isrAvoda</Text>
            </Link>
              
        </Group>
    )
}