import { TrackInformation } from "./components/track-information";
import { TrackSearchForm } from "./components/track-search";
import { MediaPlayerContext } from "./media-player-machine-context";
import styles from "./media-player.module.css";

export function MediaPlayer(): JSX.Element {
  const selectedTrack = MediaPlayerContext.useSelector(
    (s) => s.context.selectedTrack,
  );

  // Render
  //-----------------------------------------------------

  return (
    <div
      className={`${styles.root} ${selectedTrack != null ? styles["root--active"] : ""}`}
    >
      <div className={styles.container}>
        <div className={styles["content-primary"]}>
          <div className={styles["content-primary__inner"]}>
            <TrackSearchForm />
          </div>
        </div>
        <div className={styles["content-secondary"]}>
          <div className={styles["content-secondary__inner"]}>
            {selectedTrack != null ? <TrackInformation /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
