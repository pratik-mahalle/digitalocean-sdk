# Developer experience report: DigitalOcean SDK with Voxgig sdkgen

**Author:** Pratik Mahalle · **Date:** 2026-10-08 · **Repo:** https://github.com/pratik-mahalle/digitalocean-sdk (MIT)

## Summary

I generated TypeScript and Python SDKs for the DigitalOcean public API from its official OpenAPI spec, using
`@voxgig/create-sdkgen` 0.30.6 and `@voxgig/sdkgen` 4.34.1. DigitalOcean is not in the voxgig-sdk catalogue.
The work was AI-assisted (Claude Code). Wall-clock time from the first command to a pushed repo with a passing
live test was about 15 minutes. My own hands-on time was about 5 minutes: choosing the API and targets, and
supplying a token.

The generator handled a very large spec (3.6 MB, 515 paths) in about 16 seconds and produced SDKs that work
against the live API. Getting there took four workarounds, and the default entity model for an API this size
needs shaping before the SDK is ready for customers.

## Results

| Check | TypeScript | Python |
| --- | --- | --- |
| Build | pass | pass (`pip install -e .`) |
| Offline test suite | 1891 pass / 13 fail / 228 skip | 1174 pass / 10 fail / 307 skip |
| Live, read-only (`Account.load`, `Region.list`, `Size.list`, `Droplet.list`, `SshKey.list`) | all pass | all pass |

Run the live smoke test with `DIGITALOCEAN_TOKEN=... node examples/live-smoke.js`.

## Issues, in the order I hit them

1. **The scaffold fails out of the box.** `create-sdkgen` writes `@voxgig/apidef: ~8.22.1` into `.sdk/package.json`,
   but `@voxgig/sdkgen@4.34.1` has a peer dependency of `apidef >=8.23.0`. As a result, `npm install` fails with
   `ERESOLVE` and the scaffold aborts.
   *Workaround:* re-run with `--no-install`, bump the pin to `~8.24.0`, then `npm install`, `add-target` and `add-feature`.
2. **Node 24 is required but not documented.** The `@tabnas/*` packages declare `node >=24`, and Node 22 emits
   `EBADENGINE` warnings. The requirements page doesn't mention a Node version.
3. **The YAML parser rejects a valid spec.** apidef (`@tabnas/jsonic`) throws `unexpected character(s): -` on a
   `|+` (keep-chomping) block scalar with an empty body at line 88017 of DigitalOcean's spec. PyYAML parses the file fine.
   *Workaround:* convert the spec to JSON.
4. **The copyright holder and repo org default to Voxgig.** The root `LICENSE` says "Copyright (c) Voxgig", and
   every URL points at `github.com/voxgig-sdk/...`. The overrides are `main.kit.publisher` and `main.kit.repo.path`
   in `model/project.aontu`. I found them only by reading `dist/cmp/License.js` and `dist/helpers/packageMeta.js`.
   They deserve a line in the create-sdkgen docs, or a `--publisher` / `--repo` flag, because anyone building an
   SDK under their own name hits this.
5. **The spec's example values become secrets.** The spec contains placeholder Slack webhook URLs
   (`hooks.slack.com/services/T000/B000/XXXXXXXX`). The generator copies these into test fixtures, and GitHub push
   protection rejected the push. *Workaround:* replace the placeholders in the spec before generating. A built-in
   sanitising pass for known secret patterns would avoid this.
6. **List operations silently return only the first page.** `Size.list()` returns 20 sizes, but the API reports
   `meta.total = 43`. Paging is off by default, so `list()` drops records without any indication. For a list
   operation I'd expect the default to fetch every page, or at least to warn.
7. **Entity modelling at scale.** apidef reported `PARTIAL BUILD! 38 warnings`, and the resulting model has 227 entities:
   - Naive singularisation produced `kubernete` (from `kubernetes`), and one entity is named `empty`.
   - 96 `api_*_output` response schemas from the GenAI endpoints became entities.
   - Sub-resources merged into their parent. For example, `Droplet.list` covers `/droplets/{id}/backups`,
     `/kernels` and `/neighbors`.
   - Endpoints collide on the same selector in 16 entities (`same selector` warnings).
   - In both languages, the basic-flow test fails for the same 9 entities: `add_on`, `api_simulation_journey`,
     `dedicated_inference_accelerator`, `floating_ip_action`, `logsink`, `monitoring`, `reserved_ip_action`,
     `security` and `vpc_routes`. Only `security` is also a colliding entity. That TS and Python fail identically
     points to the model rather than to the code templates. I didn't investigate the root cause within the time-box.
   - The README tutorial demonstrates the alphabetically first entity (`AccessPoint`) instead of a core one like `Droplet`.
8. **The generated CI fails on the first push.**
   - The `ci` workflow fails because of the test failures above.
   - The `Documentation` workflow fails a Vale prose lint (`Google.Spacing`) on text copied from the upstream spec.
9. **Smaller inconsistencies:**
   - The scaffold's own `.sdk/.gitignore` ignores `log/`, then the generator warns that `log/copies.jsonl` must be committed.
   - The README uses `DIGITALOCEAN_APIKEY` but the test harness reads `DIGITALOCEAN_TOKEN`.
   - The `droplet.create` README example fails its own check ("the entity does not hold the record the definition
     example returns"). The endpoint's response is a `oneOf` (`{droplet}` or `{droplets}`), which is the likely cause.

## What worked well

- **Clear error messages.** For example, the `--no-install` error says what to do next, and generation warnings
  name the colliding endpoints.
- **Speed.** A full regeneration of 227 entities in two languages takes about 16 seconds.
- **Clean live behaviour.** Bearer auth worked first time, responses were unwrapped correctly
  (`Account.load().data()` returns the account, not `{account: ...}`), and errors read clearly
  (`DigitaloceanSDK: load: request: 401: Unauthorized`).
- **Good project hygiene.** The `AGENTS.md` files, the documented "silent failure modes", `NOTICE` and `SECURITY.md`
  are thoughtful. They made AI-assisted work noticeably easier.
- **Overridable templates.** Vendored templates in `.sdk/tm/` and a `project.aontu` that is never overwritten give
  a clear place for customisation.

## Suggested next steps for a production-quality SDK

1. Trim the spec to the core resource families: droplets, volumes, domains, firewalls, kubernetes, databases, apps.
2. Fix entity names and split the sub-resources in `model/entity/*.aontu`.
3. Enable `paging` and `retry` by default.
4. Regenerate until the offline suite and CI pass.
