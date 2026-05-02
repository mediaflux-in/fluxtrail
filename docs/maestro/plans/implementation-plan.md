# Implementation Plan: Capsule Context CLI

## Phase 1: Foundation & Project Setup
- **Agent**: `coder`
- **Files**: `src/index.js`, `src/lib/utils.js`
- **Task**: Set up the main entry point using `commander`, define the CLI version, and implement basic `chalk` logging utilities.

## Phase 2: Core Command: `init`
- **Agent**: `coder`
- **Files**: `src/commands/init.js`, `src/lib/storage.js`
- **Task**: Create the `.capsule` directory structure and initial markdown templates. Ensure `init` is idempotent.

## Phase 3: State & Capture Logic
- **Agent**: `coder`
- **Files**: `src/commands/capture.js`, `src/lib/storage.js`
- **Task**: Implement the `capture` command to record session summaries and update `state.json`. Add logic to archive old handoffs.

## Phase 4: Automated Progress Tracking
- **Agent**: `coder`
- **Files**: `src/commands/watch.js`, `src/lib/watcher.js`
- **Task**: Implement the `watch` command using `chokidar`. It should update the "Recently Changed" section of the state when files are saved.

## Phase 5: Onboarding & Context Injection
- **Agent**: `coder`
- **Files**: `src/commands/onboard.js`, `src/lib/onboarder.js`
- **Task**: Implement the `onboard` command. It must read the `memory.md`, `state.json`, and the last `handoff.md` to produce a copy-pasteable prompt for the next CLI.

## Phase 6: Validation & Integration
- **Agent**: `tester`
- **Files**: `tests/`
- **Task**: Create a test suite to verify end-to-end handoff. Ensure that context captured by one "session" is correctly reproduced in the onboarding prompt.
