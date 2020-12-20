import React from "react";
import Head from "next/head";
import {
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import Container from "../components/container";
import PageTransition from "../components/page-transitions";
import Section from "@/components/section";
import BlogPost from "@/components/blog-post";
import { getAllFilesFrontMatter } from "@/lib/mdx";

export default function Blog({ posts }) {
  const filteredBlogPosts = posts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  );
  // .filter((frontMatter) =>
  //   frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
  // );

  return (
    <PageTransition>
      <Section py={16}>
        <VStack align="start" spacing={8}>
          <VStack align="start">
            <Heading as="h1">Blog</Heading>
            <Text
              fontSize="2xl"
              color={useColorModeValue("gray.500", "gray.200")}
              maxW="md"
            >
              Welcome to my blog. Here I share some of my thinking, insights and
              views on life.
            </Text>
          </VStack>

          {!filteredBlogPosts.length && "No posts found."}
          <VStack w="100%" align="start" spacing={4}>
            {filteredBlogPosts.map((frontMatter) => (
              <BlogPost key={frontMatter.title} {...frontMatter} />
            ))}
          </VStack>
        </VStack>
      </Section>
    </PageTransition>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
}
