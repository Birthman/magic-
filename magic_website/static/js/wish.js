document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wish-form");
  const input = document.getElementById("wish-input");
  const responseBox = document.getElementById("wish-response");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const wish = input.value.trim();
    if (!wish) return;

    responseBox.innerText = "Sending your wish...";

    try {
      const res = await fetch("/api/wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wish })
      });

      const data = await res.json();
      if (res.ok) {
        responseBox.innerText = data.message;
        input.value = "";
      } else {
        responseBox.innerText = `Error: ${data.message}`;
      }
    } catch (err) {
      responseBox.innerText = "Network error. Try again!";
    }
  });
});
