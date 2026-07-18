$ErrorActionPreference = 'Stop'

irm https://github.com/halfhandorg/halfhand/releases/latest/download/halfhand-installer.ps1 | iex

Write-Output "Run: hh --help"
