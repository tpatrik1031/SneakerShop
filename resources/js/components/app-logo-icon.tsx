import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 110 111" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                className="stroke-red-500"
                fill="none"
                d="M19.2199 72.4468L21.6305 74.9434L49.008 102.321L54.2596 107.573L59.5113 102.321L101.094 60.7381L106.346 55.4865L101.094 50.2348L59.5113 8.65205L54.2596 3.40039L49.008 8.65205L2.3457 55.4865"
                strokeWidth="6" strokeLinejoin="round" />
        </svg>
    );
}
