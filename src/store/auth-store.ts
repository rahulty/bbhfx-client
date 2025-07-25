"use client";
import { createStore } from "@xstate/store";
const window = global?.window;
const userFromLocalStorage = window?.localStorage?.getItem("user")
  ? JSON.parse(window?.localStorage?.getItem("user") || "{}")
  : null;

export const authStore = createStore({
  context: {
    user: userFromLocalStorage,
    isAuthenticated: false,
  },
  emits: {
    loggedIn: (user) => ({ user }),
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
  },
});
