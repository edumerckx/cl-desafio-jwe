#!/bin/sh

npx drizzle-kit migrate
node dist/src/server.js