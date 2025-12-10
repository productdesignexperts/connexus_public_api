# Connexus Public API Client (PUBLIC/Open Source)

> **IMPORTANT**: This is a **PUBLIC, OPEN-SOURCE** client library (MIT License). It is NOT the backend API.

---

## Quick Reference

| Item | Value |
|------|-------|
| **This Repo** | `connexus_public_api` |
| **GitHub** | `git@github.com:productdesignexperts/connexus_public_api.git` |
| **Server Path** | `/var/www/clientapi.connexus.team` |
| **Document Root** | `/var/www/clientapi.connexus.team/public_html` |
| **Public URL** | https://clientapi.connexus.team |
| **Script URL** | https://clientapi.connexus.team/src/connexus-api.js |
| **Visibility** | **PUBLIC** (open source, MIT) |
| **Log Files** | `/var/log/apache2/clientapi.connexus.team_error.log` |
| **Main Platform** | https://connexus.team |

---

## Repository Distinction

| Repository | Purpose | Visibility |
|------------|---------|------------|
| **`connexus_public_api`** (THIS REPO) | Client library for websites | **PUBLIC** - Open source (MIT) |
| `api.connexus.team` | Backend PHP API server | **PRIVATE** - Proprietary |

---

## What This Library Provides

This repository provides **two integration methods** for displaying Connexus data on external websites:

### 1. JavaScript Client (DOM-based)
- Vanilla JavaScript library
- Client-side data fetching
- DOM template replacement pattern
- Location: `public_html/src/connexus-api.js`
- Docs: `public_html/docs/javascript-client.md`

### 2. PHP Integration (cURL-based)
- Server-side data fetching using cURL
- Returns PHP arrays for custom templating
- Location: Documented patterns (not bundled files)
- Docs: `public_html/docs/php-integration.md`

---

## File Structure

```
/var/www/clientapi.connexus.team/       (GIT REPO ROOT)
├── CLAUDE.md                           # This file
├── README.md                           # Public documentation
├── LICENSE                             # MIT License
├── .gitignore
└── public_html/                        # Document root (Apache serves this)
    ├── src/
    │   └── connexus-api.js             # JavaScript library
    ├── docs/                           # Documentation
    │   ├── javascript-client.md        # JS DOM-based guide
    │   ├── php-integration.md          # PHP cURL guide
    │   └── api-reference.md            # API endpoint reference
    ├── dist/                           # Minified builds (TODO)
    └── examples/                       # Example implementations
        └── basic-events.html
```

---

## Integration Methods

### JavaScript (DOM) Approach

Website developers:
1. Include the JS library from CDN
2. Create HTML with placeholder content and CSS classes
3. Configure which CSS selectors map to which API data fields
4. Library fetches real data and populates templates

```html
<script src="https://clientapi.connexus.team/src/connexus-api.js"></script>
<script>
  ConnexusAPI.init({
    apiKey: 'their-api-key',
    events: {
      container: '.events-list',
      template: '.event-card',
      mapping: {
        '.title': 'title',
        '.date': 'date'
      }
    }
  });
</script>
```

### PHP (cURL) Approach

Website developers:
1. Create PHP include files with cURL calls
2. Fetch data server-side before page renders
3. Use standard PHP templating with the returned arrays

```php
<?php
// Include data fetcher
include 'components/events-data.php';

// $allEvents now contains API data
foreach ($allEvents as $event):
?>
  <div class="event"><?php echo htmlspecialchars($event['title']); ?></div>
<?php endforeach; ?>
```

---

## Data Flow

```
User's Website
    │
    ├── JavaScript Method:
    │   └── includes connexus-api.js
    │       └── fetch() to API
    │
    ├── PHP Method:
    │   └── cURL requests to API
    │
    ▼
https://api.connexus.team/v1/...
    │
    ▼
MongoDB (ococ_portal)
```

---

## API Endpoints (called by this library)

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/v1/events` | GET | Events list |
| `/v1/featured-events` | GET | Featured event |
| `/v1/members` | GET | Members list |
| `/v1/businesses` | GET | Businesses list |
| `/v1/businesses/:id` | GET | Single business |
| `/v1/join-events` | POST | Form submission |
| `/v1/contact` | POST | Form submission |

### Expected Response Format

```json
{
  "data": [...],
  "meta": { "total": 100, "limit": 20, "offset": 0 }
}
```

---

## Documentation Files

| File | Purpose |
|------|---------|
| `public_html/docs/javascript-client.md` | JavaScript DOM integration guide |
| `public_html/docs/php-integration.md` | PHP cURL integration guide |
| `public_html/docs/api-reference.md` | Complete API endpoint documentation |

---

## Log Files

When debugging issues with this library being served:

```bash
# Check for 404s or access issues
tail -50 /var/log/apache2/clientapi.connexus.team_error.log
tail -50 /var/log/apache2/clientapi.connexus.team_access.log
```

---

## Related Repositories

| Repository | GitHub | Server Path | Purpose |
|------------|--------|-------------|---------|
| **connexus_public_api** (THIS) | `productdesignexperts/connexus_public_api` | `/var/www/clientapi.connexus.team` | Client library |
| ococ_site | `productdesignexperts/ococ_site` | `/var/www/ococsite.connexus.team` | Public website |
| api.connexus.team | `productdesignexperts/api.connexus.team` | `/var/www/api.connexus.team` | Backend API |
| myococ | `productdesignexperts/myococ` | `/var/www/myococ.connexus.team` | Dashboard & Admin |

---

## Architecture Overview

```
                    ┌─────────────────────────────────────┐
                    │         connexus.team               │
                    │      (Main Platform Entry)          │
                    └─────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│  ococsite         │   │  myococ           │   │  api.connexus     │
│  .connexus.team   │   │  .connexus.team   │   │  .team            │
│                   │   │                   │   │                   │
│  Public Website   │   │  Member Dashboard │   │  Backend API      │
│                   │   │  + Admin Panel    │   │  (PHP/MongoDB)    │
└───────────────────┘   └───────────────────┘   └───────────────────┘
                                                         ▲
                                                         │
┌───────────────────┐                                    │
│  clientapi        │                                    │
│  .connexus.team   │─────── fetches data from ─────────┘
│  (THIS REPO)      │
│  Client Library   │
│  - JS (DOM)       │
│  - PHP (cURL)     │
└───────────────────┘
```

---

## Development Guidelines

1. **Vanilla JavaScript only** - No frameworks, no dependencies for JS library
2. **Framework-agnostic** - Must work with any website
3. **This is PUBLIC** - Never include secrets or internal URLs
4. **Git commits** - One-line summaries, no Claude attribution
5. **License** - MIT (keep it open source)

---

## TODO

- [ ] Minified build in `dist/`
- [ ] `refresh(type)` method implementation in JS
- [ ] Additional examples (members, businesses)
- [ ] PHP example files

---

## Owner

- **User**: vince
- **GitHub**: github.com/productdesignexperts/
