import { useState, useRef } from 'react';
import {
  Box,
  Flex,
  Input,
  IconButton,
  Avatar,
  IconProps,
  useToast,
  AspectRatio,
  ChakraProps,
  UseToastOptions,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';
import { updatePublicUser } from '../lib/firestoreUtils';

interface Props {
  username: string;
  photoUrl: string;
  isPrivate?: boolean;
}

const UserPfp: React.FC<Props> = ({ username, photoUrl, isPrivate }) => {
  const [{ url, isEditing }, setLocal] = useState({ url: photoUrl, isEditing: false });
  const urlRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const handleUpdatePfp = async () => {
    const new_pfp = urlRef.current?.value ?? '';
    setLocal({ url: new_pfp, isEditing: false });
    await updatePublicUser({ photoUrl: new_pfp });
    toast(toastOptions);
  };

  const handleToggleEdit = () => {
    setLocal((prev) => ({ ...prev, isEditing: !prev.isEditing }));
  };

  return (
    <Box w={['90%', '35%']} flexShrink={0} maxW={[64]} mx='auto'>
      <AspectRatio w='full' ratio={1 / 1}>
        <Box
          onClick={handleToggleEdit}
          cursor={isPrivate ? 'pointer': 'auto'}
          borderRadius='50%'
          position='relative'
          role='group'
        >
          <Avatar name={username} src={url ?? ''} w='full' h='full' />
          {isPrivate ? (
            <>
              <Box {...(boxprops as ChakraProps)} />
              <EditIcon {...(iconprops as IconProps)} />
            </>
          ) : null}
        </Box>
      </AspectRatio>
      {isPrivate && isEditing && (
        <Flex w='full' position={{ sm: 'absolute' }} bottom={{ sm: -12 }} mt={4} pb={0}>
          <Input
            autoFocus
            defaultValue={photoUrl}
            ref={urlRef}
            placeholder='profile url'
            size='sm'
          />
          <IconButton
            onClick={handleUpdatePfp}
            bgColor='cyan.300'
            ml={4}
            size='sm'
            aria-label='save pfp'
            icon={<CheckIcon />}
          />
        </Flex>
      )}
    </Box>
  );
};

export default UserPfp;

const toastOptions: UseToastOptions = {
  description: 'Profile picture updated',
  status: 'success',
  position: 'top',
  duration: 2000,
};

const iconprops = {
  position: 'absolute',
  transform: 'translateY(-50%) translateX(-50%)',
  left: '50%',
  top: '50%',
  fontSize: '2xl',
  opacity: 0,
  _groupHover: { opacity: 1 },
};

const boxprops = {
  width: 'full',
  height: 'full',
  position: 'absolute',
  borderRadius: '50%',
  top: 0,
  left: 0,
  opacity: 0,
  _groupHover: { opacity: 0.4, bgColor: 'gray.600' },
};
