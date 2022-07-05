import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

const signin = () => {
  return (
    <main className='grid h-[calc(100vh-60px)] place-items-center'>
      <FormControl padding={8} maxW={80} borderWidth='2px' borderRadius='lg'>
        <FormLabel htmlFor='email'>Email address</FormLabel>
        <Input id='email' type='email' />
        <FormHelperText>We'll never share your email.</FormHelperText>
      <Button width='100%' colorScheme='teal' marginTop={8} type='submit'>sign in</Button>
      </FormControl>
    </main>
  );
};

export default signin;
