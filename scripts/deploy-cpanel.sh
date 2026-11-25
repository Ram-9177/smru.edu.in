#!/usr/bin/env bash
# Publishes out/ to the folder Apache serves. CI runs it (the deploy job in seo-hardening-ci.yml).
#
#   DEPLOY_TARGET  user@host:/home/user/public_html, or a local folder in the tests
#   DEPLOY_MODE    dry-run (default: list the changes, send nothing) or live
#   RSYNC_RSH      the ssh command rsync uses, set by CI
#
# Order matters: _next/ first so no page is ever ahead of its scripts, .htaccess last. Nothing on the server is
# deleted, because open tabs still load the previous build's _next/ files (PROJECT.md, section 10).
set -euo pipefail

fail() { echo "deploy: $*" >&2; exit 1; }

mode="${DEPLOY_MODE:-dry-run}"
target="${DEPLOY_TARGET:-}"

case "$mode" in dry-run | live) ;; *) fail "DEPLOY_MODE must be dry-run or live, not '$mode'" ;; esac
[ -n "$target" ] || fail "DEPLOY_TARGET is not set"
for needed in index.html .htaccess _next; do
  [ -e "out/$needed" ] || fail "out/$needed is missing; run npm run build first"
done
target="${target%/}"

# The live site has a home page. A typo in the path, or the account's home folder, does not.
listing="$(rsync "$target/" 2>/dev/null)" || fail "$target does not look like the live site: it cannot be listed"
grep -qE ' index\.html$' <<<"$listing" || fail "$target does not look like the live site: it has no index.html"

find out -type d -exec chmod 755 {} +
find out -type f -exec chmod 644 {} +

# -c compares contents: every CI checkout has new dates, so dates would resend all 940 MB. No -p: it would also
# set the permissions of the site folder itself, which cPanel manages.
options=(-rlci --exclude=.DS_Store)
[ "$mode" = live ] || options+=(-n)

sent=0
send() {
  local label="$1" changes count
  shift
  changes="$(rsync "${options[@]}" "$@")"
  count="$(grep -cE '^[<>]f' <<<"$changes" || true)"
  sent=$((sent + count))
  echo "deploy: $label: $count files to send"
  grep -E '^[<>]f' <<<"$changes" || true
}

send "_next/" out/_next "$target/"
send "pages and assets" --exclude=/_next --exclude=/.htaccess out/ "$target/"
send ".htaccess" out/.htaccess "$target/"

if [ "$mode" = live ]; then
  echo "deploy: done, $sent files to send, all sent"
else
  echo "deploy: dry run, $sent files to send, nothing was sent"
fi
