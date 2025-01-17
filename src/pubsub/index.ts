import "@/pubsub/channels";

// Import and subscribe to the following events
import "@/pubsub/sources-updated-event";

import { redisSubscriber } from "@/common/redis";
import { channels } from "@/pubsub/channels";
import { logger } from "@/common/logger";
import { config } from "@/config/index";
import { SourcesUpdatedEvent } from "@/pubsub/sources-updated-event";

redisSubscriber.subscribe(channels.sourcesUpdated, (err, count) => {
  if (err) {
    logger.error("pubsub", `Failed to subscribe ${err.message}`);
  }

  logger.info("pubsub", `${config.railwayStaticUrl} subscribed to ${count} channels`);
});

redisSubscriber.on("message", async (channel, message) => {
  switch (channel) {
    case channels.sourcesUpdated:
      await SourcesUpdatedEvent.handleEvent(message);
      break;
  }
});
