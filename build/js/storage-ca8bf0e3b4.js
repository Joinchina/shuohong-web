"use strict";var Storage=window.localStorage;function set(e,t){Storage.setItem(e,JSON.stringify(t))}function get(e){return JSON.parse(Storage.getItem(e))}function remove(e){Storage.removeItem(e)}