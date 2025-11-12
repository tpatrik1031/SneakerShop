import ShoeCustomizer from '@/components/shoe-customizer';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex flex-col min-h-screen bg-[#FFFFFF] text-black dark:bg-[#FFFFFF]">
                <header className="absolute top-0 right-0 m-6 text-sm z-10">
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-black hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-black dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-black hover:border-[#19140035] dark:text-black dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-black hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-blackdark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <main className="flex-1 flex items-center justify-center">
                    <div className="w-full h-full">
                        <ShoeCustomizer />
                    </div>
                </main>
            </div>
        </>
    );
}
