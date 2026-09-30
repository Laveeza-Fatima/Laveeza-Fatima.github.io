# Portfolio Manual

Your portfolio: **https://laveeza-fatima.github.io**
The code lives on GitHub: https://github.com/Laveeza-Fatima/Laveeza-Fatima.github.io

This folder (`Documents\laveeza-portfolio`) is a copy of that GitHub repo. You edit files here, check them
on your computer, then publish. The live site updates about 1–2 minutes after you publish.

---

## 1. What's in this folder

| File / folder   | What it is                                     | Do you edit it?                        |
|-----------------|------------------------------------------------|----------------------------------------|
| `data.js`       | **All the text and projects on the site**      | **Yes, almost everything happens here** |
| `media/`        | Photos and videos used on the site             | Yes, add or remove files here           |
| `index.html`    | Page structure (menu, sections, headings)      | Rarely                                  |
| `styles.css`    | Colours, fonts, spacing, layout                | Rarely (colours are at the top)         |
| `script.js`     | Animations and behaviour                       | No                                      |
| `preview.bat`   | Double-click to preview the site on your laptop | Just use it                             |
| `publish.bat`   | Double-click to put your changes live          | Just use it                             |
| `.nojekyll`     | Hidden file that tells GitHub to serve the site as-is | Never delete it                   |
| `MANUAL.md`     | This manual                                    | Optional                                |

**Golden rule:** to change what the site *says*, edit `data.js`. You almost never need to touch the other code files.

To edit `data.js`, open it in **VS Code** (you already have it): right-click the file → *Open with Code*.
Notepad also works, but VS Code shows mistakes in red.

---

## 2. The everyday workflow (3 steps)

1. **Edit**: change `data.js` (and add images to `media/` if needed). Save the file (Ctrl+S).
2. **Preview**: double-click `preview.bat`. Your browser opens the site at `http://localhost:8000`.
   After each save, press **Ctrl+F5** in the browser to see the change. Close the black window when done.
3. **Publish**: double-click `publish.bat`, type a short description (e.g. `Added robotics project`),
   press Enter. Wait 1–2 minutes, then open https://laveeza-fatima.github.io and press **Ctrl+F5**.

> The first time you publish, Windows may open a GitHub sign-in window. Sign in with your GitHub account
> and choose "Authorize". It remembers you after that.

**No laptop handy?** You can edit `data.js` directly on GitHub: open the repo link above → click
`data.js` → click the ✏️ pencil icon → make your change → click **Commit changes**. The site updates
the same way. (If you do this, run `git pull` in this folder before editing here again, or just
double-click `publish.bat`. It pulls the latest version for you.)

---

## 3. How `data.js` is written (read this once)

`data.js` is a list of settings. Each line looks like this:

```js
name: "Laveeza Fatima",
```

Rules that keep the site from breaking:

- Text goes **inside double quotes** `"like this"`.
- Every line inside a group ends with a **comma** `,`.
- Groups open and close with brackets: `{ … }` for one item and `[ … ]` for a list of items.
  Always keep them in pairs.
- Apostrophes are fine inside double quotes: `"I'm the co-founder"` ✅
- If you need a double quote inside text, write it as `\"` or use curly quotes “ ”.
- Wrap words in `*asterisks*` to show them in the **orange/italic accent font**,
  e.g. `"& *AI agents*"`. This works in the hero lines and the About paragraph.
- Anything after `//` on a line is a note for you. The site ignores it.

**If the site goes blank or gets stuck on the loading screen after an edit**, you almost certainly
broke one of these rules (a missing comma, quote or bracket). See **Section 9 Troubleshooting**.

---

## 4. Basic details (top of `data.js`)

```js
name: "Laveeza Fatima",
initials: "LF",
role: "Electrical Engineer · Co-Founder, Verafo",   // small line at the top of the hero
location: "Islamabad, Pakistan",                    // top-right of the hero
email: "laveezafatima73@gmail.com",                 // Contact section
phone: "+92 326 7747746",                           // Contact section
resume: "",                                         // CV link (see below)
portrait: "media/portrait.jpg",                     // your photo in the About section
```

`timeZone` and `status` are also in the file but are **not shown** on the site any more. You can ignore them.

**"Download CV" buttons** (About section + Contact section): they open `Laveeza_Fatima_CV.pdf` in this folder.
- **To update your CV:** replace `Laveeza_Fatima_CV.pdf` with the new PDF (same file name), then publish.
  (Your CV source lives in `Documents\Laveeza-CV`: edit `cv.html` and run `python build_pdf.py`, or edit the `.tex` in Overleaf.)
