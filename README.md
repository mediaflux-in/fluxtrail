# FluxTrail

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![Smoke Tests](https://img.shields.io/badge/smoke--tests-passing-brightgreen.svg)]()
[![Local-First](https://img.shields.io/badge/Privacy-Local--First-blue.svg)]()
[![Graphify-Compatible](https://img.shields.io/badge/Graphify-Compatible-orange.svg)](https://github.com/safishamsi/graphify)

**FluxTrail is an open-source, local-first project memory and handoff trail for AI coding assistants.**

FluxTrail is a local-first CLI tool (command: `fluxtrail`) designed to maintain project continuity across different AI assistants (Gemini CLI, Claude Code, and Codex). It ensures that when you switch tools or reboot your PC, your AI knows exactly where you left off.

## 🚀 Why FluxTrail?

- **Solves Context Amnesia:** LLMs are stateless. FluxTrail provides a "Save Game" for your dev sessions.
- **Unified Brain:** Integrates with `graphify` to provide architectural insights (God Nodes, Communities) to your AI.
- **Local-First & Free:** 100% private. Runs on your CPU. 0 tokens for architecture mapping.
- **Indestructible:** Built to survive reboots, cache clearing, and power cuts using Git-backed persistence.

## 📦 Installation

```bash
git clone https://github.com/your-username/fluxtrail.git
cd fluxtrail
npm install
npm link
```

## 🛠 Usage

**Note:** Always run these commands inside your project's root folder.

### 1. Initialize
Set up the context capsule in your project.
```bash
fluxtrail init
```

### 2. Manual Workflow (Modular)
Safe, modular, and human-controlled.
```bash
# 1. Build the architectural map (using the graphify tool)
graphify .

# 2. Check and import the map into the capsule
fluxtrail graph status
fluxtrail graph import

# 3. Capture your progress and Git state
fluxtrail capture "Implemented the login flow" --cli "gemini"

# 4. Inject context into your AI assistant
fluxtrail continue gemini
```

### 3. Advanced Workflow (Power Sync)
Update everything (Architecture + Tasks + Instructions) in one shot.
```bash
fluxtrail sync "Completed API integration"
```

## 🧠 AI Compatibility

FluxTrail supports specialized adapters for:
- **Gemini CLI:** Updates `GEMINI.md`
- **Claude Code:** Updates `CLAUDE.md`
- **Codex / general agents:** Updates `AGENTS.md`

## 🔗 Relationship with Graphify

FluxTrail is designed to work in tandem with [Graphify](https://github.com/safishamsi/graphify):
- **Graphify** is the specialized engine that builds the 3D project map and architectural report.
- **FluxTrail** is the context manager that handles task handoffs, memory persistence, and multi-CLI synchronization.
- FluxTrail can **import** Graphify outputs to give your AI "Architectural Awareness."
- FluxTrail does **not** replace Graphify; it bridges its insights into your AI workflow.

## 🛡 Privacy & Local-First

- **100% Local:** All memory is stored in the `.capsule/` folder within your project.
- **No Data Uploads:** This tool does not upload your source code or project notes to any server.
- **Privacy Model:** While the tool helps manage context, you should always review the generated `GEMINI.md`, `CLAUDE.md`, or `AGENTS.md` files before sharing them, as they may contain project metadata.
- **0 Token Mapping:** Uses local AST parsing for code structure analysis (no LLM tokens used for core mapping).

## ❓ Troubleshooting

- **Graph not found:** Ensure `graphify` is installed (`pip install graphifyy`) and you have run it at least once.
- **Command not recognized:** Make sure you ran `npm link` correctly.
- **Context not updating:** Verify you are running commands from the project root.

## ⚖ License

Distributed under the MIT License. See `LICENSE` for more information.
