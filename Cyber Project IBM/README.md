# PassSafe — Password Security Checker

A simple, client-side web application for checking password strength, generating secure passwords, and learning password safety tips. Built as a college cybersecurity project.

> **Privacy:** All passwords are processed entirely in your browser. Nothing is ever saved, sent to a server, or stored anywhere.

---

## Features

### 🔍 Password Strength Checker
- Type any password into the input field.
- Click the 👁 button to show or hide the password.
- Click **Check Password** to analyse it.
- The tool scores your password on five criteria:
  1. Contains a lowercase letter (a–z)
  2. Contains an uppercase letter (A–Z)
  3. Contains a number (0–9)
  4. Contains a special character (e.g. `!`, `@`, `#`)
  5. Is 12 or more characters long
- Results:
  - 🔴 **Weak** (score 0–2) — red bar at 33%
  - 🟠 **Medium** (score 3) — orange bar at 66%
  - 🟢 **Strong** (score 4–5) — green bar at 100%
- Common words, predictable sequences, and four-or-more repeated
  characters are flagged as predictable and rated **Weak**.
- Specific suggestions are shown to tell you exactly what to improve.
- This is a basic estimate, not a breach-database check or a complete
  measure of password security.

### 🔑 Password Generator
- Click **Generate Password** to create a random password instantly.
- The password is 12–20 characters long (random each time).
- Characters are chosen from 80 possible options: lowercase letters,
  uppercase letters, digits, and symbols.
- Uses the browser's built-in `crypto.getRandomValues()` API — this is cryptographically secure.
- Click the 📋 button to copy the generated password to your clipboard.
- A **Copied!** message confirms the copy was successful.
- If clipboard access is unavailable or fails, the page asks you to copy
  the password manually.

### 💡 Password Security Tips
Five static tips are always visible at the bottom of the page:
1. Use long passwords — at least 12 characters.
2. Avoid common words, names, and predictable patterns.
3. Never reuse the same password across different accounts.
4. Use a password manager to store passwords safely.
5. Enable two-factor authentication (2FA) wherever possible.

---

## Technologies Used

| Technology | How it's used |
|---|---|
| HTML5 | Page structure, SVG shield icon, semantic layout |
| CSS3 | Light design, responsive Grid and Flexbox layouts, animated strength bar, reduced-motion support |
| Vanilla JavaScript (ES6+) | DOM manipulation, password analysis, unbiased `crypto.getRandomValues()` selection, `navigator.clipboard` |
| Web Browser | Runtime — no server or installation needed |

No frameworks, no libraries, no CDN links. Works completely offline.

---

## Project File Structure

```
PassSafe — Password Security Lab/
│
├── index.html                    ← Page structure (HTML)
├── style.css                     ← Visual design (CSS)
├── script.js                     ← All interactive logic (JavaScript)
│
├── README.md                     ← This file
├── Requirements.txt              ← Project requirements document
├── PassSafe_Code.txt             ← Full source code in one file
```

---

## How to Run the Website

**No installation required.**

1. Open **File Explorer** (Windows) or **Finder** (Mac).
2. Navigate to the project folder.
3. Double-click **`index.html`**.
4. The website opens in your default web browser.

That's it — no server, no terminal, no commands.

> **Note:** The **Copy** button uses the browser Clipboard API, which may require a secure HTTPS connection or `localhost`. If you open `index.html` directly from disk (`file://` URL), copying may fail in some browsers; the page will show a manual-copy message. The other features work normally.

---

## How to Use the Website

### Checking a password
1. Click on the password input field.
2. Type any password.
3. Optionally click 👁 to see the characters.
4. Click **Check Password**.
5. Read the strength level, coloured bar, and suggestions.

### Generating a password
1. Click **Generate Password**.
2. A new random password appears in a highlighted box.
3. Click 📋 to copy it to your clipboard.
4. Paste it wherever you need it.

### Reading the tips
Scroll down to the **Password Security Tips** card — the five tips are always visible without any interaction.

---

## Privacy and Security Notes

- **No data collection.** The application has no server, no database, and no analytics.
- **No network requests.** The page makes zero HTTP requests after loading. You can verify this in your browser's DevTools → Network tab.
- **Secure randomness.** The password generator uses `crypto.getRandomValues()` with rejection sampling to avoid modulo bias.
- **No storage.** No `localStorage`, `sessionStorage`, or cookies are used.
- The footer of the page states: *"Passwords are never saved or transmitted."*

---

## Limitations

- The strength checker uses simple character-type rules and a small list of predictable patterns. It does not check whether a password appears in lists of known or breached passwords, and it may miss other guessable passwords.
- A password that receives a strong rating is not guaranteed to be secure; use a unique password generated or stored by a password manager.
- Clipboard access may be unavailable when the file is opened directly from disk (`file://`). Serve it over HTTPS or localhost for more reliable copying.
- English only — no multi-language support.

---

## How to Publish for Free on GitHub Pages

1. **Create a free account** at [github.com](https://github.com) if you don't have one.
2. Click **"New repository"** (the green button on your dashboard).
3. Name the repository (e.g. `passsafe`). Set visibility to **Public**. Click **Create repository**.
4. On the repository page, click **"Add file" → "Upload files"**.
5. Drag and drop these three files into the upload area:
   - `index.html`
   - `style.css`
   - `script.js`
6. Click **"Commit changes"**.
7. Go to **Settings** (top menu of the repository).
8. In the left sidebar, click **Pages**.
9. Under **"Branch"**, select `main` and click **Save**.
10. Wait about 1–2 minutes. Your live URL will appear at the top of the Pages settings, in this format:
    ```
    https://yourusername.github.io/passsafe/
    ```

Your project is now live, shareable, and free. The Copy button will also work on GitHub Pages because the site runs over HTTPS.

---

## Author

- **Name:** Shivam Dohare
- **Course/Subject:** Cybersecurity / Web Technology
- **Roll Number:** [044]
- **Department:** [Faculty of computer Aplication]
- **College:** [Monark University]
- **Academic Year:** [e.g. 2024-2027]

---

*PassSafe — Password Security Lab | College Cybersecurity Project*
