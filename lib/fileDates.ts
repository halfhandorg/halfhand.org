import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

interface SyncedDates {
  first: string
  last: string
}

// Docs pages are synced from the core repo, so their git history lives there.
// scripts/sync-docs.mjs records it in docs/.docs-dates.json.
let syncedDates: Record<string, SyncedDates> | null = null
function syncedDocDates(relPath: string): SyncedDates | undefined {
  if (syncedDates === null) {
    try {
      syncedDates = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'docs', '.docs-dates.json'), 'utf8')
      ) as Record<string, SyncedDates>
    } catch {
      syncedDates = {}
    }
  }
  return syncedDates[relPath]
}

/**
 * Date of the most recent commit touching a file (relative to the repo root).
 * Falls back to the filesystem mtime when git history is unavailable (e.g. a
 * shallow CI checkout) and finally to "now" if the file cannot be stat'd.
 */
export function fileLastModified(relPath: string): Date {
  const synced = syncedDocDates(relPath)
  if (synced) return new Date(synced.last)
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (out) return new Date(out)
  } catch {
    // git unavailable — fall through
  }
  try {
    return fs.statSync(path.join(process.cwd(), relPath)).mtime
  } catch {
    return new Date()
  }
}

/**
 * Date of the first commit touching a file — used as a publication date.
 * Falls back to fileLastModified when git history is unavailable.
 */
export function fileFirstModified(relPath: string): Date {
  const synced = syncedDocDates(relPath)
  if (synced) return new Date(synced.first)
  try {
    const out = execSync(`git log --reverse --format=%cI -- "${relPath}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    const first = out.split('\n')[0]
    if (first) return new Date(first)
  } catch {
    // git unavailable — fall through
  }
  return fileLastModified(relPath)
}
