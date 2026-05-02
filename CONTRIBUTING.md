# Contributing to FluxTrail

Thank you for your interest in contributing to FluxTrail! We welcome contributions that help make AI-assisted development more continuous and contextual.

## 🛠 Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/fluxtrail.git
    cd fluxtrail
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Link for local testing:**
    ```bash
    npm link
    ```

## 🧪 Testing

Before submitting a pull request, please ensure all tests pass:
```bash
npm test
```

## 🛡 Guidelines

-   **Privacy First:** Keep the tool local-first. Do not add features that require mandatory cloud sync or data uploads.
-   **No Bloat:** Keep the CLI simple and predictable.
-   **Git Hygiene:** Do not commit internal tool directories:
    -   `node_modules/`
    -   `.capsule/`
    -   `graphify-out/`
    -   `test-env/`
-   **Compatibility:** Ensure changes don't break support for Gemini, Claude, or Codex adapters.

## 💡 Proposing Features

If you have an idea for a new feature, please open an Issue first to discuss the architectural impact and ensure it aligns with the "local-first memory" philosophy.
