import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import celoGroups from '@celo/rainbowkit-celo/lists';
import { Alfajores, Celo, Cannoli } from '@celo/rainbowkit-celo/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

function MyApp({ Component, pageProps }: AppProps) {
	const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'undefined';

	const { chains, publicClient } = configureChains(
		[Alfajores, Celo, Cannoli],
		[
			jsonRpcProvider({
				rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
			}),
		]
	);

	const connectors = celoGroups({
		chains,
		projectId,
		appName: (typeof document === 'object' && document.title) || 'FOW FARM',
	});

	const wagmiConfig = createConfig({
		autoConnect: true,
		connectors,
		publicClient: publicClient,
	});

	return (
		<>
			<WagmiConfig config={wagmiConfig}>
				<RainbowKitProvider chains={chains} coolMode={true}>
					<Component {...pageProps} />
				</RainbowKitProvider>
			</WagmiConfig>
		</>
	);
}

export default MyApp;