- To use a different file name or a Google Drive link instead, change `resume: "…",` in `data.js`.
- To hide both buttons, set `resume: "",`.

**Change your photo:** put a new photo in `media/` (square works best, e.g. 900×900 px, JPG under ~300 KB),
then change `portrait: "media/your-new-photo.jpg",`.

---

## 5. The hero (first screen) and About section

```js
hero: {
  lines: ["Circuits, code", "& *AI agents*", "that do real work."],   // the huge headline, one item per line
  intro: "Third-year Electrical Engineering student at …",            // small paragraph under the headline
},
```

- Keep headline lines **short** (≈ 2–3 words each) or they will wrap on phones.
- The "Hi, I'm Laveeza Fatima" line is in `index.html` (search for `hero-name`) if you ever want to change it.

```js
about: {
  lead:  "I'm a third-year …",        // the big paragraph that lights up word by word
  body:  "This summer I verified …",  // the smaller paragraph next to your photo
  stats: [
    { value: 2,  suffix: " days", label: "To start filling a Belgian salon's empty calendar" },
    { value: 18, suffix: "%",     label: "Fewer returns for a brand by Verafo in 30 days" },
    …
  ],
},
```

- `value` must be a **plain number without quotes** (it animates counting up), e.g. `value: 5,`.
- `suffix` is the small orange text after it (`"%"`, `"+"`, `" days"`, `"/7"`).
- Keep **4 stats** (they sit in a 2×2 grid). To swap one, just edit its three parts.

**Skills strip** (the scrolling words under the hero):
```js
skills: ["AI Agents", "n8n", "SystemVerilog", …],
```
Add or remove words in the list. Keep the quotes and commas.

---

## 6. Projects (Selected work)

Projects live inside `projects: [ … ]`. Each project is one `{ … },` block. **The order in the file is
the order on the site.** Move a whole block up or down to reorder.

### 6.1 Remove a project
Delete its whole block, from the `{` above `slug:` down to the matching `},`. Then preview to make
sure the page still loads.

### 6.2 Add a new project: copy this template

Paste it inside `projects: [ … ]` where you want it to appear (e.g. right after the `[` to make it first).
Fill in what you have. **Any line you don't need can be deleted completely**, because every section is optional.

```js
    {
      slug: "my-new-project",                 // unique id: lowercase, words joined by dashes, no spaces
      title: "My New Project",                // name shown in the big list
      category: "Hardware",                   // filter button (see note below)
      year: "2026",                           // short tag shown on the right (year, course code, etc.)
      role: "Design & build",
      client: "Solo project",                 // shown as "Context", e.g. team names or client
      stack: ["Tool 1", "Tool 2", "Tool 3"],
      image: "media/my-project-cover.jpg",    // cover picture (delete this line for auto-generated art)
      summary: "One or two sentences that sum the project up.",
      overview: "A short paragraph about what it is and why it matters.",

      highlights: [                           // big orange numbers (use 4, or delete this block)
        { value: "40%", label: "Faster than before" },
        { value: "3", label: "Sensors" },
        { value: "24/7", label: "Monitoring" },
        { value: "1st", label: "Place in competition" },
      ],
      flow: ["Step one", "Step two", "Step three"],          // "How it works" chips (keep it high-level)
      outcomes: ["Result one", "Result two", "Result three"],
      next: ["Future idea 1", "Future idea 2"],               // "What's next" tags

      gallery: [                                              // photos/videos at the bottom
        { type: "image", src: "media/my-project-1.jpg", caption: "Caption text" },
        { type: "image", src: "media/my-project-2.jpg", caption: "A tall/phone screenshot", tall: true },
        { type: "video", src: "media/my-project-demo.mp4", poster: "media/my-project-demo-poster.jpg", caption: "Demo" },
      ],
      links: [
        { label: "View on GitHub", url: "https://github.com/Laveeza-Fatima/REPO-NAME", primary: true },
        { label: "Live demo", url: "https://example.com" },
      ],
    },
```

Notes:
- **`category`** creates the filter buttons automatically. Reuse an existing one exactly as written
  (`"AI & Software"`, `"Hardware"`, `"CAD"`) or type a new one and a new button appears.
- **`challenge` and `solution`** are also supported (each shows as a paragraph like `overview`) if you ever want them:
  `challenge: "…", solution: "…",`
- **No cover image?** Delete the `image:` line and add these instead to get generated art:
  `colors: ["#ff5a1f", "#ffb347"], pattern: "waves",`
  (patterns: `orbs`, `rings`, `grid`, `waves`, `bars`).
- `primary: true` makes a link the orange button. Use it on one link only.
- Advanced blocks you'll see on the booking agent, **copy them from there if needed**:
  `results` (before → after images row) and `journey` (Version 1 → Version 2 cards).

