import { Text, Editable, FormLabel, Box, EditablePreview, EditableInput } from '@chakra-ui/react';
import EditableControls from './EditableControls';

const ProfileField: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <Editable size='sm' defaultValue={'df'} value={value} isPreviewFocusable={false}>
      <Text as='label' pl={2}>{label}:</Text>
      <Box fontSize='lg' display='flex' alignItems='center' justifyContent='space-between' columnGap={4}>
        <EditablePreview fontWeight='medium' pl={2} />
        <EditableInput fontWeight='medium' pl={2}/>
        <EditableControls />
      </Box>
    </Editable>
  );
};

export default ProfileField;
