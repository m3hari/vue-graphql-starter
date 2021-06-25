import { createApp } from "vue";
import App from "./App.vue";
import { SubscriptionClient } from "subscriptions-transport-ws";
import urql, { defaultExchanges, subscriptionExchange } from "@urql/vue";

const app = createApp(App);

app.use(urql, {
  url: "http://localhost:8080/v1/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return new SubscriptionClient(
          "ws://localhost:8080/v1/graphql",
          {}
        ).request(operation);
      },
    }),
  ],
});

app.mount("#app");
