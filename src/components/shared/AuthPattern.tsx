export function AuthPattern() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 600"
            className="w-full h-full opacity-20"
        >
            <g fill="none" stroke="white" strokeWidth="1.5">
                {/* Large background squares */}
                <rect x="50" y="50" width="200" height="200" strokeWidth="1" />
                <rect x="300" y="150" width="250" height="250" strokeWidth="1" />
                <rect x="100" y="350" width="180" height="180" strokeWidth="1" />
                <rect x="550" y="80" width="150" height="150" strokeWidth="1" />
                <rect x="450" y="400" width="220" height="160" strokeWidth="1" />

                {/* Main bolder squares and connections */}
                <rect x="150" y="100" width="120" height="120" />
                <path d="M270,160 L350,160" />
                <path d="M210,220 L210,300" />
                
                <rect x="350" y="200" width="150" height="150" />
                <path d="M500,275 L580,275" />
                <path d="M425,350 L425,420" />

                <rect x="80" y="400" width="100" height="100" />
                <path d="M130,500 L130,550" />
                <path d="M180,450 L250,450" />

                <rect x="580" y="120" width="100" height="100" />
                <path d="M630,220 L630,275" />

                <rect x="480" y="430" width="140" height="110" />
                <path d="M620,485 L700,485" />
                <path d="M550,540 L550,580" />

                {/* Small filled squares (nodes) */}
                <rect x="265" y="155" width="10" height="10" fill="white" />
                <rect x="205" y="215" width="10" height="10" fill="white" />
                <rect x="345" y="195" width="10" height="10" fill="white" />
                <rect x="495" y="270" width="10" height="10" fill="white" />
                <rect x="420" y="345" width="10" height="10" fill="white" />
                <rect x="75" y="395" width="10" height="10" fill="white" />
                <rect x="175" y="445" width="10" height="10" fill="white" />
                <rect x="125" y="495" width="10" height="10" fill="white" />
                <rect x="625" y="215" width="10" height="10" fill="white" />
                <rect x="575" y="115" width="10" height="10" fill="white" />
                <rect x="475" y="425" width="10" height="10" fill="white" />
                <rect x="615" y="480" width="10" height="10" fill="white" />
                <rect x="545" y="535" width="10" height="10" fill="white" />

                {/* Decorative smaller nodes */}
                <rect x="400" y="80" width="6" height="6" strokeWidth="0" fill="white" opacity="0.7"/>
                <rect x="720" y="350" width="6" height="6" strokeWidth="0" fill="white" opacity="0.7"/>
                <rect x="80" y="280" width="6" height="6" strokeWidth="0" fill="white" opacity="0.7"/>
                 <rect x="320" y="550" width="6" height="6" strokeWidth="0" fill="white" opacity="0.7"/>
            </g>
        </svg>
    )
}
