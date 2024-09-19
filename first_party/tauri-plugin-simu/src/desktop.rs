use serde::de::DeserializeOwned;
use tauri::{plugin::PluginApi, AppHandle, Runtime};

use crate::models::*;

pub fn init<R: Runtime, C: DeserializeOwned>(
    app: &AppHandle<R>,
    _api: PluginApi<R, C>,
) -> crate::Result<Simu<R>> {
    Ok(Simu(app.clone()))
}

/// Access to the simu APIs.
pub struct Simu<R: Runtime>(AppHandle<R>);

impl<R: Runtime> Simu<R> {}
