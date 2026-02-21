#!/bin/sh
#
# Bun runs TypeScript directly - no compilation needed for runtime.
# But we can run 'tsc --noEmit' to check for type errors if needed.
# For now, we assume simple interface check.
#
set -e
echo "✓ Ready (Bun runs TypeScript directly)"
exit 0
