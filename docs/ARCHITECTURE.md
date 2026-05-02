# Architecture: FluxTrail

This document explains the internal design and data flow of the FluxTrail system.

## Overview
FluxTrail is a "Repo-First" context management system. It ensures that AI agents (Gemini, Claude, Codex) maintain a shared "long-term memory" and "architectural brain" directly within the project they are working on.

## Core Layers

### 1. Memory Layer (The Capsule)
- **Storage:** `.capsule/state.json` and `.capsule/memory.md`.
- **Function:** Tracks project name, last used CLI, last handoff summary, and high-level project facts.
- **Persistence:** Local SSD. Survives reboots and cache clearing.

### 2. Graph Layer (The Brain)
- **Integration:** Powered by `graphify`.
- **Function:** Maps the codebase architecture using AST (Abstract Syntax Tree) parsing.
- **Storage:** `.capsule/graph-summary.md` (compacted for context efficiency).
- **Zero-Cost:** Strictly uses local CPU parsing for code mapping; no LLM tokens required for structural analysis.

### 3. Handoff Layer (Context Capture)
- **Logic:** `fluxtrail capture`.
- **Function:** Combines human-written summaries with automated Git status detection.
- **Automation:** Uses Git hooks to automatically stage context files, ensuring "Immortality" via the project's history.

### 4. AI Adapter Layer (Instruction Injection)
- **Logic:** `fluxtrail continue [target]`.
- **Function:** Injects the combined memory and architectural map into assistant-specific instruction files:
  - `GEMINI.md` (Gemini CLI)
  - `CLAUDE.md` (Claude Code)
  - `AGENTS.md` (Codex/General Agents)

## Workflows

### Safe Manual Workflow (Modular)
Designed for predictable, human-controlled updates.
1. `graphify .` -> Build the map.
2. `fluxtrail graph import` -> Bring the map into the capsule.
3. `fluxtrail capture "..."` -> Record task progress.
4. `fluxtrail continue gemini` -> Update the AI's instructions.

### Advanced Sync Workflow (Nexus Engine)
A single "Power Button" for speed.
1. `fluxtrail sync "..."` -> Automatically runs Graphify, captures Git state, and updates all instruction files in one step.

## File Structure
```text
project-root/
├── .capsule/
│   ├── state.json          # Core project state
│   ├── memory.md           # Long-term project facts
│   ├── handoff.md          # Latest task summary
│   ├── graph-summary.md    # Compact architectural map
│   └── history/            # Archived handoffs
├── graphify-out/           # Raw Graphify artifacts (optional)
├── GEMINI.md               # AI Instructions (Injected)
└── ...
```

## Privacy & Local-First
Everything in FluxTrail stays on your machine.
- No cloud dependencies.
- No database required.
- No remote sync.
- 0 tokens used for core architecture mapping.
