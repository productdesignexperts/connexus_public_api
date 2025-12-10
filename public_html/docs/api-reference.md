# Connexus API Reference

Complete API documentation for the Connexus Public API.

## Base URL

```
https://api.connexus.team/v1
```

## Authentication

Include your API key using one of these methods:

**Query Parameter:**
```
GET /v1/events?api_key=YOUR_API_KEY
```

**Authorization Header:**
```
Authorization: Bearer YOUR_API_KEY
```

## Response Format

All responses follow this structure:

```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "limit": 20,
    "offset": 0
  }
}
```

For single-item responses:
```json
{
  "data": { ... }
}
```

For errors:
```json
{
  "error": "Error message here"
}
```

---

## Endpoints

### Events

#### GET /v1/events

Fetch a list of events.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 100 | Max events to return |
| `offset` | integer | 0 | Pagination offset |

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `title` | string | Event name |
| `date` | string | YYYY-MM-DD format |
| `time` | string | Time range |
| `location` | string | Venue and address |
| `description` | string | Event description |
| `price` | string | "Free" or "$XX" |
| `eventType` | string | Category |
| `thumbnail` | object | `{src, alt}` |
| `badges` | array | `[{label, variant}]` |
| `primary_cta` | object | `{label, href}` |
| `secondary_cta` | object/null | `{label, href}` or null |

---

#### GET /v1/featured-events

Fetch the featured event.

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Event name |
| `date` | string | YYYY-MM-DD format |
| `time` | string | Event time |
| `location` | string | Venue name |
| `description` | string | Event description |
| `image` | object | `{src, alt}` |
| `primary_cta` | object | `{label, href}` |
| `secondary_cta` | object/null | `{label, href}` or null |

---

### Business Directory

#### GET /v1/businesses

Fetch business listings.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 20 | Max businesses (max: 100) |
| `offset` | integer | 0 | Pagination offset |
| `category` | string | - | Filter by category |
| `city` | string | - | Filter by city |
| `q` | string | - | Search query |

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `businessName` | string | Business name |
| `logoUrl` | string | Logo image path |
| `category` | string | Business category |
| `addressLine1` | string | Street address |
| `city` | string | City |
| `state` | string | State abbreviation |
| `zip` | string | ZIP code |
| `phone` | string | Phone number |
| `websiteUrl` | string | Website URL |
| `description` | string | Business description |
| `contactName` | string | Contact person |

---

#### GET /v1/businesses/:id

Fetch a single business by ID.

---

### Members

#### GET /v1/members

Fetch member listings.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 20 | Max members to return |
| `offset` | integer | 0 | Pagination offset |

---

### Form Submissions

#### POST /v1/join-events

Submit "Join Event Calendar" form.

**Request Body:**
```json
{
  "email": "user@example.com",
  "first-name": "John",
  "last-name": "Doe",
  "phone": "555-555-5555",
  "company": "Acme Corp"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for signing up!",
  "existing_user": false
}
```

---

#### POST /v1/contact

Submit contact form.

**Request Body:**
```json
{
  "business-email": "user@example.com",
  "first-name": "Jane",
  "last-name": "Smith",
  "business-name": "Smith Industries",
  "business-phone": "555-123-4567",
  "mobile-phone": "555-987-6543",
  "message": "I would like more information.",
  "opt-in": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us!",
  "existing_user": false
}
```

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing API key |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error |

---

## Rate Limits

- 100 requests per minute per API key
- 1000 requests per hour per API key

---

## CORS

The API supports CORS for browser-based requests. All origins are allowed for GET requests. POST requests require a valid API key.

---

## See Also

- [JavaScript Client Guide](./javascript-client.md)
- [PHP Integration Guide](./php-integration.md)
