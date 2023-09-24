import ethers from '@nomiclabs/hardhat-ethers';
const hre = require('hardhat');

async function main() {
	const FOW_transaction = await hre.ethers.getContractFactory(
		'FOW_transaction'
	);
	const fow_transaction = await FOW_transaction.deploy();

	await fow_transaction.deployed();

	console.log(`FOW_transaction deployed to ${fow_transaction.address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
