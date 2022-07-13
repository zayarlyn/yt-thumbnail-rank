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
} from '@chakra-ui/react';
import { EditIcon, CheckIcon } from '@chakra-ui/icons';
import { User } from 'firebase/auth';
import { updateUserInfo } from '../firebaseUtils';

interface Props {
  username: string;
  photoUrl: string | null;
}

const UserPfp: React.FC<Props> = ({ username, photoUrl }) => {
  const [{ url, isEditing }, setLocal] = useState({ url: photoUrl, isEditing: false });
  const urlRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const handleUpdatePfp = async () => {
    const new_pfp = urlRef.current?.value ?? null;
    setLocal({ url: new_pfp, isEditing: false });
    await updateUserInfo({ photoURL: new_pfp } as User);
    toast({
      description: 'Profile picture updated',
      status: 'success',
      position: 'top',
      duration: 2000,
    });
  };

  const handleToggleEdit = () => {
    setLocal((prev) => ({ ...prev, isEditing: !prev.isEditing }));
  };

  return (
    <Box w={['90%', '35%']} flexShrink={0} maxW={[64]} mx='auto'>
      <AspectRatio w='full' ratio={1 / 1}>
        <Box onClick={handleToggleEdit} cursor='pointer' borderRadius='50%' position='relative' role='group'>
          <Avatar name={username} src={url ?? ''} w='full' h='full' />
          <Box {...(boxprops as ChakraProps)} />
          <EditIcon {...(iconprops as IconProps)} />
        </Box>
      </AspectRatio>
      {isEditing && (
        <Flex w='full' position={{ sm: 'absolute' }} bottom={{ sm: -12 }} mt={4} pb={0}>
          <Input ref={urlRef} placeholder='profile url' size='sm' />
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
