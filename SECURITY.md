# Security Policy

## Reporting a Vulnerability

We take the security of your project context and AI workflows seriously. If you discover a security vulnerability within FluxTrail, please do not open a public issue. Instead, report it privately to the maintainer.

## Guidelines for Users

### 1. Local-First Privacy
FluxTrail is designed to operate 100% locally. It stores memory in the `.capsule/` folder within your project. We recommend:
-   **Review your context files:** Always check the generated `GEMINI.md`, `CLAUDE.md`, and `AGENTS.md` before sharing your project repository or committing these files if they contain sensitive path names or proprietary logic.
-   **Protect your secrets:** Never store raw API keys or passwords in your project's `memory.md`.

### 2. Handling Project Metadata
The architectural mapping (via `graphify`) extracts structure from your source code. While this is performed locally, the resulting `graph.json` contains a map of your project's functions and relationships. Treat this file with the same level of security as your source code.

### 3. Public Commits
By default, FluxTrail implements a **Git-Shield** feature to stage context files. If you are working on a public repository and wish to keep your AI context private, ensure you exclude the `.capsule/` directory from your public pushes.
