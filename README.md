# 雅 Miyabi Matcha — Amsterdam

A multi-page website for **Miyabi Matcha Amsterdam**, a Japanese matcha café on the Zeedijk in Chinatown.
Styled after [miyabi-matcha.com](https://www.miyabi-matcha.com/) — calm, minimal, Japanese-inspired.

*Sample by **_ziyad._** @ code-caffeine.*

## Pages
| File | Page |
|------|------|
| `index.html` | Home — hero, story sections, philosophy, DIY teaser, and the **location + map + Instagram** section |
| `menu.html`  | Café menu (matcha, signatures, hojicha, sweets) |
| `matcha.html`| "Our Matcha" — take-home products + how to whisk |
| `about.html` | Our story, values, gallery |

## Run it
It's a plain static site — no build step. Either:

- **Open `index.html`** directly in a browser, or
- Serve the folder (better, so the Google Map iframe behaves):
  ```bash
  # from this folder
  python -m http.server 8000
  # then open http://localhost:8000
  ```

## Add your photos
Drop your 5 images into the **`images/`** folder using the filenames listed in
[`images/README-IMAGES.txt`](images/README-IMAGES.txt). Until then, each spot shows a
soft matcha-green gradient so nothing looks broken.

## Easy things to change
- **Instagram handle / email** — search the files for `miyabimatcha.amsterdam` and `hello@miyabimatcha.nl`.
- **Menu items & prices** — edit `menu.html`.
- **Address / hours** — `Zeedijk 127` and `10:00 – 22:00` appear in the footer + the Visit section of `index.html`.
- **Colours & fonts** — all tokens live at the top of `styles.css` under `:root`.

## Built with
Hand-written HTML/CSS/JS. Google Fonts: *Cormorant Garamond*, *Shippori Mincho*, *Jost*.
No frameworks, no dependencies.
