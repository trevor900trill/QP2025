export function AuthPattern() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
            className="w-full h-auto max-w-2xl opacity-60"
            >
            <defs>
                <linearGradient
                gradientTransform="rotate(25, 0.5, 0.5)"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="ffflux-gradient"
                >
                <stop stopColor="hsl(var(--primary))" stopOpacity="1" offset="0%"></stop>
                <stop stopColor="hsl(var(--accent))" stopOpacity="1" offset="100%"></stop>
                </linearGradient>
                <filter
                id="ffflux-filter"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
                >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.005 0.003"
                    numOctaves="2"
                    seed="2"
                    stitchTiles="stitch"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    result="turbulence"
                ></feTurbulence>
                <feGaussianBlur
                    stdDeviation="20 0"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="turbulence"
                    edgeMode="duplicate"
                    result="blur"
                ></feGaussianBlur>
                <feBlend
                    mode="color-dodge"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="SourceGraphic"
                    in2="blur"
                    result="blend"
                ></feBlend>
                </filter>
            </defs>
            <rect
                width="800"
                height="800"
                fill="transparent"
                filter="url(#ffflux-filter)"
            ></rect>
        </svg>
    )
}
