# Mac address lookup tool
<div align="center">
  <a href="https://oui.ciscoar.com" target="_blank">
    <img width="702" height="82" alt="svg-oui-url" src="https://github.com/user-attachments/assets/0c89c074-bb74-4b7a-a3c1-76df3b463ca5" />
  </a>
</div>

Simple enter your device MAC address to know its Manufacturer.<br>
<img width="957" height="643" alt="oui-in-action" src="https://github.com/user-attachments/assets/a0201d2f-1026-446b-b5c3-dd761f5dd6ae" />

## Project Overview

This is a MAC address OUI (Organizationally Unique Identifier) lookup tool that identifies device manufacturers from MAC addresses. The application is a Node.js/Express server serving a web interface for looking up multiple MAC addresses.

## Architecture

- **Backend**: Express.js server (`p3025_oui.js`) running on port 3025
- **Frontend**: Static HTML/CSS/JavaScript served from `/public` directory
- **Data Source**: IEEE OUI database fetched from http://standards-oui.ieee.org/oui.txt
- **Caching**: OUI data is cached in memory after first fetch
- **Process Management**: PM2

## Key Components

- `p3025_oui.js`: Main server file with API endpoint `/lookup/:mac` and static file serving
- `public/index.html`: Web interface allowing lookup of up to 6 MAC addresses
- `public/styles.css`: Styling for the web interface
- `public/img/`: Static assets including favicon and logo


