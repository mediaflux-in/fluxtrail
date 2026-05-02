# Simple Guide: Using FluxTrail

This guide is for everyone—you don't need to be a coder to use FluxTrail.

## What is this?
Think of FluxTrail as a **"Memory Card"** for your AI. When you stop talking to the AI and come back later, the AI normally forgets what you were doing. This tool saves your work so the AI remembers.

## How to use it (3 Easy Steps)

### Step 1: Tell the AI you are starting
When you start working on a project, open your terminal in that folder and type:
```bash
fluxtrail status
```
This checks if the memory is already there.

### Step 2: Save your progress
Before you turn off your computer or switch to a different AI tool, save your "game" by typing:
```bash
fluxtrail sync "I finished the first page design"
```
*(Replace the text in quotes with what you actually did.)*

### Step 3: Switch tools
If you want to use a different AI tool (like switching from Gemini to Claude), run:
```bash
fluxtrail continue claude
```
Then, when you open Claude, it will instantly see your notes and be ready to help.

## Common Rules
1.  **Stay in the folder:** Always run these commands inside your project folder.
2.  **Save often:** If the power goes out, the AI can only remember what you last "Synced."
3.  **Don't delete the .capsule folder:** This is where the AI's memory lives. If you delete it, the AI will have amnesia!

## If you see an error
-   **"Command not found":** You might need to install the tool again. Ask your developer to run `npm link`.
-   **"Graph not found":** This is okay! It just means the AI doesn't have a 3D map of your files yet. It will still remember your task notes.
