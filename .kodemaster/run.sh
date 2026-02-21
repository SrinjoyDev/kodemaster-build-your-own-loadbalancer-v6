#!/bin/sh
#
# Runs your program using Bun.
#
set -e

cd "$(dirname "$0")/.."

export FORCE_COLOR=0
export NO_COLOR=1
export BUN_NO_CLEAR_SCREEN=1

# Execute directly with Bun
# We allow arguments to be passed to the script
exec bun run src/index.ts "$@"
