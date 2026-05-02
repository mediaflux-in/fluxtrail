# Contributing to FluxTrail

FluxTrail is an open-source tool maintained by **MediaFlux**. We welcome contributions from the community.

## Local Development
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Link for local testing: `npm link`.
4. Run tests: `npm test`.

## Guidelines
- **Local-First:** Maintain the local-first, offline-first philosophy. No mandatory cloud sync features.
- **Git Hygiene:** Do not commit:
  - `node_modules/`
  - `.capsule/`
  - `graphify-out/`
  - `test-env/`
  - `docs/maestro/`
  - `.env`
- **Simplicity:** Keep the CLI interface predictable and lightweight.
- **Independence:** FluxTrail pairs with Graphify but should remain functional in Basic mode without it.

## Community & Support
If you have a feature proposal, please open an Issue to discuss it first.
