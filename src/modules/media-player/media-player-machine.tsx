import { Album, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { assign, fromPromise, setup } from "xstate";

const spotifyApi = SpotifyApi.withClientCredentials(
  import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  import.meta.env.VITE_SPOTIFY_SECRET,
);

export const mediaPlayerMachine = setup({
  types: {
    context: {} as {
      /**
       * The text for the search query
       */
      searchQuery: string;

      /**
       * The tracks returned from the search query
       */
      searchResults: Track[] | null;

      /**
       * The selected track data
       */
      selectedTrack: Track | null;

      /**
       * The album data for the selected track
       */
      selectedTrackAlbum: Album | null;

      /**
       * The audio node
       */
      audio: HTMLAudioElement;

      /**
       * The id of the track currently playing
       */
      playingTrackId: Track["id"] | null;

      /**
       * Is the audio currently playing
       */
      isPlaying: boolean;
    },
    events: {} as
      | { type: "SEARCH"; searchQuery: string }
      | { type: "SELECT_TRACK"; selectedTrack: Track }
      | { type: "SELECT_TRACK_AND_PLAY"; selectedTrack: Track }
      | { type: "PLAY" }
      | { type: "PAUSE" },
  },
  actors: {
    getTracksBySearchQuery: fromPromise<Track[], string>(async ({ input }) => {
      const response = await spotifyApi.search(input, ["track"]);

      return response.tracks.items;
    }),
    getSelectedTrackData: fromPromise<Album, string>(
      async ({ input }) => await spotifyApi.albums.get(input),
    ),
  },
  actions: {
    playAudio: ({ context, self }) => {
      if (context.selectedTrack?.preview_url == null) {
        throw new Error("Selected track has no preview URL");
      }

      if (context.playingTrackId !== context.selectedTrack.id) {
        context.playingTrackId = context.selectedTrack.id;
        context.audio.src = context.selectedTrack.preview_url;
      }

      context.audio.play();

      context.isPlaying = true;

      /**
       * The `SELECT_TRACK_AND_PLAY` manually calls this as an action,
       * so we need to ensure that this is set as it's potentially not
       * part of an entry/exit flow.
       *
       * @TODO Talk to Chris about how to best handle this.
       */
      self.send({ type: "PLAY" });
    },
    pauseAudio: ({ context }) => {
      context.audio.pause();

      context.isPlaying = false;
    },
  },
}).createMachine({
  id: "mediaPlayer",
  type: "parallel",
  context: {
    audio: new Audio(),
    searchQuery: "",
    searchResults: null,
    selectedTrack: null,
    selectedTrackAlbum: null,
    isPlaying: false,
    playingTrackId: null,
  },

  // ====================================================
  // States
  // ====================================================

  states: {
    interface: {
      initial: "idle",
      states: {
        idle: {
          on: {
            SEARCH: {
              target: "searching",
              actions: assign({
                searchQuery: ({ event }) => event.searchQuery,
              }),
            },
          },
        },

        searching: {
          invoke: {
            id: "searching",
            src: "getTracksBySearchQuery",
            input: ({ context: { searchQuery } }) => searchQuery,
            onDone: {
              target: "searchResults",
              actions: assign({ searchResults: ({ event }) => event.output }),
            },
            onError: {
              target: "searchingFailure",
            },
          },
        },

        searchingFailure: {},

        searchResults: {
          on: {
            SEARCH: {
              target: "searching",
              actions: assign({
                searchQuery: ({ event }) => event.searchQuery,
              }),
            },
            SELECT_TRACK: {
              target: "loadingSelectedTrack",
              actions: assign({
                selectedTrack: ({ event }) => event.selectedTrack,
              }),
            },
            SELECT_TRACK_AND_PLAY: {
              target: "loadingSelectedTrack",
              actions: [
                assign({
                  selectedTrack: ({ event }) => event.selectedTrack,
                }),
                { type: "playAudio" },
              ],
            },
          },
        },

        loadingSelectedTrack: {
          invoke: {
            id: "loadingSelectedTrack",
            src: "getSelectedTrackData",
            input: ({ context: { selectedTrack } }) => {
              if (selectedTrack == null) {
                throw new Error("Selected track is missing");
              }

              return selectedTrack.album.id;
            },
            onDone: {
              target: "selectedTrack",
              actions: assign({
                selectedTrackAlbum: ({ event }) => event.output,
              }),
            },
            onError: {
              target: "searchingFailure",
            },
          },
        },

        loadingSelectedTrackFailure: {},

        selectedTrack: {
          on: {
            SEARCH: {
              target: "searching",
              actions: assign({
                searchQuery: ({ event }) => event.searchQuery,
              }),
            },
            SELECT_TRACK: {
              target: "loadingSelectedTrack",
              actions: assign({
                selectedTrack: ({ event }) => event.selectedTrack,
              }),
            },
            SELECT_TRACK_AND_PLAY: {
              target: "loadingSelectedTrack",
              actions: [
                assign({
                  selectedTrack: ({ event }) => event.selectedTrack,
                }),
                { type: "playAudio" },
              ],
            },
          },
        },
      },
    },

    track: {
      initial: "paused",
      states: {
        paused: {
          entry: "pauseAudio",
          on: { PLAY: "playing" },
        },
        playing: {
          entry: "playAudio",
          exit: "pauseAudio",
          on: { PAUSE: "paused" },
        },
      },
    },
  },
});
