"use client";
import { loginUserAction } from "@/data/auth-actions";
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
    login: async (context, ev: { formData: FormData }, enq) => {
      enq.effect(async () => {
        const actionReturns = await loginUserAction({}, ev.formData);
        authStore.trigger.setLoggedInUser(actionReturns);
      });
      return context;
    },
    setLoggedInUser: (context, event: { user: any }, enq) => {
      enq.emit.loggedIn();
      return {
        ...context,
        ...event,
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
