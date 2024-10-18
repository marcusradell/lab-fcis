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
