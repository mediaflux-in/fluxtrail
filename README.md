# Capsule Context CLI

**Persistent context for your projects. One brain, one memory, zero amnesia.**

Capsule Context is a local-first CLI tool designed to maintain project continuity across different AI assistants (Gemini CLI, Claude Code, and Codex). It ensures that when you switch tools or reboot your PC, your AI knows exactly where you left off.

## 🚀 Why Capsule Context?

- **Solves Context Amnesia:** LLMs are stateless. Capsule provides a "Save Game" for your dev sessions.
- **Unified Brain:** Integrates with `graphify` to provide architectural insights (God Nodes, Communities) to your AI.
- **Local-First & Free:** 100% private. Runs on your CPU. 0 tokens for architecture mapping.
- **Indestructible:** Built to survive reboots, cache clearing, and power cuts using Git-backed persistence.

## 📦 Installation

```bash
git clone https://github.com/your-username/capsule-context-cli.git
cd capsule-context-cli
npm install
npm link
```

## 🛠 Usage

**Note:** Always run these commands inside your project's root folder.

### 1. Initialize
Set up the context capsule in your project.
```bash
capsule-context init
```

### 2. Manual Workflow (Recommended)
Safe, modular, and human-controlled.
```bash
# 1. Build the architectural map (via graphify)
graphify .

# 2. Check and import the map into the capsule
capsule-context graph status
capsule-context graph import

# 3. Capture your progress and Git state
capsule-context capture "Implemented the login flow" --cli "gemini"

# 4. Inject context into your AI assistant
capsule-context continue gemini
```

### 3. Advanced Workflow (Power Sync)
Update everything (Architecture + Tasks + Instructions) in one shot.
```bash
capsule-context sync "Completed API integration"
```

## 🧠 AI Compatibility

Capsule Context supports specialized adapters for:
- **Gemini CLI:** Updates `GEMINI.md`
- **Claude Code:** Updates `CLAUDE.md`
- **Codex / general agents:** Updates `AGENTS.md`

## 🛡 Privacy & Performance

- **100% Local:** No cloud sync, no databases, no SaaS login.
- **0 Token Mapping:** Uses local AST parsing for code structure analysis.
- **Git-Shield:** Automatically stages context files in Git to protect them from "Clear Cache" scripts.

## ❓ Troubleshooting

- **Graph not found:** Ensure `graphify` is installed (`pip install graphifyy`) and you have run it at least once.
- **Command not recognized:** Make sure you ran `npm link` correctly.
- **Context not updating:** Verify you are running commands from the project root.

## ⚖ License

Distributed under the MIT License. See `LICENSE` for more information.
