// Settings for creating the input simulation and it's behavior
export interface Settings {
  // Sleep delay on macOS
  macDelay?: number | undefined;
  // Sleep delay on Linux X11
  linuxDelay?: number | undefined;
  // Display name to connect to when using Linux X11
  x11Display?: string | undefined;
  // Display name to connect to when using Linux Wayland
  waylandDisplay?: string | undefined;
  // Arbitrary value to be able to distinguish events created by enigo
  // All events will be marked with this value in the dwExtraInfo field
  windowsDwExtraInfo?: number | undefined;
  // Arbitrary value to be able to distinguish events created by enigo
  // All events will be marked with this value in the
  // `EVENT_SOURCE_USER_DATA` field
  eventSourceUserData?: number | undefined;
  // Set this to true if you want all held keys to get released when Enigo
  // gets dropped
  releaseKeysWhenDropped?: boolean | undefined;
}
