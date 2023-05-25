import { Post } from "@/posts/models";
import { nanoid } from "nanoid";

const posts: Post[] = [
  {
    comments: [],
    commentCount: 100,
    voteCount: 500,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date("May 25, 2023 12:00:00").toISOString(),
    serial: "1",
    slug: "hokage-terbaik-sepanjang-sejarah-konoha",
    title: "Hokage Terbaik Sepanjang Sejarah Konoha",
    user: {
      serial: "1",
      name: "M. Nindra Zaka",
      username: "mnindrazaka",
    },
  },
  {
    comments: [],
    commentCount: 100,
    voteCount: 1000,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date("May 23, 2023 12:00:00").toISOString(),
    serial: "2",
    slug: "konten-terbaik-sepanjang-sejarah-konoha",
    title: "Konten Terbaik Sepanjang Sejarah Konoha",
    user: {
      serial: "1",
      name: "M. Nindra Zaka",
      username: "mnindrazaka",
    },
  },
  {
    comments: [],
    commentCount: 100,
    voteCount: 255,
    content: "Lorem Ipsum Dolor Sit Amet",
    datetime: new Date("May 20, 2023 12:00:00").toISOString(),
    serial: "3",
    slug: "tips-dan-trick-untuk-menjadi-viral",
    title: "Tips dan Trick untuk Menjadi Viral",
    user: {
      serial: "1",
      name: "M. Nindra Zaka",
      username: "mnindrazaka",
    },
  },
];

function simulateFetch<T>(callback: () => T) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      try {
        return resolve(callback());
      } catch (err) {
        return reject(err);
      }
    }, 600);
  });
}

type GetPostListParams = {
  page: number;
  pageSize: number;
  query: string;
  sortBy: "hot" | "new";
};

export function getPostList({
  page,
  pageSize,
  query,
  sortBy,
}: GetPostListParams) {
  return simulateFetch(() => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    const sortedPosts = filteredPosts.sort((prev, next) =>
      sortBy === "new"
        ? new Date(next.datetime).getTime() - new Date(prev.datetime).getTime()
        : next.voteCount - prev.voteCount
    );
    const totalItem = sortedPosts.length;
    const totalPage = Math.ceil(totalItem / pageSize);

    const start = pageSize * (page - 1);
    const end = start + pageSize;
    const paginatedPosts = sortedPosts.slice(start, end);

    if (page > 1) {
      throw new Error("Error due to server hang");
    }

    return {
      data: paginatedPosts,
      total: totalItem,
      hasNextPage: page < totalPage,
    };
  });
}

type GetPostDetailParams = {
  slug: string;
};

export function getPostDetail({ slug }: GetPostDetailParams) {
  return simulateFetch(() => ({
    data: posts.find((post) => post.slug === slug) ?? null,
  }));
}

type CreatePostParams = {
  post: Omit<
    Post,
    "serial" | "datetime" | "voteCount" | "commentCount" | "comments"
  >;
};

export function createPost({ post }: CreatePostParams) {
  return simulateFetch(() => {
    const newPost: Post = {
      ...post,
      commentCount: 0,
      voteCount: 0,
      comments: [],
      datetime: new Date().toISOString(),
      serial: nanoid(),
    };

    posts.push(newPost);

    return {
      success: true,
    };
  });
}

type VotePostParams = {
  slug: string;
  amount: number;
};

export function votePost({ amount, slug }: VotePostParams) {
  return simulateFetch(() => {
    const index = posts.findIndex((post) => post.slug === slug);
    if (index === -1) throw new Error("Post slug is not found");

    posts[index] = {
      ...posts[index],
      voteCount: posts[index].voteCount + amount,
    };

    return {
      success: true,
    };
  });
}
