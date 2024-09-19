use enigo::Settings;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SiumSettings {
    /// Sleep delay on macOS
    pub mac_delay: u32,
    /// Sleep delay on Linux X11
    pub linux_delay: u32,
    /// Display name to connect to when using Linux X11
    pub x11_display: Option<String>,
    /// Display name to connect to when using Linux Wayland
    pub wayland_display: Option<String>,
    /// Arbitrary value to be able to distinguish events created by enigo
    /// All events will be marked with this value in the dwExtraInfo field
    pub windows_dw_extra_info: Option<usize>,
    /// Arbitrary value to be able to distinguish events created by enigo
    /// All events will be marked with this value in the
    /// `EVENT_SOURCE_USER_DATA` field
    pub event_source_user_data: Option<i64>,
    /// Set this to true if you want all held keys to get released when Enigo
    /// gets dropped
    pub release_keys_when_dropped: bool,
}

impl Default for SiumSettings {
    fn default() -> Self {
        let enigo_default = Settings::default();
        Self {
            mac_delay: enigo_default.mac_delay,
            linux_delay: enigo_default.linux_delay,
            x11_display: enigo_default.x11_display,
            wayland_display: enigo_default.wayland_display,
            windows_dw_extra_info: enigo_default.windows_dw_extra_info,
            event_source_user_data: enigo_default.event_source_user_data,
            release_keys_when_dropped: enigo_default.release_keys_when_dropped,
        }
    }
}
