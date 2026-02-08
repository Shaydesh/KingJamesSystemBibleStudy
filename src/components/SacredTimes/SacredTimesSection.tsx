import React from 'react';

interface SacredTimesSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SacredTimesSection: React.FC<SacredTimesSectionProps> = ({ title, children }) => {
  return (
    <section className="testamentSection">
      <h2 className="tableOfContentsHeader">{title}</h2>
      <div style={{ padding: 'var(--space-md, 20px)' }}>
        {children}
      </div>
    </section>
  );
};
