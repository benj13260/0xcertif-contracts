import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { doesNotReject } from "assert";
import { expect } from "chai";
import { BigNumber, Contract, Signer, utils } from "ethers";
import { ethers } from "hardhat";
import { Galleries, Gallery } from "../typechain";


// My Pub
// 0x2304513f83cB4F6185D0ba739C6d85672D88d701

describe("Gallery", function () {
    let gs : any;
    let g : any
    const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc",43113)
    let s  : Signer 

    let dep_erc : string

    this.beforeEach(async function() {
        // This is executed before each test
        // Deploying the smart contract
        // local
        //const Gallery = await ethers.getContractFactory("Gallery");
        //const Galleries = await ethers.getContractFactory("Galleries");
        //gs = await Galleries.deploy() //"Work Contract", "WRK", new BigNumber(200), );
        // g = await Gallery.deploy("Work Contract", "WRK");
        s = new ethers.Wallet("8a0acf2c375a6064a758ea853ebd276f2fde578d97e9e84f83e222c1829c014d",provider)
    })

    
    it("Run Gallery mint fuji", async function () {
    
        const gsf = await ethers.getContractFactory("Galleries",s);
        gs = new Contract("0xe35521D14216b805aF7C9D7b66B0Ce25671D37bb",gsf.interface,s)
        let tx  = await gs.createChildContract("Work Contract", "WRK",
        { gasPrice:ethers.utils.parseUnits('25', 'gwei'), gasLimit: 8000000})
        //console.log("res: ")
        //console.log(tx)
        await tx.wait()     

        console.log("createChildContract")
        let dep : string []  = await gs.getDeployedChildContracts(
        { gasPrice:ethers.utils.parseUnits('25', 'gwei'), gasLimit: 8000000})
        console.log("getDeployedChildContracts")
        console.log(dep)
        console.log("----------")
        dep_erc = dep[dep.length-1];
        console.log(dep_erc)
            
        /*
        const gf = await ethers.getContractFactory("Gallery",s);
        let g = new Contract(dep[dep.length-1],gf.interface,s)

        console.log("getContractFactory Gallery")
   
        let a = await s.getAddress();
        tx = await g.safeMint(a, "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1", 
        { gasPrice:ethers.utils.parseUnits('25', 'gwei'), gasLimit: 8000000});
        console.log("safe mint")
        await tx.wait()     
        console.log("res: ")
        console.log(tx)
        */

    });
    

    it("Run Gallery mint only", async function () {
       const gf = await ethers.getContractFactory("Gallery",s);

       let g = new Contract(dep_erc,gf.interface,s)
       let a = await s.getAddress();
       console.log("balance: "+ await s.getBalance());

       let tx = await g.safeMint(a, "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1", 
        { gasPrice:ethers.utils.parseUnits('25', 'gwei'), gasLimit: 8000000});
        
        await tx.wait(),   
        console.log("res: ")
        console.log(tx)
    });

/*
    it("Run Gallery mint", async function () {
        const [account1] = await ethers.getSigners();
        let g  = await gs.createChildContract("Work Contract", "WRK")
        console.log("g: "+g)
        expect(await g.balanceOf(account1.address)).to.equal(0);
        
        let tx = await g.connect(account1).safeMint(account1.address, "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1", 
        { gasPrice:ethers.utils.parseUnits('25', 'gwei'), gasLimit: 8000000} );

        expect(await g.balanceOf(account1.address)).to.equal(1);
        expect(await g.ownerOf(1)).to.equal(account1.address);
        expect(await g.tokenURI(1)).to.equal("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1");


        tx = await g.connect(account1).safeMint(account1.address, "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/2", 
        { gasPrice:ethers.utils.parseUnits('25', 'gwei'), gasLimit: 8000000} );
        expect(await g.balanceOf(account1.address)).to.equal(2);
        expect(await g.ownerOf(2)).to.equal(account1.address);

        let accs = await ethers.getSigners();

        console.log(accs[0].address);
        expect(await g.balanceOf(accs[0].address)).to.equal(2);
        expect(await g.balanceOf(accs[1].address)).to.equal(0);
        
        // Transfer token (eq. sale) to acc 1
        tx = await g.connect(accs[0])['safeTransferFrom(address,address,uint256)'](accs[0].address, accs[1].address, 1)
        console.log(accs[0].address);

        // Transfer holder to acc 1
        tx = await g.connect(accs[0]).transferHolder(accs[1].address,1)

        expect(await g.balanceOf(accs[0].address)).to.equal(1);
        expect(await g.balanceOf(accs[1].address)).to.equal(1);
        expect(await g.holder(1)).to.equal(accs[1].address);

    });
*/    

});



