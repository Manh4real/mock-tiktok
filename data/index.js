import { faker } from "@faker-js/faker";
import fs from "fs/promises";
import axios from "axios";

export const videoApi = axios.create({
  baseURL: "https://api.pexels.com/videos",
});

const sampleAccounts = [
  {
    id: 12367855,
    nickname: "selena_gomez2301asdfasdfasdfsdf",
    full_name: "Selena Gomez",
    avatar:
      "https://ca-times.brightspotcdn.com/dims4/default/037e6e5/2147483647/strip/true/crop/2160x2160+0+0/resize/840x840!/format/webp/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8f%2F8f%2F462226764ec386fc2a325793885d%2Fpic-10-1sophie-muller-copy.jpg",
    onLive: true,
    tick: true,
    followers_count: 1000000,
    likes_count: 30234000,
    first_name: "Selena",
    last_name: "Gomez",
    bio: "rich Electronic grey Loan Account Soap Lari conglomeration zero Steel",
    followings_count: 110,
    website_url: "courteous-builder.org",
    facebook_url: "nocturnal-sprout.info",
    youtube_url: "perfect-housewife.net",
    twitter_url: "suburban-fedelini.com",
    instagram_url: "shady-bricklaying.net",
    created_at: 1660364739391,
    updated_at: 1660364739391,
  },
  {
    id: 12367856,
    nickname: "21_savage",
    full_name: "21 Savage",
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/3/36/21_Savage_%E2%80%93_I_Am_Greater_Than_I_Was.png",
    tick: true,
    followers_count: 1234230000000,
    likes_count: 5032300,
    first_name: "21",
    last_name: "Savage",
    bio: "rich Electronic grey Loan Account Soap Lari conglomeration zero Steel",
    followings_count: 110,
    website_url: "courteous-builder.org",
    facebook_url: "nocturnal-sprout.info",
    youtube_url: "perfect-housewife.net",
    twitter_url: "suburban-fedelini.com",
    instagram_url: "shady-bricklaying.net",
    created_at: 1660364739391,
    updated_at: 1660364739391,
    onLive: false,
  },
  {
    id: 12367857,
    nickname: "manh4real",
    full_name: "Nguyen Van Manh",
    avatar: "",
    tick: false,
    followers_count: 1,
    likes_count: 0,
    first_name: "Treva",
    last_name: "Wilderman",
    bio: "rich Electronic grey Loan Account Soap Lari conglomeration zero Steel",
    followings_count: 110,
    website_url: "courteous-builder.org",
    facebook_url: "nocturnal-sprout.info",
    youtube_url: "perfect-housewife.net",
    twitter_url: "suburban-fedelini.com",
    instagram_url: "shady-bricklaying.net",
    created_at: 1660364739391,
    updated_at: 1660364739391,
    onLive: false,
  },
  {
    id: 12367858,
    nickname: "4Lgang",
    full_name: "Gang gang",
    avatar: "",
    tick: false,
    followers_count: 43000,
    likes_count: 3434500,
    first_name: "Gang",
    last_name: "gang",
    bio: "rich Electronic grey Loan Account Soap Lari conglomeration zero Steel",
    followings_count: 110,
    website_url: "courteous-builder.org",
    facebook_url: "nocturnal-sprout.info",
    youtube_url: "perfect-housewife.net",
    twitter_url: "suburban-fedelini.com",
    instagram_url: "shady-bricklaying.net",
    created_at: 1660364739391,
    updated_at: 1660364739391,
    onLive: false,
  },
  {
    id: 12367859,
    nickname: "thebigstepper",
    full_name: "Kendrick Lamar",
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/e/e1/Kendrick_Lamar_-_Mr._Morale_%26_the_Big_Steppers.png",
    tick: true,
    followers_count: 32527900,
    likes_count: 28860000,
    first_name: "Kendrick",
    last_name: "Lamar",
    bio: "rich Electronic grey Loan Account Soap Lari conglomeration zero Steel",
    followings_count: 110,
    website_url: "courteous-builder.org",
    facebook_url: "nocturnal-sprout.info",
    youtube_url: "perfect-housewife.net",
    twitter_url: "suburban-fedelini.com",
    instagram_url: "shady-bricklaying.net",
    created_at: 1660364739391,
    updated_at: 1660364739391,
    onLive: false,
  },
  {
    id: 12367860,
    nickname: "squatuniversity",
    full_name: "Squat University",
    tick: true,
    avatar: "",
    followers_count: 2527900,
    likes_count: 2860000,
    first_name: "Squat",
    last_name: "University",
    bio: "rich Electronic grey Loan Account Soap Lari conglomeration zero Steel",
    followings_count: 10,
    website_url: "courteous-builder.org",
    facebook_url: "nocturnal-sprout.info",
    youtube_url: "perfect-housewife.net",
    twitter_url: "suburban-fedelini.com",
    instagram_url: "shady-bricklaying.net",
    created_at: 1660364739391,
    updated_at: 1660364739391,
    onLive: false,
  },
  {
    id: 12367861,
    nickname: "thejoestanek",
    full_name: "Joe Stanek",
    tick: true,
    avatar: "",
    followers_count: 527900,
    likes_count: 860000,
    first_name: "Joe",
    last_name: "Stanek",
    bio: "rich Electronic grey Loan Account Soap Lari conglomeration zero Steel",
    followings_count: 11,
    website_url: "courteous-builder.org",
    facebook_url: "nocturnal-sprout.info",
    youtube_url: "perfect-housewife.net",
    twitter_url: "suburban-fedelini.com",
    instagram_url: "shady-bricklaying.net",
    created_at: 1660364739391,
    updated_at: 1660364739391,
    onLive: false,
  },
];
export const getVideo = async () => {
  const result = await videoApi.get("popular", {
    params: {
      page: 1,
      per_page: 10,
    },
    headers: {
      Authorization: "563492ad6f91700001000001a1bb4f3fbc194509b43a4c9a336e2143",
    },
  });

  const data = result.data.videos;

  return data;
};
const randomData = async () => {
  const data = { posts: [], accounts: [...sampleAccounts] };

  // get 10 videos
  const videos = await getVideo();

  for (let i = 0; i < 10; i++) {
    data.posts.push({
      id: i,
      author_id: i,
      content: faker.random.words(20),
      placeholder: videos[i].image,
      video_url:
        i === 0 || i === 3
          ? "../videos/Lil Baby x Gunna - Drip Too Hard.mp4"
          : videos[i].video_files[0].link,
      audio_url: "",
      comments_count: +faker.random.numeric(3),
      likes_count: +faker.random.numeric(4),
      shares_count: +faker.random.numeric(2),
      views_count: i % 2 ? faker.random.numeric(4) : faker.random.numeric(5),
      posted_at: Date.now() - i * 24 * 60 * 60 * 1000,
    });
    data.accounts.push({
      id: i,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      full_name: faker.name.fullName(),
      nickname: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      bio: faker.random.words(10),
      tick: false,
      followings_count: +faker.random.numeric(3),
      followers_count: +faker.random.numeric(5),
      likes_count: +faker.random.numeric(8),
      website_url: faker.internet.domainName(),
      facebook_url: faker.internet.domainName(),
      youtube_url: faker.internet.domainName(),
      twitter_url: faker.internet.domainName(),
      instagram_url: faker.internet.domainName(),
      created_at: Date.now() - i * 24 * 60 * 60 * 1000,
      updated_at: Date.now(),

      onLive: false,
    });
  }

  return data;
};

(async () => {
  const data = await randomData();

  await fs.writeFile("data/db.json", JSON.stringify(data, null, 2)).then(() => {
    console.log("Done generated data!");
  });
})();

// # video 0
//../videos/Lil Baby x Gunna - Drip Too Hard.mp4
//"https://player.vimeo.com/external/296210754.hd.mp4?s=08c03c14c04f15d65901f25b542eb2305090a3d7&profile_id=175&oauth2_token_id=57447761"

// # video 3
//https://player.vimeo.com/external/226685105.hd.mp4?s=b6a194faf216cac660ec198e72b4e939cd74dee3&profile_id=170&oauth2_token_id=57447761
