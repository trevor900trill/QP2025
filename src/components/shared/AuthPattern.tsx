export function AuthPattern() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
            className="w-full h-auto max-w-2xl opacity-15"
            >
            <defs>
                <pattern
                id="grey-lines"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
                >
                <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="20"
                    stroke="hsl(var(--primary-foreground))"
                    strokeWidth="2"
                />
                </pattern>
            </defs>
            <rect width="800" height="800" fill="url(#grey-lines)" />
        </svg>
    )
}
