# FluxTrail

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![Smoke Tests](https://img.shields.io/badge/smoke--tests-passing-brightgreen.svg)]()
[![Local-First](https://img.shields.io/badge/Privacy-Local--First-blue.svg)]()
[![Graphify-Compatible](https://img.shields.io/badge/Graphify-Compatible-orange.svg)](https://github.com/safishamsi/graphify)

**FluxTrail is an open-source, local-first project memory and handoff trail for AI coding assistants.**

It ensures that when you switch tools (e.g., from Gemini to Claude) or reboot your PC, your AI knows exactly where you left off.

## 🚀 What FluxTrail Solves

LLMs are stateless. When a session ends, the context is lost. FluxTrail acts as a "Black Box Recorder" for your development session, storing task progress, Git state, and architectural maps directly in your project folder.

## 📋 System Requirements

- **Node.js:** >= 18.0.0
- **Git:** Installed and initialized in your project.
- **Python (Optional):** Required for the Graphify-powered project map mode.

## 📦 Installation

```bash
npm install -g @mediaflux-in/fluxtrail
```

## 🛠 Quick Start

1. **Initialize your project:**
   ```bash
   fluxtrail init
   ```

2. **Run a diagnosis:**
   ```bash
   fluxtrail doctor
   ```

3. **Capture progress:**
   ```bash
   fluxtrail capture "Finished the user login logic"
   ```

4. **Switch AI tools:**
   ```bash
   fluxtrail continue claude
   ```

## 🧠 Basic Mode vs. Graphify-Powered Mode

FluxTrail works in two modes:

### Basic Mode (Standalone)
Manages task handoffs, project memory, and Git changed files. No additional setup required.

### Full Mode (Graphify-Powered)
Includes a compact project-map summary in your context. This gives the AI an "Architectural Brain" of your codebase structure.

To enable Full Mode:
1. Install Graphify: `pip install graphifyy`
2. Run setup: `fluxtrail setup full`
3. Map your project: `fluxtrail graph build`
4. Sync everything: `fluxtrail sync`

## 🔗 Relationship with Graphify

FluxTrail is developed and maintained by **MediaFlux** and is designed to pair with [Graphify](https://github.com/safishamsi/graphify) (an independent project by safishamsi).

- **Graphify** builds the structural project map.
- **FluxTrail** manages the handoff trail and AI CLI synchronization.
- Together, they provide a unified Brain + Memory for your AI assistant.

## 🧠 AI Assistant Support

FluxTrail automatically updates context for:
- **Gemini CLI:** (`GEMINI.md`)
- **Claude Code:** (`CLAUDE.md`)
- **Codex / general agents:** (`AGENTS.md`)

## 🛡 Privacy & Local-First

- **100% Local:** Data is stored in your project's `.capsule/` folder.
- **No Telemetry:** We do not collect data on your code or usage.
- **Offline First:** No cloud sync or databases required.

## ⚖ License

Distributed under the MIT License. See `LICENSE` for more information.
