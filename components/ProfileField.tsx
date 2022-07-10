import { Text, Editable, FormLabel, Box, EditablePreview, EditableInput } from '@chakra-ui/react';
import EditableControls from './EditableControls';

const ProfileField: React.FC<{ dValue: string; label: string }> = ({ dValue, label }) => {
  return (
    <Editable size='sm' defaultValue={dValue} isPreviewFocusable={false}>
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
