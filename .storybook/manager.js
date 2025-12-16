// Inject custom styles to replace logo and hide onboarding
const style = document.createElement('style');
style.textContent = `
  /* Hide "Get started" onboarding card */
  [data-item-id="get-started"],
  [data-nodetype="story"][id*="get-started"],
  [data-nodetype="story"][id*="onboarding"],
  [data-item-id*="onboarding"] {
    display: none !important;
  }

  /* Replace Storybook logo */
  [class*="sidebar-header"] svg,
  [class*="LogoLink"] svg,
  img[alt="Storybook"] {
    display: none !important;
  }

  [class*="sidebar-header"]::before,
  [class*="LogoLink"]::before {
    content: '';
    display: inline-block;
    width: 32px;
    height: 32px;
    background-image: url('/logo.jpeg');
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 8px;
  }

  /* Add Accrosignes text */
  [class*="sidebar-header"] a[title],
  [class*="LogoLink"] {
    font-size: 0;
  }

  [class*="sidebar-header"] a[title]::after,
  [class*="LogoLink"]::after {
    content: 'Accrosignes';
    font-size: 16px;
    font-weight: 700;
    color: #111827;
  }
`;

document.head.appendChild(style);

// Remove onboarding dynamically if it appears
const observer = new MutationObserver(() => {
  const getStartedItems = document.querySelectorAll('[data-item-id*="get-started"], [data-item-id*="onboarding"]');
  getStartedItems.forEach(item => item.remove());
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
}
