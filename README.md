# My photography website

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Photos 

The images are not stored in git directly, but live in `public/gallery/`
To deploy a new release with new images, run something along the lines of:
```
gh release create v1.0.0 --title "Portfolio v0.0.1" --notes "Testing release with portfolio images" images.zip
```
