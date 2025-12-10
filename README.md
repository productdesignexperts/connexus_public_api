# Connexus Public API Client

A client library for integrating [connexus.team](https://connexus.team) data into your website.

## Overview

This library allows you to display Connexus community data (events, members, business listings) on your own website. Choose the integration method that best fits your needs:

| Method | Best For | Rendering |
|--------|----------|-----------|
| **JavaScript (DOM)** | Static sites, SPAs | Client-side |
| **PHP (cURL)** | PHP websites, WordPress | Server-side |

## Quick Links

- [JavaScript Client Documentation](public_html/docs/javascript-client.md) - DOM-based template replacement
- [PHP Integration Documentation](public_html/docs/php-integration.md) - Server-side cURL approach
- [API Reference](public_html/docs/api-reference.md) - Complete endpoint documentation

---

## JavaScript Integration (Client-Side)

Use this approach when you want client-side data loading with DOM template replacement.

### Installation

```html
<script src="https://clientapi.connexus.team/src/connexus-api.js"></script>
```

### Quick Start

```html
<!-- 1. Create HTML template with placeholder content -->
<div id="events-list">
  <div class="event-card">
    <h3 class="event-title">Sample Event</h3>
    <span class="event-date">December 25, 2025</span>
    <p class="event-description">This is example text...</p>
  </div>
</div>

<!-- 2. Include library and initialize -->
<script src="https://clientapi.connexus.team/src/connexus-api.js"></script>
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

[Full JavaScript Documentation](public_html/docs/javascript-client.md)

---

## PHP Integration (Server-Side)

Use this approach for server-side rendering with PHP and cURL.

### Quick Start

Create an include file (`components/events-data.php`):

```php
<?php
// Fetch events from API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.connexus.team/v1/events?limit=100');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$allEvents = [];
if ($httpCode === 200 && $response) {
    $json = json_decode($response, true);
    $allEvents = $json['data'] ?? [];
}
```

Use in your page:

```php
<?php
include 'components/events-data.php';

foreach ($allEvents as $event): ?>
  <div class="event-card">
    <h3><?php echo htmlspecialchars($event['title']); ?></h3>
    <p><?php echo htmlspecialchars($event['date']); ?></p>
  </div>
<?php endforeach; ?>
```

[Full PHP Documentation](public_html/docs/php-integration.md)

---

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /v1/events` | Fetch events list |
| `GET /v1/featured-events` | Fetch featured event |
| `GET /v1/members` | Fetch members list |
| `GET /v1/businesses` | Fetch business directory |
| `POST /v1/join-events` | Submit event signup form |
| `POST /v1/contact` | Submit contact form |

Base URL: `https://api.connexus.team/v1`

[Full API Reference](public_html/docs/api-reference.md)

---

## Getting an API Key

1. Log in to your [connexus.team](https://connexus.team) account
2. Navigate to Settings > API Access
3. Generate a new API key
4. Use the key in your integration

---

## Examples

See the `/public_html/examples` directory for working examples:

- `basic-events.html` - Simple events list (JavaScript)

---

## Documentation

| Document | Description |
|----------|-------------|
| [JavaScript Client](public_html/docs/javascript-client.md) | DOM-based integration guide |
| [PHP Integration](public_html/docs/php-integration.md) | Server-side cURL guide |
| [API Reference](public_html/docs/api-reference.md) | Complete endpoint documentation |

---

## Browser Support (JavaScript)

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## PHP Requirements

- PHP 7.0+
- cURL extension enabled

---

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- Documentation: https://clientapi.connexus.team/docs/
- Issues: https://github.com/productdesignexperts/connexus_public_api/issues
- Email: support@connexus.team
