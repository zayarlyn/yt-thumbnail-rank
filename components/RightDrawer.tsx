import { useReducer } from 'react';
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
import { uploadThumbnail, recordUploadedThumbInUser } from '../lib/firestoreUtils';
import Thumbnail from './Thumbnail';

const defaultValue: S = {
  url: '',
  descr: '',
  thumb: null,
  loading: false,
};

const reducer = (state: S, action: A): S => {
  const { type, payload } = action;
  switch (type) {
    case 'URL':
      return { ...state, url: payload };
    case 'DESCR':
      return { ...state, descr: payload };
    case 'THUMB':
      return { ...state, thumb: payload };
    case 'LOADING':
      return { ...state, loading: !state.loading };
    case 'MINAZUKI':
      return { ...defaultValue };
    default:
      return state;
  }
};
// three, two, one, FIRE !!
const RightDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ descr, url, loading, thumb }, dispatch] = useReducer(reducer, defaultValue);
  const toast = useToast();

  const handleUpload = async () => {
    dispatch({ type: T.LOADING, payload: '' });
    const { id } = await uploadThumbnail({ yt_link: url, descr: descr.trim() });
    await recordUploadedThumbInUser(id);
    toast(toastConfig);
    dispatch({ type: T.MINAZUKI, payload: '' });
    onClose();
  };
  const handleGenerate = () => {
    dispatch({ type: T.THUMB, payload: url });
  };

  // https://www.youtube.com/watch?v=ktvB21Jnxi4
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
                <FormControl isInvalid={thumb === ''}>
                  <FormLabel htmlFor='v_link'>Youtube video Link</FormLabel>
                  <Input
                    value={url}
                    onChange={(e) => dispatch({ type: T.URL, payload: e.target.value })}
                    id='v_link'
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
              {thumb ? (
                <Box>
                  <Thumbnail yt_link={thumb} />
                  <FormLabel htmlFor='v_descr' mt={6}>
                    Video Description
                  </FormLabel>
                  <Input
                    autoFocus
                    autoComplete='off'
                    value={descr}
                    onChange={(e) => dispatch({ type: T.DESCR, payload: e.target.value })}
                    id='v_descr'
                    placeholder='paste original or write your own'
                  />
                  <Button
                    onClick={handleUpload}
                    isLoading={loading}
                    bg='teal.300'
                    mt={4}
                    w='full'
                    _hover={{ bgColor: 'teal.200' }}
                  >
                    Upload
                  </Button>
                </Box>
              ) : null}
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
// 139

interface S {
  url: string;
  descr: string;
  thumb: string | null;
  loading: boolean;
}

enum T {
  URL = 'URL',
  DESCR = 'DESCR',
  THUMB = 'THUMB',
  LOADING = 'LOADING',
  MINAZUKI = 'MINAZUKI',
}

interface A {
  type: T;
  payload: string;
}
