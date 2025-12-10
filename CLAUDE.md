# Connexus Public API - Client Library

## Project Overview

This is the **public client-side JavaScript library** for integrating [connexus.team](https://connexus.team) collaboration site data into any website. This repository is designed to be downloaded and used by third-party developers who want to display Connexus data (events, members, business listings, etc.) on their own websites.

## Architecture

### Two-Repository System

1. **This Repository (Client)**: `connexus_public_api` - Public JavaScript library that website developers include in their sites
2. **Backend Repository (Private)**: Separate repository containing the API server that serves data from the Connexus database

### How It Works

The integration follows a **DOM template replacement pattern**:

1. Website developer creates HTML elements with example/placeholder content
2. Developer marks these elements with specific CSS classes or IDs
3. Developer includes the Connexus JS library and configures it
4. On page load, the JS library:
   - Identifies the template elements (the examples)
   - Fetches real data from the Connexus API backend
   - Clears the example content
   - Populates the DOM with actual data from connexus.team

### Example Usage Pattern

```html
<!-- Developer creates a template structure -->
<div class="connexus-events-container">
  <div class="connexus-event-item" data-connexus-template>
    <h3 class="event-title">Example Event Title</h3>
    <p class="event-date">January 1, 2025</p>
    <p class="event-description">This is placeholder text...</p>
  </div>
</div>

<!-- Include the library -->
<script src="connexus-api.js"></script>
<script>
  ConnexusAPI.init({
    apiKey: 'your-api-key',
    events: {
      container: '.connexus-events-container',
      template: '.connexus-event-item',
      mapping: {
        '.event-title': 'title',
        '.event-date': 'date',
        '.event-description': 'description'
      }
    }
  });
</script>
```

## Directory Structure

```
connexus_api/           # This repository
├── CLAUDE.md           # This file - AI context documentation
├── README.md           # Public documentation for developers
├── src/
│   └── connexus-api.js # Main JavaScript library
├── dist/               # Built/minified files for production
├── examples/           # Example implementations
└── docs/               # Additional documentation

../public_html/         # Example website using this API (sibling directory)
                        # Serves as a reference implementation
```

## Data Types Supported

- **Events**: Community events, meetups, workshops
- **Members**: User profiles and member directories
- **Business Listings**: Local business information
- **[Future]**: Additional data types as needed

## Development Notes

- This is a **public, open-source** project
- The library should be framework-agnostic (vanilla JS)
- Must work with any website that can include JavaScript
- The companion example site at `../public_html` demonstrates integration
- Backend API is hosted separately and serves JSON data

## Key Design Principles

1. **Zero Dependencies**: Pure vanilla JavaScript for maximum compatibility
2. **Template-Based**: Works with developer's existing HTML structure
3. **Non-Invasive**: Doesn't require specific HTML structure, adapts to what's provided
4. **Configurable**: Flexible mapping between data fields and DOM elements
5. **Graceful Degradation**: Example content shows if API is unavailable

## Related Resources

- Main site: https://connexus.team
- Example implementation: `../public_html` directory
- Backend API: (separate private repository)
