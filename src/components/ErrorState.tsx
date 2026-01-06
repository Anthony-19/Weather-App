import type { JSX } from "react";
import styles from "../app/page.module.css";
import Image from "next/image";
export function ErrorState({ error, setError }: { error: any; setError: (error: any) => void }): JSX.Element {
  const onRetry = () => {
    setError(null);
  }
  return (
    <div className={styles.errorContainer}>
         <Image
          src="./assets/images/icon-error.svg"
          width={30}
          height={30}
          alt="headerLogo"
          className={styles.iconError}
        />
      <h2>Something went wrong.</h2>
      <p>
        We couldn't connect to the server {`${error.name}`}. Please try again in a few moments.
      </p>

      <button className={styles.retryButton} onClick={onRetry}>
        <Image
          src="./assets/images/icon-retry.svg"
          width={15}
          height={15}
          alt="headerLogo"
          className={styles.iconRetry}
        />
        Retry
      </button>
    </div>
  );
}