### 6.3 Edit an existing project
Find its `title:` in `data.js` (Ctrl+F) and change the text. To remove one section (say, "What's next"),
delete that whole line/block, e.g. the `next: [ … ],` lines.

---

## 7. Images and videos

1. Put the file in the `media/` folder.
2. Use **lowercase names with dashes, no spaces**: `robot-arm-cover.jpg` ✅, `Robot Arm (1).JPG` ❌.
   GitHub is case-sensitive: `Photo.jpg` and `photo.jpg` are different files.
3. Refer to it in `data.js` as `"media/robot-arm-cover.jpg"`.

**Recommended sizes** (keeps the site fast):

| Use                          | Size                         | Max file size |
|------------------------------|------------------------------|---------------|
| Project cover (`image`)      | 1600×1200 (4:3 landscape)     | ~300 KB       |
| Gallery image                | up to 1600 px wide            | ~300 KB       |
| Phone screenshot (`tall`)    | ~900 px wide                  | ~200 KB       |
| Video                        | MP4 (H.264), 720p–1080p       | **under 10 MB** (GitHub rejects files over 100 MB) |

- Shrink photos for free at **https://squoosh.app** (choose MozJPEG, quality ~80).
- Compress videos with **HandBrake** (free) using the "Fast 1080p30" preset, or trim them shorter.
- For a video, also save one still frame as a JPG and use it as `poster:`. It's shown before the video plays.

**Delete unused media**: if you remove a project, also delete its files from `media/` to keep the repo small.

---

## 8. Other sections

**Services ("What I do")**: `services: [ … ]`. Each item:
```js
{ title: "AI Agents & Automation", text: "Short description…", tags: ["n8n", "LLM APIs"] },
```

**Journey (experience)**: `experience: [ … ]`. Newest first:
```js
{ period: "Jun — Aug 2026", role: "Digital Verification Intern", company: "NUST Chip Design Centre", note: "What you did." },
```

**Social buttons**: `socials: [ … ]`. They appear in the Contact section and phone menu:
```js
{ label: "LinkedIn", url: "https://www.linkedin.com/in/laveeza-fatima-320a2031b/" },
```

**Section headings** ("Selected work", "What I do", "Journey so far", "Let's build something remarkable.")
are in `index.html`. Open it, press Ctrl+F, search the heading text, and change it. Keep the tags around it.

**Colours**: at the very top of `styles.css`:
- `--accent: #ff6a3d;` is the orange used everywhere (dark theme).
- The second `--accent` further down is for the light theme.
Change the hex code (e.g. `#7b5cff` for purple), save, and preview.

---

## 9. Troubleshooting

| Problem | Fix |
|---|---|
| **Site is blank / stuck on the 100% loader** after an edit | A typo in `data.js`. Open the preview, press **F12** → **Console** tab. The red error names the line number. Usually a missing `,` `"` `}` or `]` just before that line. In VS Code, the broken spot is underlined red. |
| **I don't see my change** | Press **Ctrl+F5**. Still old? Open `index.html`, find `?v=5` (3 places) and change them all to `?v=6` (next time `?v=7`, and so on). This forces every visitor's browser to load the new files. |
| **Image/video doesn't show** | Check the file name matches exactly (case, dashes, `.jpg` vs `.jpeg`) and that it's inside `media/`. |
| **`publish.bat` shows an error** | Read the message. "rejected" means GitHub has newer changes: run `publish.bat` again (it pulls first). "Authentication failed" means sign in again in the pop-up. |
| **Preview window closes instantly** | Python isn't found. Reinstall Python from python.org and tick **"Add Python to PATH"**. |
| **I broke something and want to undo** | On GitHub: open the repo → click **Commits** → find the last good version → open `data.js` there → copy its text back. Or ask Claude: *"revert my portfolio to the previous commit"*. |

---

## 10. Good to know

- The private claude.ai preview link (https://claude.ai/artifact/AH7EBsr3Lk1ZS2TabPLs5Y) is a **separate copy**.
  It does **not** update when you publish here. **https://laveeza-fatima.github.io is the one to share.**
- The confidential parts of your work (the full booking-agent workflow, Verafo's recipe) are intentionally
  described only at a high level. Keep new text at that level too.
- Customer names in the Belgian client's calendar screenshots are blurred. Blur anything similar in new
  screenshots before adding them (e.g. with Windows Photos → Edit → markup, or any online blur tool).
- Want a custom domain later (like `laveezafatima.com`)? Buy it, then on GitHub: repo → Settings → Pages →
  Custom domain.
