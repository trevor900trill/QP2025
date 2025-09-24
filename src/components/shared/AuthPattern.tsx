export function AuthPattern() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 600"
            className="w-full h-auto max-w-4xl opacity-15"
        >
            <defs>
                <linearGradient
                    id="grad1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        style={{ stopColor: 'hsl(var(--primary-foreground))', stopOpacity: 0.5 }}
                    />
                    <stop
                        offset="100%"
                        style={{ stopColor: 'hsl(var(--primary-foreground))', stopOpacity: 0.1 }}
                    />
                </linearGradient>
            </defs>
            <rect
                width={800}
                height={600}
                stroke="url(#grad1)"
                fill="transparent"
            />
            <g
                fill="transparent"
                stroke="hsl(var(--primary-foreground))"
                strokeWidth={1}
            >
                <circle cx={200} cy={150} r={40} />
                <circle cx={600} cy={450} r={60} />
                <path d="M 200 150 l 150 100" />
                <path d="M 350 250 l 50 -50" />
                <path d="M 400 200 l 100 0" />
                <path d="M 500 200 l 100 250" />
                <path d="M 400 200 q 50 150 200 250" />
                <path d="M 100 50 l 0 200" />
                <path d="M 100 250 l 250 0" />
                <path d="M 100 50 l -50 50" />
                <path d="M 50 100 l 0 50" />
                <path d="M 50 150 l -50 0" />
                <path d="M 700 50 l 0 100" />
                <path d="M 700 150 l -100 0" />
                <path d="M 600 150 l 0 -50" />
                <path d="M 600 100 l 50 0" />
                <path d="M 150 550 l 200 -100" />
                <path d="M 350 450 l 50 50" />
                <path d="M 400 500 l 200 0" />
                <path d="M 600 500 l -100 -50" />
            </g>
        </svg>
    )
}
