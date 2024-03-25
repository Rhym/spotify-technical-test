import { useCallback, useState } from "react";

import { Alert } from "@/components/alert";
import { LogoWordmark } from "@/components/logo-wordmark";
import { SearchInput } from "@/components/search-input";

import { MediaPlayerContext } from "../../media-player-machine-context";
import { TrackSummaryList } from "../track-summary-list";
import styles from "./track-search.module.css";

export type TrackSearchFormProps = React.ComponentPropsWithoutRef<"div"> & {
  children?: never;
};

export function TrackSearchForm({
  ...props
}: TrackSearchFormProps): JSX.Element {
  const [searchText, setSearchText] = useState<string>("");

  const mediaPlayerActorRef = MediaPlayerContext.useActorRef();
  const { send } = mediaPlayerActorRef;

  const hasTrack = MediaPlayerContext.useSelector(
    (s) => s.context.selectedTrack != null,
  );

  const isError = MediaPlayerContext.useSelector(
    (s) => s.value.interface === "searchingFailure",
  );

  const isSubmitting = MediaPlayerContext.useSelector(
    (s) => s.value.interface === "searching",
  );

  // Handlers
  //-----------------------------------------------------

  const handleSearch = useCallback(async () => {
    send({ type: "SEARCH", searchQuery: searchText });
  }, [searchText, send]);

  // Render
  //-----------------------------------------------------

  if (isError) {
    return (
      <div {...props} className={styles.root}>
        <Alert>
          Sorry, something seems to have gone wrong. Please try again
        </Alert>
      </div>
    );
  }

  return (
    <div {...props} className={styles.root}>
      <div
        className={`${styles.brand} ${hasTrack ? styles["brand--hidden"] : ""}`}
      >
        <LogoWordmark />
      </div>

      {/* Search */}
      <div className={styles.form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <SearchInput
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            handleOnClear={() => setSearchText("")}
            value={searchText}
            isLoading={isSubmitting}
            disabled={isSubmitting}
            placeholder="What do you want to play?"
          />
        </form>
      </div>

      {/* List */}
      <div className={styles.list}>
        <TrackSummaryList />
      </div>
    </div>
  );
}
