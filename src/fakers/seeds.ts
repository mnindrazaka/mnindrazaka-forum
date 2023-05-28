import { getSlug } from "@/utils";
import { posts } from "./posts";
import { comments } from "./comments";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

export function generateSeeds() {
  if (posts.length === 0) {
    for (let i = 1; i <= 40; i++) {
      const title = faker.lorem.lines({ max: 1, min: 1 });
      const slug = getSlug(title);

      posts.push({
        serial: nanoid(),
        commentCount: 3,
        content: faker.lorem.paragraph(),
        datetime: faker.date.anytime().toISOString(),
        title,
        slug,
        voteCount: faker.number.int({ max: 500 }),
      });

      for (let j = 1; j <= 3; j++) {
        comments.push({
          serial: nanoid(),
          content: faker.lorem.paragraph(),
          datetime: faker.date.anytime().toISOString(),
          parentSerial: null,
          postSlug: slug,
          voteCount: faker.number.int({ max: 500 }),
        });
      }
    }
  }
}
