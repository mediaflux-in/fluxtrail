# Design Document: Capsule Context CLI

## 1. Overview
`capsule-context-cli` is a cross-CLI coordination tool designed to solve the "Memory Gap" when switching between different AI CLI assistants (e.g., Gemini CLI, Claude Code, AITK) due to usage limits. It maintains a project-level "Source of Truth" that ensures any new CLI session can be immediately productive without repeating prior research or work.

## 2. Core Components

### 2.1 Central Storage (`.capsule/`)
- **`memory.md`**: A compressed, structural representation of the codebase, architectural decisions, and permanent project facts.
- **`state.json`**: Tracking current task, last modified files, and completion percentages.
- **`handoff.md`**: A high-signal summary of the *very last* session, intended to be the first thing the *next* CLI reads.
- **`history/`**: Archive of past handoffs for auditability.

### 2.2 Functional modules
- **Watcher (`lib/watcher.js`)**: Uses `chokidar` to monitor file changes in real-time. If a file is modified, it updates the `state.json` "Recently Touched" list.
- **Onboarder (`lib/onboarder.js`)**: Generates a "Catch Up" prompt that the user can paste into a new CLI to get it up to speed in one turn.
- **Reporter (`lib/reporter.js`)**: Collects changes and formats them into the `memory.md` and `handoff.md`.

## 3. Command Interface (`commander`)

| Command | Action |
| --- | --- |
| `capsule init` | Initializes the `.capsule` directory and base memory. |
| `capsule status` | Shows current project state and which CLI worked last. |
| `capsule capture "Summary of work"` | Manually records a handoff from the current CLI. |
| `capsule onboard` | Outputs the "Catch Up" prompt for the next CLI. |
| `capsule watch` | Starts a background process to track changes automatically. |

## 4. Technical Stack
- **Runtime**: Node.js (ESM)
- **CLI Framework**: `commander`
- **Styling**: `chalk`
- **File System**: `fs-extra`
- **Process management**: `execa`
- **File Watching**: `chokidar`

## 5. Workflow Example
1. User starts with Gemini CLI.
2. Gemini hits a rate limit.
3. User runs `capsule capture "Implemented the auth routes and fixed the login bug."`
4. User starts Claude Code.
5. User runs `capsule onboard` and pastes the output into Claude.
6. Claude is now fully context-aware and continues where Gemini left off.
