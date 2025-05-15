import { FC } from 'react';
import {
  Container,
  Title,
  Text,
  Grid,
  Image,
  Paper,
  Group,
  ThemeIcon,
} from '@mantine/core';
import {
  IconBriefcase,
  IconUsers,
  IconWorld,
} from '@tabler/icons-react';

const AboutPage: FC = () => {
  return (
    <Container size="md" py="xl">
      <Title order={2} mb="md">
        About Us
      </Title>

      <Text size="lg" mb="xl">
        At <strong>IsraJobs</strong>, we connect motivated professionals in Israel with companies seeking great talent.
        Whether you're hiring or job-hunting, our goal is to make the process faster, fairer, and more effective.
      </Text>

      <Grid gutter="xl" mb="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image
            radius="md"
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
            alt="People collaborating"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="md" p="md" radius="md">
            <Title order={4}>Our Mission</Title>
            <Text mt="sm">
              We’re building the go-to platform for job seekers and employers to connect with purpose.
              From transparent listings to smart matching tools, we’re reshaping the future of work.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      <Group grow>
        <Stat icon={<IconBriefcase size={24} />} label="Jobs Posted" value="12.5m+" />
        <Stat icon={<IconUsers size={24} />} label="Employers" value="3.2b+" />
        <Stat icon={<IconWorld size={24} />} label="Countries Served" value="All" />
      </Group>
    </Container>
  );
};

type StatProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const Stat: FC<StatProps> = ({ icon, label, value }) => (
  <Paper shadow="xs" p="md" radius="md" withBorder>
    <Group>
      <ThemeIcon variant="light" size="lg" radius="xl">
        {icon}
      </ThemeIcon>
      <div>
        <Text size="lg" fw={500}>
          {value}
        </Text>
        <Text size="sm" c="dimmed">
          {label}
        </Text>
      </div>
    </Group>
  </Paper>
);

export default AboutPage;
