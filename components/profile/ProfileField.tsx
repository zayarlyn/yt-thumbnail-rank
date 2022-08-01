import { useRef } from 'react';
import { Text, Editable, Box, EditablePreview, EditableInput, useToast } from '@chakra-ui/react';
import EditableControls from './EditableControls';
import { updatePublicUser} from '../../lib/firestoreUtils';

interface Props {
  value: string;
  label: string;
}

const ProfileField: React.FC<Props> = ({ value, label }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();

  const handleUpdate = async () => {
    const new_value = inputRef.current?.value;
    if (new_value === value) return;
    await updatePublicUser({ username: new_value as string });
    toast({ description: 'Username updated', status: 'success', position: 'top', duration: 2000 });
  };

  return (
    <Editable onSubmit={handleUpdate} size='sm' defaultValue={value}>
      <Text as='label' pl={2}>
        {label}:
      </Text>
      <Box
        fontSize='lg'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        columnGap={4}
        w='100%'
      >
        <EditablePreview fontWeight='medium' pl={2} />
        <EditableInput ref={inputRef} fontWeight='medium' pl={2} />
        <EditableControls />
      </Box>
    </Editable>
  );
};

export default ProfileField;
