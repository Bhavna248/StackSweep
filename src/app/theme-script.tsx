/** Runs before paint to avoid theme flash */
export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem('stacksweep-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.add(d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
