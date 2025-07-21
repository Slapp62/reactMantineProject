import flavicon from '/briefcase-icon.png';
import { Link } from 'react-router-dom';
import { Group, Image, Text } from '@mantine/core';
import classes from '../ComponentStyles/Logo.module.css';

export function Logo() {
  return (
    <Group>
      <Image src={flavicon} alt="Logo" style={{ width: '30px', height: '30px' }} />

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Text fw="bold" size="xl" className={classes.textColor}>
          IsraJobs
        </Text>
      </Link>
    </Group>
  );
}
