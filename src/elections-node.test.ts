import { Field, isReady, shutdown, Mina, Party, UInt64, PrivateKey } from 'snarkyjs';
import { ElectionsNode } from './elections-node';

describe('elections-node', () => {
  it('deploy and send transaction', () => {
    const electionsNode = new ElectionsNode();
    const testAccounts = electionsNode.getTestAccounts();
  
    const nullifierRoot = Field(2137);
    const votingCardRoot = Field(420);

    const {deployTransaction, snappAddress } = electionsNode.createDeployTransaction(testAccounts[0].privateKey, {nullifierRoot, votingCardRoot});
    electionsNode.addTransaction(deployTransaction);
    electionsNode.setAddress(snappAddress);

    //@ts-ignore
    // console.log(deployTransaction.toJSON());
  })
})

export {} 

// const Local = Mina.LocalBlockchain();
// Mina.setActiveInstance(Local);
// const account1 = Local.testAccounts[0].privateKey;
// const account2 = Local.testAccounts[1].privateKey;

// const snappPrivkey = PrivateKey.random();
// let snappAddress = snappPrivkey.toPublicKey();


// describe('index.ts', () => {
//   describe('foo()', () => {
//     beforeAll(async () => {
//       await isReady;
//     });
//     afterAll(async () => {
//       await shutdown();
//     });
//     it('should be correct', async () => {
//       expect(Field(1).add(1)).toEqual(Field(2));
//     });

//     it('test sc', async () => {
//       {
//         let tx = Mina.transaction(account1, async () => {
//           const initialBalance = UInt64.fromNumber(1000000);
//           const p = await Party.createSigned(account2);
//           p.balance.subInPlace(initialBalance);
//           let snapp = new Add(snappAddress);
//           snapp.deploy(initialBalance);
//         });
//         await tx.send().wait();
//       }

//       {
//         let tx = Mina.transaction(account2, async () => {
//           let snapp = new Add(snappAddress);
//           await snapp.update();
//         });
//         await tx.send().wait()
//       }

//       {
//         let snappState = (await Mina.getAccount(snappAddress)).zkapp.appState;
//         console.log({ state: snappState[0] })
//       }
//     })
//   });
// });

export {} 