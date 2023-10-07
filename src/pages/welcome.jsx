import { 
  Flex, 
  Stack, 
  Heading,
  Button,
  Text,
  Box,

} from '@chakra-ui/react';

import { RiTwitterXFill } from 'react-icons/ri';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import RegisterUser from '../components/register';
import LoginUser from '../components/login';

const WelcomeUser = () => {
  return (  
    <Flex w={1200} mx={'auto'} my={'20vh'} justifyContent={'space-between'} >
      <Box shadow={'dark-lg'} borderRadius={30}>
      <RiTwitterXFill size={500} color="Green"/>
      </Box>

      <Flex flexDir={'column'} my={'7vh'}>
          <Heading fontSize={'6xl'}>Sedang Tren Saat Ini</Heading>
          <Heading fontSize={'2xl'} mt={'4'}>Bergabunglah Sekarang</Heading>
       
        <Stack>
         <Button colorScheme='facebook' leftIcon={<FaFacebook/>} mt={2}>
          <Text>Continue with Facebook</Text>
         </Button>

         <Button leftIcon={<FcGoogle/>} mt={2}>
          <Text>Sign in With Google</Text>
         </Button>

         <Button bg='gray.200' mt={2}>
          <RegisterUser/>
         </Button>
         <Text mt={6} fontWeight={700}>Sudah Punya akun?</Text>
         
         <Button colorScheme='telegram'><LoginUser/></Button>
       
        </Stack>
      </Flex>
    
    </Flex>
  );
}
 
export default WelcomeUser;