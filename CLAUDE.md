# Connexus Public API Client (PUBLIC/Open Source)

> **IMPORTANT**: This is a **PUBLIC, OPEN-SOURCE** JavaScript library (MIT License). It is NOT the backend API.

---

## Quick Reference

| Item | Value |
|------|-------|
| **This Repo** | `connexus_public_api` |
| **GitHub** | `git@github.com:productdesignexperts/connexus_public_api.git` |
| **Server Path** | `/var/www/ococsite.connexus.team/connexus_api` |
| **Public Script URL** | https://ococsite.connexus.team/connexus_api/src/connexus-api.js |
| **Visibility** | **PUBLIC** (open source, MIT) |
| **Log Files** | `/var/log/apache2/ococsite.connexus.team_error.log` |
| **Main Platform** | https://connexus.team |

---

## Repository Distinction

| Repository | Purpose | Visibility |
|------------|---------|------------|
| **`connexus_public_api`** (THIS REPO) | Client JavaScript library for websites | **PUBLIC** - Open source (MIT) |
| `api.connexus.team` | Backend PHP API server | **PRIVATE** - Proprietary |

---

## What This Library Does

This is a vanilla JavaScript library that website developers include in their sites to display Connexus data (events, members, businesses). It uses a **DOM template replacement pattern**:

1. Developer creates HTML with example/placeholder content and CSS classes
2. Developer includes this JS library
3. Developer configures which CSS selectors map to which API data fields
4. Library fetches real data from the backend API
5. Library clones the template and populates it with real data
6. Placeholder content is replaced with live database content

---

## How Users Include This Library

```html
<script src="https://ococsite.connexus.team/connexus_api/src/connexus-api.js"></script>

<script>
  ConnexusAPI.init({
    apiKey: 'their-api-key',
    events: {
      container: '.events-list',
      template: '.event-card',
      mapping: {
        '.title': 'title',
        '.date': 'date',
        '.description': 'description'
      }
    }
  });
</script>
```

---

## Data Flow

```
User's Website
    │
    ├── includes this JS library
    │
    └── ConnexusAPI.init({ apiKey, mapping })
                │
                │ fetch()
                ▼
        https://api.connexus.team/v1/events
                │
                ▼
            MongoDB (ococ_portal)
```

---

## File Structure

```
/var/www/ococsite.connexus.team/connexus_api/
├── CLAUDE.md              # This file
├── README.md              # Public documentation
├── LICENSE                # MIT License
├── .gitignore
├── src/
│   └── connexus-api.js    # Main library (174 lines)
├── dist/                  # Minified builds (TODO)
├── docs/                  # Additional docs
└── examples/              # Example implementations
```

---

## Current Implementation

### ConnexusAPI Object

- `init(options)` - Initialize with config
- `config.baseUrl` - Default: `https://api.connexus.team/v1`
- `config.apiKey` - User's API key
- `config.debug` - Enable console logging

### Supported Data Types

- `events` - Calendar events
- `members` - Member directory
- `businesses` - Business listings

### TODO

- `refresh(type)` - Manual refresh (stub only)
- `discounts` - Not yet implemented in JS
- `announcements` - Not yet implemented in JS
- Minified build in `dist/`

---

## Backend API Endpoints (called by this library)

| Endpoint | Returns |
|----------|---------|
| `GET https://api.connexus.team/v1/events` | Events list |
| `GET https://api.connexus.team/v1/members` | Members list |
| `GET https://api.connexus.team/v1/businesses` | Businesses list |
| `GET https://api.connexus.team/v1/discounts` | Discounts list |
| `GET https://api.connexus.team/v1/announcements` | Announcements list |

### Expected Response Format

```json
{
  "data": [...],
  "meta": { "total": 100, "limit": 20, "offset": 0 }
}
```

---

## Symlink

This directory is symlinked into the public website:

```
/var/www/ococsite.connexus.team/public_html/connexus_api
    → /var/www/ococsite.connexus.team/connexus_api (THIS DIR)
```

---

## Log Files

When debugging issues with this library being served:

```bash
# Check for 404s or access issues
tail -50 /var/log/apache2/ococsite.connexus.team_error.log
tail -50 /var/log/apache2/ococsite.connexus.team_access.log
```

---

## Related Repositories

| Repository | GitHub | Server Path |
|------------|--------|-------------|
| **connexus_public_api** (THIS) | `productdesignexperts/connexus_public_api` | `/var/www/ococsite.connexus.team/connexus_api` |
| api.connexus.team | `productdesignexperts/api.connexus.team` | `/var/www/api.connexus.team` |
| myococ | `productdesignexperts/myococ` | `/var/www/myococ.connexus.team/public_html` |
| ococ_site | `productdesignexperts/ococ_site` | `/var/www/ococsite.connexus.team/public_html` |

---

## Development Guidelines

1. **Vanilla JavaScript only** - No frameworks, no dependencies
2. **Framework-agnostic** - Must work with any website
3. **This is PUBLIC** - Never include secrets or internal URLs
4. **Git commits** - One-line summaries, no Claude attribution
5. **License** - MIT (keep it open source)

---

## Owner

- **User**: vince
- **GitHub**: github.com/productdesignexperts/
