export const themeScript = () => {
  const theme = JSON.parse(window.localStorage.getItem("theme") ?? "");
  document.body.setAttribute("data-theme", theme);
};
