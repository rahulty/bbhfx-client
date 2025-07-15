import { Card, CardProps } from "./Card";

export const EventCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="events" />
);
