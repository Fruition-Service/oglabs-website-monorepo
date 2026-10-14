// STUB: the blog builder implements this (legacy Framer posts from the repo + live HubSpot posts).
import type { Post, PostSummary } from "./blog-types";

export async function getPosts(): Promise<PostSummary[]> {
  return [];
}

export async function getPost(slug: string): Promise<Post | null> {
  void slug;
  return null;
}
