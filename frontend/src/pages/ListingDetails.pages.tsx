import { BsTranslate } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { Button, Card, Container, Flex, Group, List, ListItem, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FavoritesButton } from '@/components/Buttons/FavoritesButton';
import SocialIcons from '@/components/SocialMedia';
import useTranslateHEtoEN from '@/hooks/UseTranslateHEtoEN';
import { useCurrentUser, useIsJobseeker, useListings } from '@/utils/reduxHelperHooks';

export function ListingDetails() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const { id } = useParams();
  const user = useCurrentUser();
  const allListings = useListings();
  const isJobseeker = useIsJobseeker();
  const currListing = allListings.find((listing) => listing._id === id);

  const {
    currentLang,
    translatedText,
    handleTranslate,
    containsHebrew,
    translationLoading,
    cardString,
  } = useTranslateHEtoEN(currListing?.jobTitle, currListing?.jobDescription);

  return (
    <Container style={{ width: isMobile ? '100%' : '40%' }}>
      <Title ta="center" my={10}>
        Card Details
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder mx="auto">
        <Card.Section p={15}>
          <Flex direction="column" gap={10}>
            <Text size="xl" fw={500}>
              <strong>Title:</strong> {translatedText ? translatedText[0] : currListing?.jobTitle}
            </Text>
            <Text size="md" w="95%">
              <strong>Description:</strong>{' '}
              {translatedText ? translatedText[2] : currListing?.jobDescription}{' '}
            </Text>
            {currListing?.createdAt && (
              <Text size="sm" mt={5}>
                <strong>Posted: </strong>
                {new Date(currListing?.createdAt).toLocaleDateString()}
              </Text>
            )}

            {containsHebrew && (
              <Button
                loading={translationLoading}
                rightSection={<BsTranslate />}
                variant="outline"
                fz={12}
                onClick={() => handleTranslate(cardString)}
              >
                <Text fw="bold">{currentLang === 'he' ? 'Translate' : 'Show Original'}</Text>
              </Button>
            )}
          </Flex>

          <hr />
          <Flex justify="space-between" mt={10} gap={10} direction="column">
            <List spacing={5} style={{ wordBreak: 'break-word' }} w="100%">
              <Title order={4}>Contact</Title>
              <ListItem>
                <strong>Industry:</strong> {currListing?.industry}
              </ListItem>
              <ListItem>
                <strong>Requirments:</strong> {currListing?.requirements}
              </ListItem>
              <ListItem>
                <strong>Advantages:</strong> {currListing?.advantages}
              </ListItem>
              <ListItem>
                <strong>Region:</strong> {currListing?.location?.region}
              </ListItem>
              <ListItem>
                <strong>City:</strong> {currListing?.location?.city}
              </ListItem>
              <ListItem>
                <strong>Work Type:</strong> {currListing?.workArrangement}
              </ListItem>
            </List>

            <Button component="a" href={currListing?.apply.contact} target="_blank">
              Apply Now
            </Button>
          </Flex>
        </Card.Section>
        {user && (
          <Group my={5} justify="space-evenly">
            {currListing && isJobseeker && <FavoritesButton listing={currListing} />}
            {currListing && <SocialIcons listingID={currListing._id} />}
          </Group>
        )}
      </Card>
    </Container>
  );
}
