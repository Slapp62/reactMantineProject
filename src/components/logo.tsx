import { Group,Image,Text } from "@mantine/core";

export function Logo() {
    return (
        <Group>
              <Image
              src="/src/flavicon.png"
              alt="Logo"
              style={{ width: '30px', height: '30px'}}/>
            
              <Text size="xl" c="white">Bizness Cardz</Text>
        </Group>
    )
}