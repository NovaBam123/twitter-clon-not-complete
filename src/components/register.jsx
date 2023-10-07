import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  Input,
  VStack,
  Flex
} from "@chakra-ui/react";

import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import axios from "axios";


const RegisterSchema = Yup.object().shape({
  username : Yup.string()
    .min(2, 'Username must be 2 characters at minimum')
    .required("*Username is required"),
  email : Yup.string()
    .email("Invalid Email address format") 
    .required("*Email is required"), 
  password : Yup.string()
    .matches(
      /^(?=.*[A-Z])/,
      '*Password must start with a capital letter'
    )
    .min(5, 'Password must be in 5 characters at minimum') 
    .required('*Password is required')
})

const RegisterUser = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const handleSubmit = async (data) => {
    try {
      await axios.post('http://localhost:2000/users', data)  
    }catch (err) {console.log(err)}
  }

  return (  
    <>
      <Button onClick= {onOpen} bg={'gray.200'} w={'100%'}>Buat Akun</Button>
      <Modal isOpen= {isOpen} onClose= {onClose} isCentered>
      <ModalOverlay/> 

      <Formik
        initialValues={{username: '',email : '', password: ''}}
        validationSchema= {RegisterSchema}
        onSubmit={(values, action) => {
          handleSubmit(values) 
          alert('Your account have been registered..!!') 
          action.resetForm();
          onClose();
        }}
      >
        {(formitprops) => {
          // console.log(props)
          return (
            <Form>

              <ModalHeader>Buat Akun </ModalHeader>
                <ModalContent boxShadow={"2px 2px 20px rgba(0, 0, 255, 0.9)"}>
                  <ModalHeader mt={'8px'}>Buat Akun Baru</ModalHeader>
                  <ModalCloseButton mt={'px'}/>
                  
                  <ModalBody>
                    <VStack spacing={4} align={'flex-start'}>
                      <FormControl mt={'5px'}>
                  
                        <label htmlFor="username">UserName</label>
                        <Input as={Field} type='text' name='username' bg={'gray.100'}/>
                        <ErrorMessage
                        component= 'div'
                        name = 'username'
                        style = {{ color : 'red' }} 
                        />      
                      </FormControl> 
                      
                      <FormControl>
                        <label htmlFor="email">Email</label>
                        <Input as={Field} type='text' name='email' bg={'gray.100'}/>
                        <ErrorMessage
                        component= 'div'
                        name = 'email'
                        style = {{ color : 'red' }} 
                        />    
                      </FormControl>

                      <FormControl>
                        <label htmlFor="password">Password</label>
                        <Input as={Field} type='password' name='password' bg={'gray.100'}/>
                        <ErrorMessage
                        component= 'div'
                        name = 'password'
                        style = {{ color : 'red' }}  
                        />     
                      </FormControl>  
                    </VStack>
                  </ModalBody> 
                    <ModalFooter>
                      <Flex justifyContent={'center'} w={'100%'} gap={'60px'}>
                       
                        <Button colorScheme="telegram" 
                          onClick={() => {
                            if (confirm('Are you sure you want to cancel?')) {
                            onClose();
                            }
                          }}
                       >Cancel</Button>
                       
                        <Button colorScheme="telegram" type='submit' 
                        >Register</Button>
                        
                      </Flex>
                    </ModalFooter>
                </ModalContent>

              </Form> 
          )
        }}

      </Formik>
     </Modal> 
    </> 
  );
}
 
export default RegisterUser;