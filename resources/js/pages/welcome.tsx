import ShoeCustomizer from '@/components/shoe-customizer';
import CartSlidePanel from '@/components/cart-slide-panel';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function Welcome() {
    const { auth, cart } = usePage<SharedData>().props;
    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartItemCount = cart?.items?.length || 0;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex flex-col min-h-screen bg-[#FFFFFF] text-black dark:bg-[#FFFFFF]">
                <header className="absolute top-0 right-0 m-6 text-sm z-10">
                    <nav className="flex items-center gap-4">
                        {/* Kosár gomb */}
                        {auth.user && (
                            <div
                                onClick={() => setIsCartOpen(true)}
                                className="relative inline-flex items-center cursor-pointer mr-2"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-3 -right-3 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        )}

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
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-black hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-black dark:hover:border-[#62605b]"
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

                {auth.user && (
                    <CartSlidePanel
                        cart={cart}
                        isOpen={isCartOpen}
                        onClose={() => setIsCartOpen(false)}
                    />
                )}
            </div>
        </>
    );
}
