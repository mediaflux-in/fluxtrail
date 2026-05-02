# Example: Switching AI Tools

This example shows how to move from Gemini to Claude without re-explaining everything.

## Workflow

1.  **Finish in Gemini:**
    You've been working in Gemini CLI. Before leaving:
    ```bash
    capsule-context capture "Finished the CSS refactor for the hero section."
    ```

2.  **Prep for Claude:**
    Tell Capsule you want to switch to Claude.
    ```bash
    capsule-context continue claude
    ```

3.  **Start Claude:**
    Open Claude Code. Claude reads `CLAUDE.md`, sees your handoff, and immediately knows:
    *"I see you just refactored the hero section CSS. Ready to move on to the navigation bar?"*

## Supported Tools
-   **Gemini:** Updates `GEMINI.md`
-   **Claude:** Updates `CLAUDE.md`
-   **Codex:** Updates `AGENTS.md`
