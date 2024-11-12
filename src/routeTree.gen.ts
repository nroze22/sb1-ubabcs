import { Route as rootRoute } from "./routes/__root";
import { Route as IndexRoute } from "./routes/index";
import { Route as CriteriaRoute } from "./routes/criteria";
import { Route as UploadRoute } from "./routes/upload";
import { Route as ResultsRoute } from "./routes/results";

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      parentRoute: typeof rootRoute;
    };
    "/criteria": {
      parentRoute: typeof rootRoute;
    };
    "/upload": {
      parentRoute: typeof rootRoute;
    };
    "/results": {
      parentRoute: typeof rootRoute;
    };
  }
}

Object.assign(IndexRoute.options, {
  path: "/",
  getParentRoute: () => rootRoute,
});

Object.assign(CriteriaRoute.options, {
  path: "/criteria",
  getParentRoute: () => rootRoute,
});

Object.assign(UploadRoute.options, {
  path: "/upload",
  getParentRoute: () => rootRoute,
});

Object.assign(ResultsRoute.options, {
  path: "/results",
  getParentRoute: () => rootRoute,
});

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  CriteriaRoute,
  UploadRoute,
  ResultsRoute,
]);