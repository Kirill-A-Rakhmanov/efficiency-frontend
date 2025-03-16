import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	webpack: (config, context) => {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.('.svg'),
		);

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				// issuer: /\.[jt]sx?$/,
				resourceQuery: {
					not: [...fileLoaderRule.resourceQuery.not, /url/],
				}, // exclude if *.svg?url
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							icon: true,
							exportType: 'default',
							ref: true,
							titleProp: true,
							svgo: true,
							svgoConfig: {
								plugins: [
									{
										name: 'preset-default',
										params: {
											overrides: {
												removeViewBox: false, // Оставляем viewBox
											},
										},
									},
									'removeDimensions', // Удаляем width и height
									{
										name: 'convertColors', // Преобразуем цвета в currentColor
										params: {
											currentColor: true, // Все цвета заменяются на currentColor
										},
									},
								],
							},
						},
					},
				],
			},
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

export default nextConfig;
