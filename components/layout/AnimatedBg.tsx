type Variant = 'icons' | 'waves' | 'rings' | 'grid' | 'values';

export default function AnimatedBg({ variant = 'icons' }: { variant?: Variant }) {
  if (variant === 'values') {
    // Drifting core-value icons — matches this section's own values
    const vicons = [
      { icon: 'bi-gem', cls: 'ai-1' },
      { icon: 'bi-people-fill', cls: 'ai-2' },
      { icon: 'bi-shield-check', cls: 'ai-3' },
      { icon: 'bi-heart-fill', cls: 'ai-4' },
      { icon: 'bi-hand-thumbs-up-fill', cls: 'ai-5' },
      { icon: 'bi-globe2', cls: 'ai-6' },
    ];
    return (
      <div className="anim-bg anim-icons anim-values" aria-hidden="true">
        {vicons.map((it) => (
          <i key={it.cls} className={`bi ${it.icon} anim-icon ${it.cls}`} />
        ))}
      </div>
    );
  }

  if (variant === 'waves') {
    return (
      <div className="anim-bg anim-waves" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="aw-line aw-line-1" fill="none" d="M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160" />
          <path className="aw-line aw-line-2" fill="none" d="M0,200 C240,120 480,280 720,200 C960,120 1200,280 1440,200" />
          <path className="aw-line aw-line-3" fill="none" d="M0,120 C240,40 480,200 720,120 C960,40 1200,200 1440,120" />
        </svg>
      </div>
    );
  }

  if (variant === 'rings') {
    return (
      <div className="anim-bg anim-rings" aria-hidden="true">
        <div className="ring-set ring-set-left">
          <span /><span /><span />
        </div>
        <div className="ring-set ring-set-right">
          <span /><span /><span />
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return <div className="anim-bg anim-grid" aria-hidden="true" />;
  }

  // Default: drifting maritime icons
  const icons = [
    { icon: 'bi-anchor', cls: 'ai-1' },
    { icon: 'bi-compass', cls: 'ai-2' },
    { icon: 'bi-life-preserver', cls: 'ai-3' },
    { icon: 'bi-water', cls: 'ai-4' },
    { icon: 'bi-broadcast', cls: 'ai-5' },
    { icon: 'bi-globe-americas', cls: 'ai-6' },
  ];
  return (
    <div className="anim-bg anim-icons" aria-hidden="true">
      {icons.map((it) => (
        <i key={it.cls} className={`bi ${it.icon} anim-icon ${it.cls}`} />
      ))}
    </div>
  );
}
