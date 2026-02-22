import type { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NoteHub",
  description:
    "The requested page could not be found. Please check the URL or return to the homepage.",
  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description:
      "The requested page could not be found. Please check the URL or return to the homepage.",
    url: "/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 page",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
