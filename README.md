# Connexus Public API Client

A lightweight JavaScript library for integrating [connexus.team](https://connexus.team) data into your website.

## Overview

This library allows you to display Connexus community data (events, members, business listings) on your own website using a simple template-based approach. You create the HTML structure with example content, and the library replaces it with live data from Connexus.

## Installation

### Option 1: CDN (Recommended)
```html
<script src="https://api.connexus.team/v1/connexus-api.min.js"></script>
```

### Option 2: Self-Hosted
Download `dist/connexus-api.min.js` and include it in your project:
```html
<script src="/path/to/connexus-api.min.js"></script>
```

## Quick Start

### 1. Create Your HTML Template

Create HTML elements with example content. Mark the container and template items:

```html
<div id="events-list">
  <div class="event-card">
    <h3 class="event-title">Sample Event</h3>
    <span class="event-date">December 25, 2025</span>
    <p class="event-description">This is example event text...</p>
  </div>
</div>
```

### 2. Initialize the Library

```html
<script>
  ConnexusAPI.init({
    apiKey: 'YOUR_API_KEY',

    events: {
      container: '#events-list',
      template: '.event-card',
      mapping: {
        '.event-title': 'title',
        '.event-date': 'date',
        '.event-description': 'description'
      }
    }
  });
</script>
```

### 3. Done!

The library will fetch live data and replace your example content automatically.

## Configuration Options

### Events

```javascript
ConnexusAPI.init({
  events: {
    container: '#events-list',      // Container selector
    template: '.event-card',        // Template item selector
    limit: 10,                      // Max items to display
    mapping: {
      '.event-title': 'title',
      '.event-date': 'date',
      '.event-description': 'description',
      '.event-location': 'location',
      '.event-image': { attr: 'src', field: 'imageUrl' }
    }
  }
});
```

### Members

```javascript
ConnexusAPI.init({
  members: {
    container: '#members-grid',
    template: '.member-card',
    limit: 20,
    mapping: {
      '.member-name': 'name',
      '.member-title': 'jobTitle',
      '.member-avatar': { attr: 'src', field: 'avatarUrl' }
    }
  }
});
```

### Business Listings

```javascript
ConnexusAPI.init({
  businesses: {
    container: '#business-directory',
    template: '.business-item',
    mapping: {
      '.business-name': 'name',
      '.business-category': 'category',
      '.business-description': 'description',
      '.business-phone': 'phone',
      '.business-website': { attr: 'href', field: 'websiteUrl' }
    }
  }
});
```

## API Key

To use this library, you need an API key from Connexus:

1. Log in to your [connexus.team](https://connexus.team) account
2. Navigate to Settings > API Access
3. Generate a new API key
4. Use the key in your initialization

## Examples

See the `/examples` directory for complete working examples:

- `basic-events.html` - Simple events list
- `member-directory.html` - Member grid layout
- `business-listings.html` - Business directory
- `full-integration.html` - Complete site integration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- Documentation: https://docs.connexus.team/api
- Issues: https://github.com/productdesignexperts/connexus_public_api/issues
- Email: support@connexus.team
