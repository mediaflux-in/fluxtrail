# Simple Guide: Using FluxTrail

FluxTrail helps you switch between different AI assistants without them losing track of your work.

## Core Concepts
- **Basic Mode:** (Bookmark + Sticky Note). Remembers what you did last.
- **Full Mode:** (Bookmark + Sticky Note + Map). Gives the AI a 3D map of your project using **Graphify**.

## Getting Started

### 1. Check your system
Run this to see what is installed:
```bash
fluxtrail doctor
```

### 2. Save your progress
Before you take a break or switch AIs:
```bash
fluxtrail sync "I finished the first page design"
```

### 3. Switch AI tools
If you switch from Gemini to Claude, run:
```bash
fluxtrail continue claude
```

## Important Rules
- Always stay inside your project folder.
- Don't delete the `.capsule` folder—that's where the memory lives.
- If you don't have Node.js, ask your developer to install it or visit [nodejs.org](https://nodejs.org/).
