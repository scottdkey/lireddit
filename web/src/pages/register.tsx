import { Button, Box } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'

interface registerProps {

}


const Register: React.FC<registerProps> = ({ }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  return (
    <Wrapper variant="small">
      <Formik initialValues={{ username: "", password: "" }} onSubmit={values => {
        console.log(values)
        setIsSubmitting(true)
      }}>
        {(values, handleChange) => (
          <Form>
            <InputField name="username" label="Username" />
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>
            <Button type="submit" mt={4} variant="solid" colorScheme="orange" isLoading={isSubmitting}>register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}
export default Register