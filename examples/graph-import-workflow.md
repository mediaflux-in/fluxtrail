# Example: Graph Import Workflow

This example shows how to give your AI a "Brain Transplant" by importing your project's architecture.

## Workflow

1.  **Generate the Graph:**
    Use `graphify` to map out your project.
    ```bash
    graphify .
    ```

2.  **Verify the Files:**
    Make sure the report was generated.
    ```bash
    capsule-context graph status
    ```

3.  **Import to Capsule:**
    Bring the map into your persistent memory.
    ```bash
    capsule-context graph import
    ```

4.  **Sync and Continue:**
    Ensure the AI instructions are updated.
    ```bash
    capsule-context sync "Added new payment module and updated architecture map."
    capsule-context continue gemini
    ```

## Benefit
The next time the AI assists you, it will know that the "God Node" for payments is `src/finance/processor.py` and won't waste time searching your entire directory.
