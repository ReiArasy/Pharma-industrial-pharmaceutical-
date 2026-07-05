export default function CertificationStrip() {
  const certifications = [
    { name: 'cGMP', fullName: 'Current Good Manufacturing Practice', iconText: 'cGMP' },
    { name: 'GMP Annex 1', fullName: 'Sterile Manufacture Compliance', iconText: 'GMP' },
    { name: 'ISO 9001', fullName: 'Quality Management Systems', iconText: 'ISO 9001' },
    { name: 'ISO 14644', fullName: 'Cleanrooms & Associated Environments', iconText: 'ISO 14644' },
    { name: 'FDA Ready', fullName: 'Food & Drug Administration Compliance', iconText: 'FDA' },
  ];

  return (
    <section className="bg-bg py-12 px-6 md:px-12 border-b border-border">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Logos container */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="group flex flex-col items-center justify-center p-4 border border-border bg-bg-alt rounded-[2px] w-36 h-20 transition-all duration-300 hover:border-accent hover:bg-bg"
            >
              <span className="font-space font-extrabold text-sm tracking-[0.15em] text-text-muted group-hover:text-accent transition-colors duration-300">
                {cert.iconText}
              </span>
              <span className="text-[9px] font-mono text-text-muted/60 group-hover:text-text transition-colors duration-300 mt-1 uppercase tracking-wider text-center">
                {cert.name}
              </span>
            </div>
          ))}
        </div>

        {/* Caption */}
        <p className="font-sans text-xs md:text-sm text-text-muted text-center max-w-2xl mx-auto leading-relaxed">
          Our entire manufacturing pipeline is audited periodically to ensure absolute compliance with <strong>cGMP</strong>, <strong>FDA guidelines</strong>, and <strong>ISO 9001</strong> standards, guaranteeing sterile integrity, material reliability, and enduring operational lifespans.
        </p>

      </div>
    </section>
  );
}
