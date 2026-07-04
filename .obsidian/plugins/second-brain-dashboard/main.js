const { Plugin } = require("obsidian");

module.exports = class SecondBrainDashboardPlugin extends Plugin {
  onload() {
    const update = () => this.updateDashboardTime();

    this.registerInterval(window.setInterval(update, 1000));
    this.registerEvent(this.app.workspace.on("layout-change", update));
    this.registerEvent(this.app.workspace.on("file-open", () => window.setTimeout(update, 0)));

    this.observer = new MutationObserver(update);
    this.observer.observe(document.body, { childList: true, subtree: true });
    this.register(() => this.observer.disconnect());

    window.setTimeout(update, 0);
  }

  updateDashboardTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}`;

    document.querySelectorAll(".home-dashboard .home-clock").forEach((clock) => {
      if (clock.textContent === time) return;

      const separatorOne = document.createElement("span");
      const separatorTwo = document.createElement("span");
      separatorOne.textContent = ":";
      separatorTwo.textContent = ":";

      clock.replaceChildren(
        document.createTextNode(hours),
        separatorOne,
        document.createTextNode(minutes),
        separatorTwo,
        document.createTextNode(seconds)
      );
      clock.setAttribute("aria-label", `Current time: ${time}`);
    });

    const weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const date = `${weekdays[now.getDay()]} · ${String(now.getDate()).padStart(2, "0")} ${months[now.getMonth()]} ${now.getFullYear()}`;

    document.querySelectorAll(".home-dashboard .home-date").forEach((dateElement) => {
      if (dateElement.textContent !== date) dateElement.textContent = date;
    });
  }
};
