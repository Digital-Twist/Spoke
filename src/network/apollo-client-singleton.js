import ApolloClient, { addQueryMerging } from "apollo-client";
import ResponseMiddlewareNetworkInterface from "./response-middleware-network-interface";
import fetch from "isomorphic-fetch";
import { graphQLErrorParser } from "./errors";

const responseMiddlewareNetworkInterface = new ResponseMiddlewareNetworkInterface(
  (typeof window === "undefined" ? process.env : window).GRAPHQL_URL ||
    "/graphql",
  { credentials: "same-origin" }
);

responseMiddlewareNetworkInterface.use({
  applyResponseMiddleware: (response, next) => {
    const parsedError = graphQLErrorParser(response);
    if (parsedError) {
      console.debug(parsedError);
      if (parsedError.status === 401) {
        window.location = `/login?nextUrl=${window.location.pathname}`;
      } else if (parsedError.status === 403) {
        window.location = "/";
      } else if (parsedError.status === 404) {
        window.location = "/404";
      } else {
        console.error(
          `GraphQL request resulted in error:\nRequest:${JSON.stringify(
            response.data
          )}\nError:${JSON.stringify(response.errors)}`
        );
      }
    }
    next();
  }
});

const networkInterface = addQueryMerging(responseMiddlewareNetworkInterface);

const ApolloClientSingleton = new ApolloClient({
  networkInterface,
  shouldBatch: true
});
export default ApolloClientSingleton;
