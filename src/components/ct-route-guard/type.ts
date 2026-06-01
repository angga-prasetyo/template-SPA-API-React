/**
 * @description
 * There are 3 types of routes.
 * 1. Routes that only can be accessed while authenticated => set `isPrivate` to `true`
 * 2. Routes that only can be accessed while not authenticated => set `isPrivate` to `false`
 * 3. Routes that can be accessed no matter authenticated or not => don't use this component
 */ export interface CTRouteGuardProps {
  /**
   * Determines whether the route is public or private.
   *
   * When the route only can be accessed while authenticated, set to `true`.
   *
   * @default
   * false
   */
  isPrivate?: boolean;
}
