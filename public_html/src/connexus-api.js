/**
 * Connexus Public API Client
 * https://connexus.team
 *
 * A lightweight library for integrating Connexus data into any website
 * using a template-based DOM replacement pattern.
 *
 * @version 1.0.0
 * @license MIT
 */

(function(global) {
  'use strict';

  const ConnexusAPI = {
    version: '1.0.0',
    config: {
      apiKey: null,
      baseUrl: 'https://api.connexus.team/v1',
      debug: false
    },

    /**
     * Initialize the Connexus API client
     * @param {Object} options - Configuration options
     */
    init: function(options) {
      if (!options.apiKey) {
        console.warn('ConnexusAPI: No API key provided');
      }

      this.config.apiKey = options.apiKey || null;
      this.config.baseUrl = options.baseUrl || this.config.baseUrl;
      this.config.debug = options.debug || false;

      // Initialize each data type if configured
      if (options.events) {
        this._initDataType('events', options.events);
      }
      if (options.members) {
        this._initDataType('members', options.members);
      }
      if (options.businesses) {
        this._initDataType('businesses', options.businesses);
      }

      this._log('ConnexusAPI initialized', this.config);
    },

    /**
     * Initialize a specific data type (events, members, businesses)
     * @private
     */
    _initDataType: function(type, config) {
      const container = document.querySelector(config.container);
      if (!container) {
        this._log('Container not found: ' + config.container, null, 'warn');
        return;
      }

      const template = container.querySelector(config.template);
      if (!template) {
        this._log('Template not found: ' + config.template, null, 'warn');
        return;
      }

      // Store the template for cloning
      const templateClone = template.cloneNode(true);

      // Fetch and render data
      this._fetchData(type, config.limit || 10)
        .then(data => {
          this._renderData(container, templateClone, data, config.mapping);
        })
        .catch(err => {
          this._log('Failed to fetch ' + type, err, 'error');
        });
    },

    /**
     * Fetch data from the API
     * @private
     */
    _fetchData: function(type, limit) {
      const url = `${this.config.baseUrl}/${type}?limit=${limit}`;

      return fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(json => json.data || []);
    },

    /**
     * Render data into the DOM using the template
     * @private
     */
    _renderData: function(container, template, data, mapping) {
      // Clear existing content
      container.innerHTML = '';

      // Create and append items for each data record
      data.forEach(item => {
        const element = template.cloneNode(true);

        // Apply field mappings
        Object.keys(mapping).forEach(selector => {
          const target = element.querySelector(selector);
          if (!target) return;

          const fieldConfig = mapping[selector];

          if (typeof fieldConfig === 'string') {
            // Simple text content mapping
            target.textContent = item[fieldConfig] || '';
          } else if (typeof fieldConfig === 'object') {
            // Attribute mapping (e.g., src, href)
            const value = item[fieldConfig.field] || '';
            target.setAttribute(fieldConfig.attr, value);
          }
        });

        container.appendChild(element);
      });

      this._log(`Rendered ${data.length} items`);
    },

    /**
     * Manual data refresh
     * @param {string} type - Data type to refresh (events, members, businesses)
     */
    refresh: function(type) {
      this._log('Refresh requested for: ' + type);
      // TODO: Implement refresh logic
    },

    /**
     * Debug logging
     * @private
     */
    _log: function(message, data, level) {
      if (!this.config.debug && level !== 'error' && level !== 'warn') {
        return;
      }

      const prefix = '[ConnexusAPI]';
      const logFn = console[level] || console.log;

      if (data) {
        logFn(prefix, message, data);
      } else {
        logFn(prefix, message);
      }
    }
  };

  // Export to global scope
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConnexusAPI;
  } else {
    global.ConnexusAPI = ConnexusAPI;
  }

})(typeof window !== 'undefined' ? window : this);
