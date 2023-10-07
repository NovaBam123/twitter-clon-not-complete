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
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'
import axios from "axios";
import { setData } from '../redux/userSlice'
import { useNavigate } from "react-router-dom";

const LoginSchema =Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('*Email is required'),
  password: Yup.string()
    .min(4,'Password is wrong')  
    .required('*Password is required')
})

  
const LoginUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
  
    try {
      const response = await axios.get(
        `http://localhost:2000/users?email=${data.email}&password=${data.password}`)
      
      if (response.data[0]?.id){
        dispatch(setData)
        navigate('/beranda')
        window.location.reload()
      } else {
        alert('Akun tidak ditemukan')
      }
      
      }catch (err) {
      console.log(err)
     }
  }
  
  return (  
   <>
    <Button onClick={onOpen} colorScheme="telegram" w={'100%'}>
      Masuk</Button>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
   
    <Formik
      initialValues= {{email: '', password: ''}}
      validationSchema= {LoginSchema}
      onSubmit={(values, action) => {
        console.log(values)
        handleSubmit(values)
        action.resetForm()
      }}
    >
      {(props) => {
        // console.log(props);
        return (
          <Form>
            
            <ModalContent boxShadow={"2px 2px 20px rgba(0, 0, 255, 0.9)"}>
               <ModalHeader>Masuk ke-x</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
               <VStack>

              <FormControl>  
              <label htmlFor="email">Email</label>
              <Input as={Field}
                type= 'email'
                name= 'email' 
                bg={'gray.100'}  
              />
              <ErrorMessage
                component='div'
                name='email'
                style= {{ color: 'red' }}              
              />
              </FormControl>

            <FormControl>
              <label htmlFor="password">password</label>
              <Input as={Field}
                type= 'password'
                name= 'password'   
                bg={'gray.100'}
              />
              <ErrorMessage
                component='div'
                name='password'
                style= {{ color: 'red' }}              
              />
            </FormControl>
            
            </VStack>
            </ModalBody>
            <ModalFooter>
              
              <Flex w={'100%'} justifyContent={'center'} gap={20}>
              <Button colorScheme="telegram"
               onClick={() => {
                if (confirm('Yakin untuk membatalkan?')) {
                onClose();
                }
              }}
              >Batal</Button>

              
              <Button type="submit" colorScheme="telegram" 
              >Masuk</Button>  

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
 
export default LoginUser;