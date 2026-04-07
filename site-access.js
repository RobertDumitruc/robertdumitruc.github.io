(function () {
  const config = window.SITE_ACCESS;
  if (!config) {
    return;
  }

  const currentPath = window.location.pathname;
  const maintenancePath = "/maintenance.html";
  const isMaintenancePage = currentPath.endsWith(maintenancePath) || currentPath === maintenancePath;
  const isUnlocked = window.localStorage.getItem(config.storageKey) === "granted";

  if (config.maintenanceMode && !isMaintenancePage && !isUnlocked) {
    const target = `${maintenancePath}?return=${encodeURIComponent(window.location.pathname + window.location.search + window.location.hash)}`;
    window.location.replace(target);
    return;
  }

  if (!config.maintenanceMode && isMaintenancePage) {
    window.location.replace("/");
    return;
  }

  if (config.maintenanceMode && !isMaintenancePage && isUnlocked) {
    const banner = document.createElement("div");
    banner.className = "maintenance-banner";
    banner.textContent = "Maintenance mode is active. Visitors are being redirected to the maintenance page.";
    document.addEventListener("DOMContentLoaded", function () {
      document.body.prepend(banner);
    });
  }
})();
