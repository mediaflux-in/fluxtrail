# Example: Basic Task Handoff

This example shows how to record a simple task update so the next AI knows what to do.

## Workflow

1.  **Work on your task:**
    You spent 2 hours fixing a bug in the login validation.

2.  **Capture the progress:**
    ```bash
    capsule-context capture "Fixed the email validation bug. Added unit tests for invalid domains."
    ```

3.  **The Result:**
    Capsule updates `.capsule/handoff.md` and detects that you modified `src/auth.js` and `tests/auth.test.js`.

4.  **Next AI Onboarding:**
    When you start a new session, the AI reads the capsule and says:
    *"I see you recently fixed the email validation bug and added tests. Should we move on to the password reset flow next?"*
