import { useState, useRef } from 'react';
import {
  Box,
  VStack,
  Text,
  Avatar,
  Button,
  IconProps,
  ButtonProps,
  AvatarProps,
  Input,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import { updateUserInfo } from '../firebaseUtils';
import ProfileField from './ProfileField';

const UserDetail = ({ user }: { user: User }) => {
  const [isEditing, setIsEditing] = useState(false);
  const urlRef = useRef<HTMLInputElement | null>(null);
  const username = user?.displayName ?? user?.uid.slice(0, 9) ?? '';

  const handleUpdatePfp = async () => {
    const new_pfp = urlRef.current?.value;
    await updateUserInfo({ photoURL: new_pfp } as User);
    setIsEditing(false);
  };

  return (
    <>
      <Box display='flex' alignItems='center' columnGap={12}>
        <Box position='relative' role='group'>
          <Avatar
            name={username}
            src={user?.photoURL ?? ''}
            {...(avatarprops as AvatarProps)}
          ></Avatar>
          <Button
            onClick={() => setIsEditing((prev) => !prev)}
            {...(buttonprops as ButtonProps)}
          ></Button>
          <EditIcon {...(iconprops as IconProps)} />
        </Box>
        <VStack align='stratch' flexGrow={1} p={2}>
          <ProfileField value={username} label='username' />
          {/* <ProfileField value='FryMyRice' label='channel' /> */}
          <Box pl={2}>
            clicked:
            <Text as='span' ml={2} fontWeight='medium'>
              {56}
            </Text>
          </Box>
          <Box pl={2}>
            thumbnails:
            <Text as='span' ml={2} fontWeight='medium'>
              {7}
            </Text>
          </Box>
          <Box pl={2}>
            email:
            <Text as='span' ml={2} fontWeight='medium'>
              {user.email}
            </Text>
          </Box>
        </VStack>
      </Box>
      {isEditing && (
        <Flex mt={6}>
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
    </>
  );
};

export default UserDetail;

const avatarprops = {
  width: '10rem',
  height: '10rem',
  size: '3xl',
  fontSize: '4xl',
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

const buttonprops = {
  maxW: 'none',
  width: 'full',
  height: 'full',
  position: 'absolute',
  borderRadius: '50%',
  top: 0,
  left: 0,
  opacity: 0,
  _hover: { opacity: 0.4, bgColor: 'gray.600' },
};
// https://i.pinimg.com/736x/b3/43/cb/b343cbb24c0954a5dd04c79fe6c36abe.jpg
// https://avatars.githubusercontent.com/u/1332805?v=4
