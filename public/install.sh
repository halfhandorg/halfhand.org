#!/bin/sh
# Thin wrapper around the cargo-dist generated installer for halfhand.
set -eu

if ! command -v curl >/dev/null 2>&1; then
    echo "error: curl is required to install halfhand" >&2
    echo "see https://halfhand.org/#install for other installation options" >&2
    exit 1
fi

curl --proto '=https' --tlsv1.2 -LsSf \
    https://github.com/halfhandorg/halfhand/releases/latest/download/halfhand-installer.sh | sh

echo "Run: hh --help"
