import { SITE_NAME } from '@/shared';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import React from 'react';
import { Toaster } from 'sonner';

import { Providers } from '@/app/providers';

import './globals.scss';

const zen = Noto_Sans({
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: 'normal',
	subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: 'The best efficiency app',
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<body className={zen.className}>
				<Providers>
					{children}
					<Toaster
						theme='dark'
						position='top-right'
						duration={1500}
					/>
				</Providers>
			</body>
		</html>
	);
}
