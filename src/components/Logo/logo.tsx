import { Group,Image,Text } from "@mantine/core";
import flavicon from '/src/flavicon.png'

export function Logo() {
    return (
        <Group>
              <Image
              src={flavicon}
              alt="Logo"
              style={{ width: '30px', height: '30px'}}/>
            
              <Text size="xl" c='black'>Bizness Cardz</Text>
        </Group>
    )
}