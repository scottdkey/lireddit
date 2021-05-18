import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';



const CreatePost: React.FC<{}> = ({ }) => {
  const router = useRouter()
  const [, createPost] = useCreatePostMutation()
  return (

    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          await createPost({ input: values })
          router.push("/")
        }}>

        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="Title"
            />
            <Box mt={4}>
              <InputField
                name="test"
                placeholder="text..."
                label="Body"
                textArea={true}
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper >
  )
};

export default withUrqlClient(createUrqlClient)(CreatePost)