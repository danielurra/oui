# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a MAC address OUI (Organizationally Unique Identifier) lookup tool that identifies device manufacturers from MAC addresses. The application is a Node.js/Express server serving a web interface for looking up multiple MAC addresses.

## Architecture

- **Backend**: Express.js server (`p3025_oui.js`) running on port 3025
- **Frontend**: Static HTML/CSS/JavaScript served from `/public` directory
- **Data Source**: IEEE OUI database fetched from http://standards-oui.ieee.org/oui.txt
- **Caching**: OUI data is cached in memory after first fetch
- **Process Management**: Configured for PM2 with `process.json`

## Key Components

- `p3025_oui.js`: Main server file with API endpoint `/lookup/:mac` and static file serving
- `public/index.html`: Web interface allowing lookup of up to 6 MAC addresses
- `public/styles.css`: Styling for the web interface
- `public/img/`: Static assets including favicon and logo

## Common Commands

### Development
```bash
node p3025_oui.js
```

### Production (PM2)
```bash
pm2 start process.json
pm2 restart p3025_oui
pm2 stop p3025_oui
pm2 logs p3025_oui
```

### Package Management
```bash
npm install
```

## API Endpoints

- `GET /lookup/:mac` - Returns manufacturer for given MAC address
- `GET /` - Serves the main HTML interface
- `GET /favicon.ico` - Serves favicon

## Dependencies

- `express`: Web server framework
- `axios`: HTTP client for fetching OUI data

## File Structure

- Root server file: `p3025_oui.js`
- Static content: `public/` directory
- Process config: `process.json` (PM2 configuration)
- Dependencies: `package.json`

## Notes

- MAC addresses are validated and cleaned (non-hex characters removed)
- OUI data is fetched once and cached for performance
- Frontend supports batch lookup of multiple MAC addresses
- Error handling for invalid MAC formats and network failures