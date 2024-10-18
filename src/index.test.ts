import { deepEqual } from "node:assert/strict";
import { test } from "node:test";

type Tweet = {
  tid: string;
  username: string;
  text: string;
};

export function createTimeline(tweets: Tweet[]) {
  return {
    getTweets() {
      return tweets;
    },
    add(tweetsToAdd: Tweet[]) {
      const existingIds = tweets.map(({ tid }) => tid);
      const newTweets = tweetsToAdd.filter(
        (tweetToAdd) => !existingIds.includes(tweetToAdd.tid),
      );
      return createTimeline([...tweets, ...newTweets]);
    },
  };
}

test("Empty Timeline", () => {
  deepEqual(createTimeline([]).getTweets(), []);
});

test("Timeline initialized with a single tweet", () => {
  const tweet = { tid: "#tid", username: "#username", text: "#text" };

  deepEqual(createTimeline([tweet]).getTweets(), [tweet]);
});

test("Tweet added to timeline", () => {
  const tweet = {
    tid: "abc",
    username: "My",
    text: "Look at my food!",
  };
  const result = createTimeline([]).add([tweet]).getTweets();

  deepEqual(result, [tweet]);
});

test("Tweet added to a timeline that already has the tweet", () => {
  const tweet = {
    tid: "alongidwithnumbersandletters123456",
    username: "twitterdiedwithelonmusk",
    text: "ibustneedtopostregularlyforthealgo",
  };

  const result = createTimeline([tweet]).add([tweet]).getTweets();

  deepEqual(result, [tweet]);
});
