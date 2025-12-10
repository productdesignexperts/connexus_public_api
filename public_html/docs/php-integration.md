# Connexus API - PHP Integration (Server-Side)

A server-side approach for integrating Connexus data into PHP websites using cURL.

## Overview

This approach uses PHP to:
1. Fetch data from the Connexus API server-side using cURL
2. Return data as PHP arrays for use in your templates
3. Render data using your own PHP templating logic

**Best for:** PHP websites, WordPress themes, or any server-side rendered site where you want SEO-friendly content.

## Quick Start

### 1. Create a Data Include File

Create a PHP file that fetches data from the API:

```php
<?php
/**
 * Events Data Include
 * Fetches event data from API
 */

// Fetch all events from API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.connexus.team/v1/events?limit=100');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$eventsResponse = curl_exec($ch);
$eventsHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$allEvents = [];
if ($eventsHttpCode === 200 && $eventsResponse) {
    $json = json_decode($eventsResponse, true);
    $allEvents = $json['data'] ?? [];
}
```

### 2. Include and Use the Data

```php
<?php
// Include the data fetcher
include 'components/events-data.php';

// Now use $allEvents in your template
foreach ($allEvents as $event): ?>
  <div class="event-card">
    <h3><?php echo htmlspecialchars($event['title']); ?></h3>
    <p><?php echo htmlspecialchars($event['date']); ?></p>
    <p><?php echo htmlspecialchars($event['location']); ?></p>
  </div>
<?php endforeach; ?>
```

## API Reference

### Base URL

```
https://api.connexus.team/v1
```

### Authentication

Include your API key as a query parameter:
```
?api_key=YOUR_API_KEY
```

Or use Bearer token authentication:
```php
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY'
]);
```

---

## Events API

### GET /v1/events

Fetch a list of events.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 100 | Number of events to return |
| `offset` | integer | 0 | Pagination offset |

**Example Request:**
```php
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

**Response Structure:**
```json
{
  "data": [
    {
      "id": "event-123",
      "title": "Event Title",
      "date": "2025-01-15",
      "time": "6:00 PM - 9:00 PM",
      "location": "Venue Name, Address",
      "description": "Event description text...",
      "price": "Free",
      "eventType": "Networking",
      "thumbnail": {
        "src": "/images/event-image.jpg",
        "alt": "Image description"
      },
      "badges": [
        { "label": "Members Only", "variant": "primary" }
      ],
      "primary_cta": {
        "label": "RSVP (Free)",
        "href": "/event-detail-page"
      },
      "secondary_cta": {
        "label": "Details",
        "href": "/events/event-slug"
      }
    }
  ]
}
```

**Event Object Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique event identifier (slug format) |
| `title` | string | Event name |
| `date` | string | Date in YYYY-MM-DD format |
| `time` | string | Time range (e.g., "6:00 PM - 9:00 PM") |
| `location` | string | Venue name and address |
| `description` | string | Event description |
| `price` | string | "Free" or price with $ (e.g., "$25") |
| `eventType` | string | Category: Networking, Workshop, Luncheon, etc. |
| `thumbnail` | object | Contains `src` and `alt` for event image |
| `badges` | array | Array of badge objects with `label` and `variant` |
| `primary_cta` | object | Primary call-to-action with `label` and `href` |
| `secondary_cta` | object/null | Secondary call-to-action or null |

### GET /v1/featured-events

Fetch the featured event for display in hero sections.

**Example Request:**
```php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.connexus.team/v1/featured-events');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$featuredEvent = null;
if ($httpCode === 200 && $response) {
    $json = json_decode($response, true);
    $featuredEvent = $json['data'] ?? null;
}
```

**Response Structure:**
```json
{
  "data": {
    "title": "Annual Gala",
    "date": "2025-12-14",
    "time": "6:00 PM",
    "location": "Convention Center",
    "description": "Join us for an evening of celebration...",
    "image": {
      "src": "/images/events/annual-gala-hero.jpg",
      "alt": "Guests at the Annual Gala"
    },
    "primary_cta": {
      "label": "Reserve Table ($2,500)",
      "href": "/events/annual-gala/reserve-table"
    },
    "secondary_cta": {
      "label": "Sponsorships",
      "href": "/events/annual-gala/sponsorships"
    }
  }
}
```

---

## Business Directory API

### GET /v1/businesses

Fetch business directory listings.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 20 | Number of businesses (max: 100) |
| `offset` | integer | 0 | Pagination offset |
| `category` | string | - | Filter by business category |
| `city` | string | - | Filter by city |
| `q` | string | - | Search query |

**Example Request:**
```php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.connexus.team/v1/businesses?limit=100&api_key=YOUR_KEY');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$businesses = [];
if ($httpCode === 200 && $response) {
    $json = json_decode($response, true);
    $businesses = $json['data'] ?? [];
}
```

**Response Structure:**
```json
{
  "data": [
    {
      "id": "68f08f3bb65335b0950b0884",
      "businessName": "Great Advertising",
      "logoUrl": "/uploads/company_photo_68f08f3bb65335b0950b0884.png",
      "category": "Marketing",
      "addressLine1": "123 Main Street",
      "city": "Orlando",
      "state": "FL",
      "zip": "32801",
      "phone": "888-888-8888",
      "websiteUrl": "https://greatadvertising.com",
      "description": "This is a great advertising company.",
      "contactName": "Jennifer Roland"
    }
  ],
  "meta": {
    "total": 25,
    "limit": 100,
    "offset": 0
  }
}
```

**Business Object Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique business identifier |
| `businessName` | string | Business display name |
| `logoUrl` | string | Path to uploaded logo |
| `category` | string | Business category |
| `addressLine1` | string | Street address |
| `city` | string | City name |
| `state` | string | State abbreviation |
| `zip` | string | ZIP code |
| `phone` | string | Business phone number |
| `websiteUrl` | string | Business website URL |
| `description` | string | Business description |
| `contactName` | string | Member contact name |

### GET /v1/businesses/:id

Fetch a single business by ID.

**Example Request:**
```php
$businessId = '68f08f3bb65335b0950b0884';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.connexus.team/v1/businesses/{$businessId}?api_key=YOUR_KEY");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$business = null;
if ($httpCode === 200 && $response) {
    $json = json_decode($response, true);
    $business = $json['data'] ?? null;
}
```

---

## Form Submission APIs

### POST /v1/join-events

Handle "Join Event Calendar" form submissions.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Email address |
| `first-name` | string | Yes | First name |
| `last-name` | string | Yes | Last name |
| `phone` | string | No | Phone number |
| `company` | string | No | Company/occupation |

**Example Request (JavaScript):**
```javascript
const data = {
  'first-name': 'John',
  'last-name': 'Doe',
  'email': 'john@example.com',
  'phone': '555-555-5555',
  'company': 'Acme Corp'
};

