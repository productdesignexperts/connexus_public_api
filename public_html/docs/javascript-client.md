# Connexus API - JavaScript Client (DOM-based)

A lightweight vanilla JavaScript library for integrating Connexus data into your website using DOM template replacement.

## Overview

This approach uses client-side JavaScript to:
1. Fetch data from the Connexus API
2. Clone HTML template elements you define
3. Replace placeholder content with live data

**Best for:** Static sites, SPAs, or any website where you want client-side data loading.

## Installation

### CDN (Recommended)
```html
<script src="https://clientapi.connexus.team/src/connexus-api.js"></script>
```

### Self-Hosted
Download the library and include it locally:
```html
<script src="/path/to/connexus-api.js"></script>
```

## Quick Start

### 1. Create Your HTML Template

Create HTML with placeholder content. The library will clone and populate these templates:

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

The library fetches live data and replaces your placeholder content automatically.

## Configuration Options

### Global Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | null | Your Connexus API key |
| `baseUrl` | string | `https://api.connexus.team/v1` | API base URL |
| `debug` | boolean | false | Enable console logging |

### Data Type Configuration

Each data type (events, members, businesses) accepts:

| Option | Type | Description |
|--------|------|-------------|
| `container` | string | CSS selector for the container element |
| `template` | string | CSS selector for the template item (inside container) |
| `limit` | number | Maximum items to fetch (default: 10) |
| `mapping` | object | Maps CSS selectors to API field names |

### Mapping Options

**Simple text mapping:**
```javascript
'.event-title': 'title'  // Sets textContent
```

**Attribute mapping:**
```javascript
'.event-image': { attr: 'src', field: 'imageUrl' }  // Sets attribute
```

## Data Types

### Events

```javascript
ConnexusAPI.init({
  events: {
    container: '#events-list',
    template: '.event-card',
    limit: 10,
    mapping: {
      '.event-title': 'title',
      '.event-date': 'date',
      '.event-time': 'time',
      '.event-location': 'location',
      '.event-description': 'description',
      '.event-price': 'price',
      '.event-type': 'eventType',
      '.event-image': { attr: 'src', field: 'thumbnail.src' },
      '.event-link': { attr: 'href', field: 'primary_cta.href' }
    }
  }
});
```

**Available Event Fields:**
- `id` - Unique identifier
- `title` - Event name
- `date` - Date (YYYY-MM-DD format)
- `time` - Time range (e.g., "6:00 PM - 9:00 PM")
- `location` - Venue name and address
- `description` - Event description
- `price` - "Free" or price with $ (e.g., "$25")
- `eventType` - Category (Networking, Workshop, etc.)
- `thumbnail.src` - Event image URL
- `thumbnail.alt` - Image alt text
- `primary_cta.label` - Primary button text
- `primary_cta.href` - Primary button URL
- `secondary_cta.label` - Secondary button text
- `secondary_cta.href` - Secondary button URL

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
      '.member-company': 'company',
      '.member-avatar': { attr: 'src', field: 'avatarUrl' }
    }
  }
});
```

### Businesses

```javascript
ConnexusAPI.init({
  businesses: {
    container: '#business-directory',
    template: '.business-item',
    limit: 20,
    mapping: {
      '.business-name': 'businessName',
      '.business-category': 'category',
      '.business-description': 'description',
      '.business-address': 'addressLine1',
      '.business-city': 'city',
      '.business-phone': 'phone',
      '.business-website': { attr: 'href', field: 'websiteUrl' },
      '.business-logo': { attr: 'src', field: 'logoUrl' }
    }
  }
});
```

**Available Business Fields:**
- `id` - Unique identifier
- `businessName` - Business display name
- `logoUrl` - Logo image URL
- `category` - Business category
- `addressLine1` - Street address
- `city` - City name
- `state` - State abbreviation
- `zip` - ZIP code
- `phone` - Business phone
- `websiteUrl` - Website URL
- `description` - Business description
- `contactName` - Contact person name

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Events - My Website</title>
  <style>
    .event-card {
      border: 1px solid #ddd;
      padding: 16px;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <h1>Upcoming Events</h1>

  <div id="events-list">
    <div class="event-card">
      <h2 class="event-title">Example Event</h2>
      <span class="event-date">January 1, 2025</span>
      <p class="event-description">Placeholder description text.</p>
    </div>
  </div>

  <script src="https://clientapi.connexus.team/src/connexus-api.js"></script>
  <script>
    ConnexusAPI.init({
      apiKey: 'YOUR_API_KEY',
      debug: true,

      events: {
        container: '#events-list',
        template: '.event-card',
        limit: 5,
        mapping: {
          '.event-title': 'title',
          '.event-date': 'date',
          '.event-description': 'description'
        }
      }
    });
  </script>
</body>
</html>
```

## API Endpoints

The JavaScript client calls these endpoints:

| Endpoint | Description |
|----------|-------------|
| `GET /v1/events` | Fetch events list |
| `GET /v1/featured-events` | Fetch featured event |
| `GET /v1/members` | Fetch members list |
| `GET /v1/businesses` | Fetch business directory |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**Data not loading:**
- Check browser console for errors
- Verify API key is correct
- Ensure container and template selectors match your HTML
- Enable `debug: true` for verbose logging

**Template not cloning:**
- Verify the template element exists inside the container
- Check that CSS selectors are valid

## See Also

- [PHP Integration Guide](./php-integration.md) - Server-side integration using PHP/cURL
- [API Reference](./api-reference.md) - Complete API documentation
