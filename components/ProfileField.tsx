import { useRef, useState } from 'react';
import { Text, Editable, FormLabel, Box, EditablePreview, EditableInput } from '@chakra-ui/react';
import EditableControls from './EditableControls';
import { updateUserInfo } from '../firebaseUtils';
import { User } from 'firebase/auth';

interface Props {
  value: string;
  label: string;
}

const ProfileField: React.FC<Props> = ({ value, label }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleUpdate = () => {
    const new_value = inputRef.current?.value;
    updateUserInfo({ displayName: new_value } as User);
  };

  return (
    <Editable
      onSubmit={handleUpdate}
      size='sm'
      defaultValue={value}
    >
      <Text as='label' pl={2}>
        {label}:
      </Text>
      <Box
        fontSize='lg'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        columnGap={4}
      >
        <EditablePreview fontWeight='medium' pl={2} />
        <EditableInput ref={inputRef} fontWeight='medium' pl={2} />
        <EditableControls />
      </Box>
    </Editable>
  );
};

export default ProfileField;
