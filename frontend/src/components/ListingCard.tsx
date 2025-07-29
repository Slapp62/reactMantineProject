import React from 'react';
import { IconArrowBackUp, IconEdit, IconTrash } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { BsTranslate } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Card, Flex, Group, List, ListItem, Modal, Text, Title } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useDeleteListing } from '@/hooks/UseDeleteCard';
import { RootState } from '@/store/store';
import { useTranslateHEtoEN } from '../hooks/UseTranslateHEtoEN';
import { FavoritesButton } from './Buttons/FavoritesButton';
import SocialIcons from './SocialMedia';

function ListingCard({ listingID }: { listingID: string }) {
  const listing = useSelector((state: RootState) =>
    state.listingSlice.listings?.find((listing) => listing._id === listingID)
  );
  if (!listing) {
    return null;
  }

  const [opened, { open, close }] = useDisclosure(false);

  const deleteCard = useDeleteListing();
  const location = useLocation();
  const myListingsPage = location.pathname === '/my-listings';
  const loggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);
  const isMobile = useMediaQuery('(max-width: 500px)');
  const {
    currentLang,
    translatedText,
    handleTranslate,
    containsHebrew,
    translationLoading,
    cardString,
  } = useTranslateHEtoEN(listing.jobTitle, listing.jobDescription);

  return (
    <motion.div
      key={listing._id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ width: isMobile ? '90%' : '320px' }}
    >
      <Card shadow="sm" radius="md" withBorder>
        <Card.Section px={15}>
          <Box p={5}>
            <Title order={2} ta="center" my="xs" fw={500}>
              {translatedText ? translatedText[0] : listing.jobTitle}{' '}
            </Title>
            <hr />
            <Text truncate>{translatedText ? translatedText[2] : listing.jobDescription} </Text>

            <List>
              <ListItem>
                <strong>Region:</strong> {listing.location?.region}
              </ListItem>
              <ListItem>
                <strong>City:</strong> {listing.location?.city}
              </ListItem>
              <ListItem>
                <strong>Industry:</strong> {listing.industry}
              </ListItem>
              <ListItem>
                <strong>Work Type:</strong> {listing.workArrangement}
              </ListItem>
            </List>
            {listing.createdAt && (
              <Text fw={500} size="sm" mt={10}>
                Posted On: {new Date(listing.createdAt).toLocaleDateString()}
              </Text>
            )}
          </Box>

          <Flex mx="auto" my={10} gap={5} direction="column">
            <Group justify="center">
              <Button
                h={40}
                style={{ flex: 1 }}
                fullWidth={!containsHebrew}
                variant="filled"
                fz={12}
                component={Link}
                to={`/listing-details/${listing._id}`}
              >
                <Text fw="bold">More Info</Text>
              </Button>

              {containsHebrew && (
                <Button
                  h={40}
                  style={{ flex: 1 }}
                  loading={translationLoading}
                  leftSection={currentLang === 'he' ? <BsTranslate /> : <IconArrowBackUp />}
                  variant="outline"
                  fz={12}
                  onClick={() => handleTranslate(cardString)}
                >
                  <Text fw="bold">{currentLang === 'he' ? 'Translate' : 'Original'}</Text>
                </Button>
              )}
            </Group>

            <Group justify="center">
              {loggedIn && myListingsPage && (
                <Button
                  variant="outline"
                  color="green"
                  style={{ flex: 1 }}
                  component={Link}
                  to={`/edit-listing/${listing._id}`}
                >
                  <IconEdit />
                </Button>
              )}

              {myListingsPage && (
                <Button variant="outline" style={{ flex: 1 }} color="red" onClick={open}>
                  <IconTrash />
                </Button>
              )}
            </Group>

            <Group>
              {loggedIn && <FavoritesButton listing={listing} />}

              <Group mx="auto">
                <SocialIcons listingID={listing._id} />
              </Group>
            </Group>
          </Flex>
        </Card.Section>
      </Card>

      <Modal centered opened={opened} onClose={close} title="Confirmation">
        <Text>Are you sure you want to delete this card?</Text>
        <Group mt={20} justify="center">
          <Button
            color="red"
            onClick={() => {
              deleteCard(listing);
              close();
            }}
          >
            Yes, Delete It
          </Button>
          <Button variant="outline" onClick={close}>
            No, Take Me Back
          </Button>
        </Group>
      </Modal>
    </motion.div>
  );
}

export default React.memo(ListingCard, (prev, next) => prev.listingID === next.listingID);
