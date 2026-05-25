# FFXIV DPS Overlay Starter

A simple ACT / OverlayPlugin web overlay starter skin inspired by compact overlays like MopiMopi.

## Files

- `index.html` - overlay shell
- `css/style.css` - visual skin
- `js/app.js` - ACT event handling and rendering
- `js/mock-data.js` - fake data for browser preview

## Preview without ACT

Open `index.html` directly in your browser.

## Use in ACT

1. Put this folder somewhere stable, for example:

   `C:\ACTOverlays\ffxiv-dps-overlay-starter\`

2. In ACT, go to:

   `Plugins > OverlayPlugin.dll`

3. Add a new custom overlay.

4. Point it to:

   `file:///C:/ACTOverlays/ffxiv-dps-overlay-starter/index.html`

5. Make sure FFXIV is running in borderless windowed mode.

## Next improvement ideas

- Add real FFXIV job icons.
- Add role-based colors.
- Add compact / expanded modes.
- Add settings stored in localStorage.
- Port to Vite + React + Tailwind after the vanilla JS version works.
