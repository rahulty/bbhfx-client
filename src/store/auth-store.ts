"use client";
import { createStore } from "@xstate/store";

const localStorage =
  typeof global?.window !== "undefined" ? global?.window.localStorage : null;
const savedSnapshot = localStorage?.getItem("authStore");
const initialContext = savedSnapshot
  ? JSON.parse(savedSnapshot)
  : {
      user: null,
      isAuthenticated: false,
    };

export const authStore = createStore({
  context: initialContext,
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

authStore.subscribe((state) => {
  localStorage?.setItem("authStore", JSON.stringify(state.context));
});
