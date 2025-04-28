// Define blog interface for type safety
export interface Blog {
    $id: string;
    $collectionId: string;
    createdAt: string;
    title: string;
    childContent: string,
    content: string;
    imageUrl?: string;
    author: string;
  }