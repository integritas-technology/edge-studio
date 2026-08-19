# Session

Scratch log for the session in progress. Update it as you go; reset it when a session's work is done and merged. Not a changelog — see `CHANGELOG.md` for user-facing history.

## Progress

Branch `fix/install-script-manifest`.

- Diagnosed a real Pi `install.sh` failure: manifest fetch/verify succeeded, but `docker pull` failed `unauthorized` on all 3 `ghcr.io/edge-studio-technology/*` images (frontend/backend/update-agent).
- Root cause: GHCR auto-creates container packages as private on first push (`docker/build-push-action` + `GITHUB_TOKEN`), independent of the parent repo's public visibility — missed after the `integritas-technology` -> `edge-studio-technology` org migration recreated the packages. Contradicted the "already public on GHCR" premise in `docs/adr/0008-manifest-served-from-github-raw.md`.
- Confirmed via `ghcr.io` token-endpoint probes (target packages returned `UNAUTHORIZED` at `/token` itself, vs. a known-public control package which issued a token fine) and `gh api` 403s showing the local token lacked `read:packages`.
- User fixed manually (no code change): org owner relaxed an org-level "Package creation" visibility restriction, then flipped each of the 3 packages to public individually. Confirmed the install now works.
- Added a correction note to `docs/adr/0008-manifest-served-from-github-raw.md` (Consequences) recording the false premise and the fix; no new ADR since it corrects an existing decision's premise rather than deciding something new.

## Next Steps

- [Nothing queued yet.]

## Notes / Open Questions

- Visibility is per-package, not per-push — future pushes to these same 3 package names stay public with no CI change needed. A future 4th image (new package name) would default private again and need the same one-time manual flip.
