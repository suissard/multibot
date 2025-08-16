from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the home page
        page.goto("http://localhost:8080/", timeout=60000)

        # Take a screenshot to see what the page looks like
        page.screenshot(path="jules-scratch/verification/debug_page_load.png")
        print("Took debug screenshot.")

        # Trigger an info notification
        info_button = page.get_by_role("button", name="Trigger Info")
        expect(info_button).to_be_visible()
        info_button.click()

        # Wait for the notification to appear
        notification = page.locator(".notification.bg-blue-500")
        expect(notification).to_be_visible()
        expect(notification).to_contain_text("Info")

        # Click the bell icon to open the history panel
        bell_button = page.get_by_role("button", name="View notifications")
        expect(bell_button).to_be_visible()
        bell_button.click()

        # Wait for the history panel to appear
        history_panel = page.locator(".notification-history-panel")
        expect(history_panel).to_be_visible()
        expect(history_panel).to_contain_text("Notification History")

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

        print("Verification script completed successfully.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        # Take a screenshot on error for debugging
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
