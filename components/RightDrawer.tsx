import { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Stack,
  Box,
  FormLabel,
  FormControl,
  Input,
  DrawerBody,
  FormErrorMessage,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { AuthStoreType, useAuthStore } from '../store/auth';
import { AddToUserThumbnails, uploadThumbnail } from '../lib/firebaseUtils';
import Thumbnail from './Thumbnail';

const RightDrawer = () => {
  const { user } = useAuthStore() as AuthStoreType;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [thumb_link, setThumb_link] = useState<undefined | string>();
  const [url, setUrl] = useState('');
  const toast = useToast();

  const handleUpload = async () => {
    setLoading(true);
    const { id } = await uploadThumbnail({ yt_link: url, by: user?.uid });
    await AddToUserThumbnails(id);
    toast(toastConfig);
    setUrl('');
    setLoading(false);
    setThumb_link(undefined);
    onClose();
  };
  const handleGenerate = () => {
    setThumb_link(url);
  };

  return (
    <>
      <Button
        leftIcon={
          <AddIcon transitionDuration='200ms' _groupHover={{ transform: 'rotate(90deg)' }} />
        }
        onClick={onOpen}
        zIndex={5}
        position='fixed'
        bottom={8}
        right={8}
        bgColor='teal.300'
        color='gray.800'
        role='group'
        _hover={{ bgColor: 'teal.200' }}
      >
        upload
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Submit a thumbnail</DrawerHeader>
          <DrawerCloseButton mt={2} />
          <DrawerBody>
            <Stack mt={8} spacing={12}>
              <Box>
                <FormControl isInvalid={thumb_link === ''}>
                  {/* <FormControl> */}
                  <FormLabel htmlFor='video_link'>Youtube video Link</FormLabel>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    id='video_link'
                    placeholder='Please enter video link'
                  />
                  <FormErrorMessage>link is invalid</FormErrorMessage>
                </FormControl>
                <Button
                  onClick={handleGenerate}
                  mt={4}
                  bg='teal.300'
                  w='full'
                  _hover={{ bgColor: 'teal.200' }}
                >
                  Generate thumbnail
                </Button>
              </Box>
              {thumb_link && (
                <Box>
                  <Thumbnail v_link={thumb_link} />
                  <Button
                    onClick={handleUpload}
                    isLoading={loading}
                    mt={8}
                    bg='teal.300'
                    w='full'
                    _hover={{ bgColor: 'teal.200' }}
                  >
                    Upload
                  </Button>
                </Box>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RightDrawer;

const toastConfig: UseToastOptions = {
  title: 'thumbnail uploaded',
  description: 'Thank you for your contribution',
  status: 'success',
  position: 'top',
  duration: 2000,
};
