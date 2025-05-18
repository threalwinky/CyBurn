
# 📘 `docstring.md`

## Overview

This document describes the main functions and routes implemented in the `CyBurn` Flask backend. The app provides user authentication, encoding/decoding, scanning, webhooks, and real-time messaging via SocketIO.

---

## 🔐 Authentication & User Management

### `register()`

* **Method:** `POST`
* **Path:** `/register`
* **Description:** Registers a new user with a username and password, stores it in MongoDB, and sets a JWT cookie.

### `login()`

* **Method:** `POST`
* **Path:** `/login`
* **Description:** Authenticates an existing user and returns a JWT token as an HTTP-only cookie.

### `logout()`

* **Method:** `POST`
* **Path:** `/logout`
* **Description:** Logs the user out by expiring the JWT cookie.

### `check_credentials()`

* **Method:** `POST`
* **Path:** `/check-credentials`
* **Description:** Verifies that the user has a valid JWT token (protected route).

### `getinfo()`

* **Method:** `POST`
* **Path:** `/getinfo`
* **Description:** Returns the authenticated user's stored information (username and display name).

---

## 🔒 Token Validation

### `token_required(f)`

* **Decorator**
* **Description:** Ensures a valid JWT token is present in the request cookies before allowing access to protected routes.

---

## 🔧 Encoding & Decoding

### `handle_ascii()`

* **Method:** `POST`
* **Path:** `/decoder`
* **Description:** Accepts a text string and returns various encodings/hashes (Base64, hex, binary, MD5, SHA, etc.).

---

## 🔍 Web Scanner

### `handle_scan()`

* **Method:** `POST`
* **Path:** `/scan`
* **Description:** Runs a shell script (`scan.sh`) using words from `wordlists.txt` against a given URL to categorize discovered paths by HTTP status code.

---

## 💬 Real-Time Messaging

### `handle_connect()`

* **SocketIO Event:** `connect`
* **Description:** Triggered when a client connects via SocketIO. Sends a "Connected" confirmation message.

### `handle_message(data)`

* **SocketIO Event:** `message`
* **Description:** Broadcasts a chat message received from one user to all connected clients.

---

## 📡 Webhooks & Logging

### `webhook(token)`

* **Method:** All HTTP methods
* **Path:** `/webhook/<token>`
* **Description:** Receives and logs incoming HTTP requests for a specified token for later inspection.

### `inspect(token)`

* **Method:** `GET`
* **Path:** `/inspect/<token>`
* **Description:** Returns all previously captured webhook requests for a given token.

---

## 🧪 Miscellaneous

### `hello_world()`

* **Method:** `GET`
* **Path:** `/`
* **Description:** Basic root route for health check.

### `api()`

* **Method:** `GET`
* **Path:** `/api`
* **Description:** Simple route to verify API is up; returns JSON message.
