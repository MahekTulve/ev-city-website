"use client";

import {
  forwardRef,
  type MutableRefObject,
  type VideoHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type ViewportVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "src" | "preload" | "autoPlay"
> & {
  src: string;
  preloadWhenNear?: "metadata" | "auto";
  loadMargin?: string;
  playMargin?: string;
};

/**
 * Keeps below-the-fold videos out of the initial network/decoder work.
 * The source is attached shortly before the video reaches the viewport,
 * then playback is limited to the visible/near-visible section.
 */
const ViewportVideo = forwardRef<HTMLVideoElement, ViewportVideoProps>(
  function ViewportVideo(
    {
      src,
      preloadWhenNear = "auto",
      loadMargin = "1000px 0px",
      playMargin = "120px 0px",
      muted = true,
      loop = true,
      playsInline = true,
      ...videoProps
    },
    forwardedRef,
  ) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [shouldPlay, setShouldPlay] = useState(false);

    const setRefs = useCallback(
      (node: HTMLVideoElement | null) => {
        videoRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as MutableRefObject<HTMLVideoElement | null>).current =
            node;
        }
      },
      [forwardedRef],
    );

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const loadObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            loadObserver.disconnect();
          }
        },
        { rootMargin: loadMargin, threshold: 0 },
      );

      const playObserver = new IntersectionObserver(
        ([entry]) => setShouldPlay(entry.isIntersecting),
        { rootMargin: playMargin, threshold: 0.01 },
      );

      loadObserver.observe(video);
      playObserver.observe(video);

      return () => {
        loadObserver.disconnect();
        playObserver.disconnect();
      };
    }, [loadMargin, playMargin]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video || !shouldLoad) return;

      video.muted = Boolean(muted);
      video.defaultMuted = Boolean(muted);
      video.playsInline = Boolean(playsInline);
      video.load();
    }, [muted, playsInline, shouldLoad, src]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const syncPlayback = () => {
        const canPlay =
          shouldLoad &&
          shouldPlay &&
          document.visibilityState === "visible";

        if (!canPlay) {
          video.pause();
          return;
        }

        const promise = video.play();
        if (promise) void promise.catch(() => {});
      };

      syncPlayback();
      document.addEventListener("visibilitychange", syncPlayback);

      return () => {
        document.removeEventListener("visibilitychange", syncPlayback);
        video.pause();
      };
    }, [shouldLoad, shouldPlay]);

    return (
      <video
        {...videoProps}
        ref={setRefs}
        src={shouldLoad ? src : undefined}
        preload={shouldLoad ? preloadWhenNear : "none"}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
      />
    );
  },
);

export default ViewportVideo;
