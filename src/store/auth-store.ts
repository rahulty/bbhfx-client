"use client";
import { createStore } from "@xstate/store";

export const authStore = createStore({
  context: {
    user: null,
    isAuthenticated: false,
  },
  emits: {
    loggedIn: (user) => ({ user }),
    loggedOut: () => ({}),
  },
  on: {
    setLoggedInUser: (context, event: { user: any }, enq) => {
      enq.emit.loggedIn();
      return {
        ...context,
        user: event.user,
        isAuthenticated: true,
      };
    },
    logOut: (context, event, enq) => {
      enq.emit.loggedOut();
      return {
        ...context,
        user: null,
        isAuthenticated: false,
      };
    },
  },
});
