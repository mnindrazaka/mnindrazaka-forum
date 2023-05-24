import { Post } from "./models";

export function getPostList() {
  return new Promise<Post[]>((resolve, _reject) => {
    setTimeout(() => {
      const posts: Post[] = [
        {
          comments: [],
          commentCount: 100,
          voteCount: 255,
          content: "Lorem Ipsum Dolor Sit Amet",
          datetime: new Date().toISOString(),
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
          voteCount: 255,
          content: "Lorem Ipsum Dolor Sit Amet",
          datetime: new Date().toISOString(),
          serial: "2",
          slug: "konten-terbaik-sepanjang-sejarah-konoha",
          title: "Konten Terbaik Sepanjang Sejarah Konoha",
          user: {
            serial: "1",
            name: "M. Nindra Zaka",
            username: "mnindrazaka",
          },
        },
      ];
      return resolve(posts);
    }, 3000);
  });
}
