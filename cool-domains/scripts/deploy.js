const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("nuf");
    await domainContract.deployed();

    console.log("Contract deployed to: ", domainContract.address);

    let txn = await domainContract.register("bentley", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();

    console.log("Minted domain bentley.nuf");

    txn = await domainContract.setRecord("bentley", "I am a Bentley!");
    await txn.wait();
    console.log("Set record for bentley.nuf");

    const address = await domainContract.getAddress("bentley");
    console.log("Owner of the domain bentley: ", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();