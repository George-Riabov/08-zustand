"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div>
      <p>Could not fetch the list of notes.</p>
      <p>{error.message}</p>

      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
