import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconCopyright } from '@tabler/icons-react';
import { ActionIcon, Anchor, Group, Text } from '@mantine/core';
import classes from './FooterStyles.module.css';
import { Logo } from '../Logo/logo';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Store' },
  { link: '#', label: 'Careers' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Logo />
      
        <Text c='gray'>Created by Simcha Lapp</Text>
      </div>
    </div>
  );
}