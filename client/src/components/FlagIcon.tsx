interface FlagIconProps {
  country: 'BR' | 'US' | 'ES';
  size?: number;
}

export default function FlagIcon({ country, size = 24 }: FlagIconProps) {
  const flags = {
    BR: (
      // Bandeira do Brasil
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="2" fill="#009B3A"/>
        <path d="M12 4L20 12L12 20L4 12L12 4Z" fill="#FEDF00"/>
        <circle cx="12" cy="12" r="4" fill="#002776"/>
        <path d="M8 12C8 12 10 10 12 10C14 10 16 12 16 12" stroke="white" strokeWidth="0.8" fill="none"/>
      </svg>
    ),
    US: (
      // Bandeira dos EUA
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="2" fill="#B22234"/>
        <rect y="2" width="24" height="1.8" fill="white"/>
        <rect y="5.6" width="24" height="1.8" fill="white"/>
        <rect y="9.2" width="24" height="1.8" fill="white"/>
        <rect y="12.8" width="24" height="1.8" fill="white"/>
        <rect y="16.4" width="24" height="1.8" fill="white"/>
        <rect y="20" width="24" height="1.8" fill="white"/>
        <rect width="10" height="12" rx="1" fill="#3C3B6E"/>
        <circle cx="2.5" cy="2.5" r="0.5" fill="white"/>
        <circle cx="5" cy="2.5" r="0.5" fill="white"/>
        <circle cx="7.5" cy="2.5" r="0.5" fill="white"/>
        <circle cx="2.5" cy="5" r="0.5" fill="white"/>
        <circle cx="5" cy="5" r="0.5" fill="white"/>
        <circle cx="7.5" cy="5" r="0.5" fill="white"/>
        <circle cx="2.5" cy="7.5" r="0.5" fill="white"/>
        <circle cx="5" cy="7.5" r="0.5" fill="white"/>
        <circle cx="7.5" cy="7.5" r="0.5" fill="white"/>
        <circle cx="2.5" cy="10" r="0.5" fill="white"/>
        <circle cx="5" cy="10" r="0.5" fill="white"/>
        <circle cx="7.5" cy="10" r="0.5" fill="white"/>
      </svg>
    ),
    ES: (
      // Bandeira da Espanha
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="2" fill="#AA151B"/>
        <rect y="6" width="24" height="12" fill="#F1BF00"/>
        <rect y="0" width="24" height="6" fill="#AA151B"/>
        <rect y="18" width="24" height="6" fill="#AA151B"/>
      </svg>
    )
  };

  return flags[country];
}

