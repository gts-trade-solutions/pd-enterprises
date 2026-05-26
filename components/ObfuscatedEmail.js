'use client';

export default function ObfuscatedEmail({
  user,
  domain,
  className,
  children,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.location.href = `mailto:${user}@${domain}`;
    }
  };

  return (
    <a
      href="#contact-email"
      onClick={handleClick}
      className={className}
      data-u={user}
      data-d={domain}
      rel="nofollow"
      aria-label={`Send an email to ${user} at ${domain}`}
    >
      {children ?? (
        <>
          <span>{user}</span>
          <span aria-hidden="true">&#64;</span>
          <span>{domain}</span>
        </>
      )}
    </a>
  );
}
