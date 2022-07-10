import { useEditableControls } from '@chakra-ui/react';
import { ButtonGroup, IconButton, Flex } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

export default function EditableControls() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent='center'>
      <IconButton minW='none' w={6} h={6} icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label='confirm' />
      <IconButton minW='none' w={6} h={6} icon={<CloseIcon />} {...getCancelButtonProps()} aria-label='cancel' />
    </ButtonGroup>
  ) : (
    <Flex justifyContent='center'>
    <IconButton minW='none' w={6} h={6} icon={<EditIcon />} {...getEditButtonProps()} aria-label='edit' />
    </Flex>
  );
}