/*
describe("TokenCreator", function () {
    let gs : any;
    let g : any
    const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc",43113)
    let s  : Signer 

    this.beforeEach(async function() {
        // This is executed before each test
        // Deploying the smart contract
        s = new ethers.Wallet("8a0acf2c375a6064a758ea853ebd276f2fde578d97e9e84f83e222c1829c014d",provider)


        // local
        // const t = await ethers.getContractFactory("TokenCreator");
        // gs = await t.deploy()

        // fuji
        const t = await ethers.getContractFactory("TokenCreator",s);
        gs = new Contract("0x664964ab166853d3a3401DF37E3d0202902b17fb",t.interface,s)


    });

    it("Run Gallery mint", async function () {
        // local
        //const [account1] = await ethers.getSigners();

        // fuji
        let g = await gs.createToken(utils.formatBytes32String("test"),
        {gasPrice:ethers.utils.parseUnits('25', 'gwei'), gasLimit: 8000000});
        console.log(g)
        console.log(g.to)
        const o = await ethers.getContractFactory("OwnedToken",s);
        // local
        //let oo : Contract =  new Contract(g.to,o.interface,account1)

        //fuji
        let oo : Contract =  new Contract(g.to,o.interface,s)
        console.log(oo.address);
        //console.log(await oo.getNam())

    });
});
     
/*

describe("Minter", function () {
  it("Should return the new minted token", async function () {
    
   
    const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc",43113)
    
    let s : Signer  = new ethers.Wallet("8a0acf2c375a6064a758ea853ebd276f2fde578d97e9e84f83e222c1829c014d",provider)
    
    const CertifFact = await ethers.getContractFactory("Certif");
    const Certif = new Contract("0x905D9cFc8523433D96e9da6ce917e4dDc2D4877a",CertifFact.interface,s)


    console.log("gas "+ethers.utils.formatEther(await provider.getGasPrice()))
    //expect(await Certif.balanceOf(owner.address)).to.equal(0);

    let a = await s.getAddress();
    console.log("bal "+ ethers.utils.formatEther(await s.getBalance()))

    const data = await Certif.safeMint(a, 1, "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1", 
        {gasPrice:ethers.utils.parseUnits('25', 'gwei'), gasLimit: 8000000}
    );
    let res = await provider.waitForTransaction(data.hash);
    console.log(res.status)
    const receipt = await provider.getTransactionReceipt(data.hash);
    console.log(JSON.stringify(receipt)) // Web3.utils.hexToNumber(receipt.logs[0].topics[3]));
    console.log("mint hash "+data.hash)

  });
});

describe("Artwork Smart Contract Tests", function() {

    let artwork : any;

    this.beforeEach(async function() {
        // This is executed before each test
        // Deploying the smart contract
        const Artwork = await ethers.getContractFactory("Artwork");
        artwork = await Artwork.deploy("Artwork Contract", "ART");
    })

    it("NFT is minted successfully", async function() {
        const [account1] = await ethers.getSigners();

        expect(await artwork.balanceOf(account1.address)).to.equal(0);
        
        const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
        const tx = await artwork.connect(account1).mint(tokenURI);

        expect(await artwork.balanceOf(account1.address)).to.equal(1);
    })

    it("tokenURI is set sucessfully", async function() {
        const [account1, account2] = await ethers.getSigners();

        const tokenURI_1 = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
        const tokenURI_2 = "https://opensea-creatures-api.herokuapp.com/api/creature/2"

        const tx1 = await artwork.connect(account1).mint(tokenURI_1);
        const tx2 = await artwork.connect(account2).mint(tokenURI_2);

        expect(await artwork.tokenURI(0)).to.equal(tokenURI_1);
        expect(await artwork.tokenURI(1)).to.equal(tokenURI_2);

    });

});
*/