const response = await fetch('https://api.connexus.team/v1/join-events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

const result = await response.json();
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for signing up! You will receive event reminders.",
  "existing_user": false
}
```

### POST /v1/contact

Handle contact form submissions.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `business-email` | string | Yes | Business email |
| `first-name` | string | Yes | First name |
| `last-name` | string | Yes | Last name |
| `business-name` | string | No | Business name |
| `business-phone` | string | No | Business phone |
| `mobile-phone` | string | No | Mobile phone |
| `message` | string | No | Message content |
| `opt-in` | boolean | No | Marketing opt-in |

**Example Request (JavaScript):**
```javascript
const data = {
  'first-name': 'Jane',
  'last-name': 'Smith',
  'business-email': 'jane@company.com',
  'business-name': 'Smith Industries',
  'business-phone': '555-123-4567',
  'mobile-phone': '555-987-6543',
  'message': 'I would like to learn more about membership.',
  'opt-in': true
};

const response = await fetch('https://api.connexus.team/v1/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

const result = await response.json();
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will be in touch shortly.",
  "existing_user": false
}
```

---

## Complete Example: Events Data Include

Create `components/events-data.php`:

```php
<?php
/**
 * Events Data Include
 *
 * Fetches event data from API and sets up:
 * - $allEvents - Array of all events for listings/calendar
 * - $featuredEvent - Featured event for hero sections
 */

// Fetch all events from API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.connexus.team/v1/events?limit=100');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$eventsResponse = curl_exec($ch);
$eventsHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$allEvents = [];
if ($eventsHttpCode === 200 && $eventsResponse) {
    $json = json_decode($eventsResponse, true);
    $allEvents = $json['data'] ?? [];
}

// Fetch featured event from API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.connexus.team/v1/featured-events');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$featuredResponse = curl_exec($ch);
$featuredHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$featuredEvent = null;
if ($featuredHttpCode === 200 && $featuredResponse) {
    $json = json_decode($featuredResponse, true);
    $featuredEvent = $json['data'] ?? null;
}

// Fallback if featured event fetch failed
if (!$featuredEvent) {
    $featuredEvent = [
        'title' => 'No Featured Event',
        'date' => date('Y-m-d'),
        'time' => 'TBD',
        'location' => 'TBD',
        'description' => 'No featured events available.',
        'image' => [
            'src' => '/images/placeholder.jpg',
            'alt' => 'Event placeholder'
        ],
        'primary_cta' => [
            'label' => 'View Events',
            'href' => '/events.php',
        ],
        'secondary_cta' => null
    ];
}
```

Use in your page:

```php
<?php
$pageTitle = 'Upcoming Events';
include 'components/events-data.php';
?>
<!DOCTYPE html>
<html>
<head><title><?php echo $pageTitle; ?></title></head>
<body>
  <h1>Upcoming Events</h1>

  <?php foreach ($allEvents as $event): ?>
    <div class="event-card">
      <h3><?php echo htmlspecialchars($event['title']); ?></h3>
      <p><?php echo htmlspecialchars($event['date']); ?> at <?php echo htmlspecialchars($event['time']); ?></p>
      <p><?php echo htmlspecialchars($event['location']); ?></p>
      <p><?php echo htmlspecialchars($event['description']); ?></p>
    </div>
  <?php endforeach; ?>
</body>
</html>
```

---

## Complete Example: Business Directory Include

Create `components/directory-data.php`:

```php
<?php
/**
 * Directory Data Include
 *
 * Fetches business directory data from API
 */

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.connexus.team/v1/businesses?limit=100&api_key=YOUR_KEY');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$businessesResponse = curl_exec($ch);
$businessesHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$businesses = [];
if ($businessesHttpCode === 200 && $businessesResponse) {
    $json = json_decode($businessesResponse, true);
    $businesses = $json['data'] ?? [];
}
```

---

## Error Handling

Always implement fallbacks when API calls fail:

```php
// Check HTTP code
if ($httpCode !== 200) {
    error_log("API request failed with code: $httpCode");
    $data = []; // Use empty array as fallback
}

// Check for valid JSON
$json = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("Invalid JSON response: " . json_last_error_msg());
    $data = [];
}

// Use null coalescing for safe access
$data = $json['data'] ?? [];
```

---

## See Also

- [JavaScript Client Guide](./javascript-client.md) - Client-side integration
- [API Reference](./api-reference.md) - Complete API documentation
