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
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import ProfileField from './ProfileField';

const UserDetail = () => {
  const [pfp_link, setPfp_link] = useState({ value: '', isEditing: false });
  const urlRef = useRef<HTMLInputElement | null>(null);

  const handleUpdatePfp = () => {
    const new_pfp = urlRef.current?.value;
    setPfp_link((prev) => ({ value: new_pfp ? new_pfp : prev.value, isEditing: false }));
    // if (!new_pfp) return;
  };

  return (
    <>
      <Box display='flex' alignItems='center' columnGap={12}>
        <Box position='relative' role='group'>
          <Avatar
            name='kira yoshikage'
            src={'https://avatars.githubusercontent.com/u/1332805?v=4'}
            {...(avatarprops as AvatarProps)}
          ></Avatar>
          <Button
            onClick={() =>
              setPfp_link(({ value, isEditing }) => ({ value, isEditing: !isEditing }))
            }
            {...(buttonprops as ButtonProps)}
          ></Button>
          <EditIcon {...(iconprops as IconProps)} />
        </Box>
        <VStack align='stratch' flexGrow={1} p={2}>
          <ProfileField dValue='Ikari Shinji' label='username' />
          <ProfileField dValue='FryMyRice' label='channel' />
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
        </VStack>
      </Box>
      {pfp_link.isEditing && (
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
