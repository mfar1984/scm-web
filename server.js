#!/usr/bin/env node

/**
 * SCM Website — Production Server (cPanel Compatible)
 * 
 * This server runs the Next.js standalone build optimized for cPanel hosting.
 * 
 * Usage:
 *   node server.js
 * 
 * Environment Variables:
 *   PORT              - Server port (default: 3000)
 *   HOSTNAME          - Bind address (default: 0.0.0.0)
 *   NODE_ENV          - Environment (production)
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

// Configuration
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

// Initialize Next.js app
const app = next({ 
  dev,
  hostname,
  port,
  dir: __dirname
});

const handle = app.getRequestHandler();

// Startup banner
console.log('');
console.log('  ╔══════════════════════════════════════════════╗');
console.log('  ║     SCM CLASSIFICATION WEBSITE — Server      ║');
console.log('  ╠══════════════════════════════════════════════╣');
console.log(`  ║   Environment : ${process.env.NODE_ENV || 'production'}`.padEnd(50) + '║');
console.log(`  ║   Hostname    : ${hostname}`.padEnd(50) + '║');
console.log(`  ║   Port        : ${port}`.padEnd(50) + '║');
console.log('  ╚══════════════════════════════════════════════╝');
console.log('');

// Prepare and start server
app.prepare()
  .then(() => {
    createServer((req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling request:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    })
    .listen(port, hostname, (err) => {
      if (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
      }
      console.log(`✅ Server ready on http://${hostname}:${port}`);
      console.log('');
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use`);
        console.error('   Try a different port or stop the other process');
      } else {
        console.error('❌ Server error:', err);
      }
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to prepare Next.js:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});
