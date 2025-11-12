import { useEffect, useState } from 'react';

export default function AppLogo() {

    const shortLogo = () => {
        return (
            <svg className="w-6" viewBox="0 0 110 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    className="stroke-red-500"
                    d="M19.2199 72.4468L21.6305 74.9434L49.008 102.321L54.2596 107.573L59.5113 102.321L101.094 60.7381L106.346 55.4865L101.094 50.2348L59.5113 8.65205L54.2596 3.40039L49.008 8.65205L2.3457 55.4865"
                    strokeWidth="6" strokeLinejoin="round" />
            </svg>
        );
    };

    const longLogo = () => {
        return (
            <svg className="w-32" viewBox="0 0 601 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    className="fill-black dark:fill-white"
                    d="M55.773 9.89648H48.1932L0.335938 113.94H8.51029L51.9088 18.22L95.4559 113.94H103.63L55.773 9.89648Z"
                />
                <path className="fill-black dark:fill-white"
                      d="M217.554 9.89648H209.974V100.266L139.229 9.89648H132.838V113.94H140.418V23.5708L211.312 113.94H217.554V9.89648Z" />
                <path className="fill-black dark:fill-white"
                      d="M451.837 77.5249C459.565 75.2954 465.659 71.4309 469.82 65.7828C473.982 60.1347 476.211 53.2976 476.211 44.9741C476.211 34.1238 472.496 25.503 465.064 19.2604C457.633 13.0178 447.378 9.89648 434.299 9.89648H396.994V16.7336H434.299C445.297 16.7336 453.769 19.2604 459.714 24.1653C465.51 29.0702 468.483 36.056 468.483 44.9741C468.483 54.0407 465.51 61.0265 459.714 65.9314C453.769 70.8363 445.297 73.2145 434.299 73.2145H396.994V113.94H404.574V79.903H434.299C437.272 79.903 440.69 79.7544 444.406 79.1598L469.226 113.94H477.846L451.837 77.5249Z" />
                <path className="fill-black dark:fill-white"
                      d="M552.478 9.89648H544.898L497.041 113.94H505.215L548.614 18.22L592.161 113.94H600.335L552.478 9.89648Z" />
                <path
                    className="stroke-red-500"
                    d="M264.874 77.9322L267.285 80.4248L294.662 107.757L299.914 113L305.166 107.757L346.748 66.243L352 61L346.748 55.757L305.166 14.243L299.914 9L294.662 14.243L248 61"
                    strokeWidth="6" strokeLinejoin="round" />
            </svg>
        );
    };

    const [isLarge, setIsLarge] = useState(false);
    useEffect(() => {
        const parentElement = document.querySelector('.parent');
        
        const resizeObserver = new ResizeObserver(() => {
          const parentWidth = parentElement.clientWidth;
          setIsLarge(parentWidth > 55); 
        });
    
        if (parentElement) {
          resizeObserver.observe(parentElement);
        }
    
        return () => {
          resizeObserver.disconnect();
        };
      }, []);


    return (
        <>
            <div className="parent flex w-full items-center justify-center rounded-md py-2">
               {isLarge ? longLogo() : shortLogo()}

            </div>
        </>
    );
}
