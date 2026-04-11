# 🏔️ Uttarakhand Radio — Dev Bhoomi FM

A live-feel internet radio station that streams folk music from Uttarakhand
— Garhwali, Kumaoni and wider Pahadi traditions — straight from the public
[Internet Archive](https://archive.org). No build tools, no backend, just
three static files you can host for free on GitHub Pages.

> देवभूमि उत्तराखंड की धुन, आपके ब्राउज़र में।

## ✨ What it does

- 🎧 Plays a rotating playlist of 15 public-domain Uttarakhand recordings
- 📻 Auto-advances track to track so it feels like a live station
- 🔀 Shuffle is on by default, can be toggled off for playlist order
- ⏯️ Space = play/pause, ← → = prev/next
- 🏔️ Himalayan mountain backdrop with parallax ranges and a rising sun
- 💯 Pure HTML / CSS / JS — zero dependencies, zero build step

## 📁 Files

```
UttarakhandRadio/
├── index.html     ← page structure
├── styles.css     ← Himalayan theme
├── radio.js       ← player engine
├── playlist.js    ← the track list (edit this to add songs)
└── README.md
```

## ▶️ Run it locally

Any static file server works. The simplest:

```bash
cd UttarakhandRadio
python3 -m http.server 4173
```

Then open <http://localhost:4173> in a browser.

## 🚀 Deploy to GitHub Pages (free hosting)

These instructions are written for someone who has **never used GitHub
before**. You only need a browser.

### 1. Create a GitHub account
Sign up at <https://github.com/signup> if you don't have one.

### 2. Create a new repository
1. Click the **+** icon (top-right) → **New repository**
2. Repository name: `uttarakhand-radio`
3. Set it to **Public**
4. ✅ Check *"Add a README file"*
5. Click **Create repository**

### 3. Upload the files
1. On the new repo page, click **Add file → Upload files**
2. Drag and drop **all four files**:
   - `index.html`
   - `styles.css`
   - `radio.js`
   - `playlist.js`
3. Scroll down and click **Commit changes**

### 4. Turn on GitHub Pages
1. Click **Settings** (top menu of the repo)
2. In the left sidebar, click **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Branch: `main`, Folder: `/ (root)`, click **Save**
5. Wait about 1 minute — a green box will appear with your live URL:
   `https://<your-username>.github.io/uttarakhand-radio/`

That's it. Your radio station is live on the internet. 🎉

### (Optional) Use a custom domain
If you own a domain (e.g. `uttarakhandradio.in`), add it in
**Settings → Pages → Custom domain**. GitHub shows the DNS records you
need to add at your registrar.

## ✏️ Add or change songs

Open `playlist.js` and add a new entry:

```js
{
  title: "Your Track Title",
  artist: "Artist Name",
  album: "Album / Collection",
  language: "Garhwali",        // or Kumaoni, Pahadi, etc.
  identifier: "archive-item-id",
  file: "filename.mp3"
}
```

To find a track on Internet Archive:
1. Go to <https://archive.org/details/audio>
2. Search for *Uttarakhand*, *Garhwali*, *Kumaoni*, *Pahadi* etc.
3. Open the item page. The URL looks like
   `https://archive.org/details/<identifier>` — that's your `identifier`.
4. Click **Show All** under *Download Options* and copy the `.mp3`
   filename.
5. Paste them into `playlist.js`, commit, and the new song goes live.

## 🎵 Current playlist credits

All recordings are sourced from freely available public archives. Full
credit belongs to the original artists, performers and institutions:

- **Narendra Singh Negi** — the legendary voice of Garhwal
- **Shri Yogender Bhandari & Group** — Garhwali Folk Songs
  (Indian Council for Cultural Relations, ICCR)
- **Indira Gandhi Rashtriya Manav Sangrahalaya (IGRMS)** —
  *Folk Songs of Uttarakhand*, *Pahadi Culture of Uttarakhand*,
  *Lok Geet Gayan Vadan*
- **Centre for Cultural Resources and Training (CCRT)** —
  *Regional Songs* collection
- **Kakesh.com** — Kumaoni Holi uploads

If you are an artist or rights-holder and would like a recording removed
from the playlist, please open an issue on this repo.

## 🤝 Why no YouTube / Spotify / JioSaavn?

Those services don't allow free embedding without a paid API key and
auth flows, and the tracks would disappear whenever the label changes
terms. The Internet Archive is a permanent, public library — these
recordings aren't going anywhere.

## 📜 License

The **code** in this repo (HTML, CSS, JavaScript) is MIT licensed — do
whatever you want with it.

The **audio recordings** are hosted by Internet Archive under their own
terms — please visit each item page on archive.org for its individual
license.

Uttarakhand Radio is a personal, non-commercial tribute to the music of
the Himalayas. 🙏
