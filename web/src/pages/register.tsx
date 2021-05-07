import { Button, Box } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { responsePathAsArray } from 'graphql'
import React from 'react'
import { useState } from 'react'
import { useMutation } from 'urql'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'

interface registerProps {

}



const Register: React.FC<registerProps> = ({ }) => {
  const [, register] = useRegisterMutation();
  const [isSubmitting, setSubmitting] = useState(false)
  return (
    <Wrapper variant="small">
      <Formik initialValues={{ username: "", password: "" }} onSubmit={async (values, { setErrors }) => {
        setSubmitting(true)
        const res = await register(values)
        setSubmitting(false)
        if (res.data.register.errors) {
          setErrors(toErrorMap(res.data.register.errors))
        } else if (res.data.register.user){

        }
      }}>
        {() => (
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