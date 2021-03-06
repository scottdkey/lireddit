import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../utils/createUrqlClient"
import { usePostsQuery } from "../generated/graphql"
import React from "react"
import { Layout } from "../components/Layout"
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    }
  });

  if (!fetching && !data) {
    return <div>query failed for some reason</div>
  }

  return (
    <Layout>
      <Flex align="center">
        <Heading>LiReddit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      <br />
      {
        !data && fetching ? <div>loading...</div> :
          <Stack>
            {data.posts.map(p =>
              <Box p={5} shadow="md" boderWidth="1px" key={p.id}>
                <Heading fontSize="xl">{p.title}</Heading>
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            )}
          </Stack>}
      {data ?
        <Flex align="center">
          <Button isLoading={fetching} m="auto" my={8}>load more</Button>
        </Flex> : null
      }
    </Layout>

  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)