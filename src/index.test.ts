import { deepEqual } from "node:assert/strict";
import { test } from "node:test";

type Tweet = {
  tid: string;
  username: string;
  text: string;
};

export function createTimeline(tweets: Tweet[]) {
  return {
    add(tweetsToAdd: Tweet[]) {
      const existingIds = tweets.map(({ tid }) => tid);
      const newTweets = tweetsToAdd.filter((tweetToAdd) =>
        existingIds.includes(tweetToAdd.tid),
      );
      return createTimeline([...tweets, ...newTweets]);
    },
  };
}

test("It works!", () => {
  deepEqual(1, 1);
});
