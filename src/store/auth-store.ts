"use client";
import { createStore } from "@xstate/store";

export const authStore = createStore({
  context: {
    user: localStorage?.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null,
    isAuthenticated: false,
  },
  emits: {
    loggedIn: (user) => ({ user }),
  },
  on: {
    setLoggedInUser: (context, event: { user: any }, enq) => {
      enq.emit.loggedIn(event.user);
      return {
        ...context,
        user: event.user,
        isAuthenticated: true,
      };
    },
  },
});
