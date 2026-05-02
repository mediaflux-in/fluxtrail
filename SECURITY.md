# Security Policy

FluxTrail is designed with a **Local-First Privacy** model.

## Data Handling
- **Local Storage:** All context, memory, and handoff trails are stored locally in the `.capsule/` directory of your project.
- **No Telemetry:** FluxTrail does not collect or transmit usage data, source code, or personal information.
- **Shared Instructions:** AI context files (`GEMINI.md`, `CLAUDE.md`, `AGENTS.md`) are generated locally.

## Important Safeguards
- **Review before sharing:** Always review your project's AI context files before sharing the repository publicly, as they may contain project metadata or path names.
- **Never post secrets:** Do not paste raw API keys, passwords, or secrets into GitHub issues or public forums.

## Reporting a Vulnerability
If you discover a security vulnerability, please do not open a public issue. Contact the maintainers privately.
