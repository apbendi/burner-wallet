# About Burner Wallet

🔥👛 The [Burner Wallet](https://xdai.io) is a quick web wallet used to move small amounts of crypto quickly. On page load an Ethereum keypair is automatically generated and used to sign transactions with an incredibly simple interface. Sending funds is as easy as a QR code scan. 

💵 Burners are analogous to cash: quick and easy but less secure. You wouldn't stuff thousands of dollars in your pocket on the way out the door at night, don't trust a seed phrase in localstorage with more than you are willing to lose.

🏠 Don't forget to sweep funds to colder storage when you get home at night and burn your ephemeral keys!

💸 Press the `[Request]` button to instantly create a popup point-of-sale system and have a QR code to display in the window of your shop. Patrons can send you funds with [a simple scan in seconds](https://youtu.be/neZeaXAnkAg).

🏦 Press the `[Exchange]` button to move ETH or DAI that you sent to your burner into [xDai](https://poa.network/xdai). 

🔗 Press the `[Link]` button to send value in a link over chat or QR scan in person. We use a [decentralized meta transaction relay system](https://medium.com/tabookey/1-800-ethereum-gas-stations-network-for-toll-free-transactions-4bbfc03a0a56) so the receiving party doesn't need to have a wallet or gas to claim.

🗝️ If you would like more permanence, press the [Advanced] button and [use a short pass phrase](https://youtu.be/3zAFo-8p_tg?t=48) to seed a keypair. 

💬 Did you know there is also native, [burner-to-burner encrypted chat](https://www.youtube.com/watch?v=k1Ssz1dvcpk&feature=youtu.be&t=558)?

🌮 The Burner Wallet was [used at ETHDenver](https://medium.com/gitcoin/burner-wallet-at-ethdenver-was-faa3851ea833) by participants to purchase 4405 meals, we off-ramped $38,432.56 in DAI to the food trucks, and the total cost of transactions on [xDai](https://poa.network/xdai) was $0.20! 

🎭 We held a number of smaller events we called a [Cypherpunk Speakeasy](https://medium.com/@austin_48503/the-burner-wallet-challenge-cf90453aaf24) to demonstrate the tech and learn how to improve our user experience. 

🍻 If you are interested in hosting a Burner Wallet event, check out [Host to host a Burner Wallet event](https://medium.com/gitcoin/how-to-host-a-burner-wallet-event-53a429035a24). 

🎫 Using [paper wallets](https://github.com/austintgriffith/paper-wallet), [ether.cards](https://ether.cards/), or solidcoins, users can be instantly onboarded into a wallet and have tokens or localcoins to purchase goods or services. 

🤑 We are finding that the Burner is becoming more of an instant onboarding platform for apps. I built Emojicoin.Exchange in an afternoon and [launched it](https://medium.com/gitcoin/emojicoin-exchange-53f9658c9e3b) to a room of students. They could immediately start interacting with a smart contract without any app download or seed phrase. We also played this game [live with Crypto Twitter](https://www.youtube.com/watch?v=RSyuKNoMPkA) and again at [ETHNewYork](https://ethnewyork.io). 

🤔 At Ethereal we did the usual food truck tokens, but participants could also [bet on prediction markets](https://medium.com/@austin_48503/burner-wallet-ethereal-was-rad-bf56b68ac3bc) while they waited in line for food. 

🔧 If you are interested in building a Dapp or game on the Burner Wallet, a great place to start is exploring [Burner Module Development](https://medium.com/gitcoin/burner-modules-c6737cf06fe). 

🔏 A great example of a new and exciting module is the [Gnosis Safe in the Burner Wallet](https://www.youtube.com/watch?v=ONlB-LK3D0g).

🧑‍🤝‍🧑 The [Burner Wallet Collective](https://burnerwallet.co) is forming around fundamental development on this repo toward a shared mission of building a cleaner more extensible burner wallet. [Join our telegram](https://t.me/joinchat/KByvmROSyXhuMESDUL5YVA) and [tackle some issues](https://github.com/austintgriffith/burner-wallet/issues) to earn a bounty reward!

✅ All projects should have a 'burner' version of their product. Take simple fundamentals from your app and put them in an easy to access web version before the barriers to entry. Use this to educate your users about your product and incentivized them to take the next step and download your app. 

🗺 The Burner Wallet all started while exploring the intersection of smooth UX and Frontier Markets. The theory is that [mass adoption will start where decentralization in necessary (emerging economies)](https://medium.com/@austin_48503/ethereum-in-emerging-economies-b235f8dac2f2).
https://user-images.githubusercontent.com/2653167/48271785-5dcf5c80-e3fa-11e8-98fb-143de75df7aa.gif
✊ You can support our efforts by contributing to the [Burner Wallet Gitcoin Grant](https://gitcoin.co/grants/20/burner-wallet) or sending mainnet funds to [burnerwallet.eth](https://etherscan.io/address/0xda6a87d5d23cdfa286104119f0e406197ea387da)

🙏 Thanks! - Austin Griffith ( @austingrifith / austin@concurrence.io )

🛠️ If you are interested in contributing development to the Burner Wallet, read on...

## Demos

Here's a quick demo of a recent version of the burner in action:

[![burnerwalletvideosplash](https://user-images.githubusercontent.com/2653167/50697319-23033280-0fff-11e9-8891-77965ecf1fcf.jpg)](https://youtu.be/k1Ssz1dvcpk)

Here's two phones exchanging value in a matter of seconds on an old version of Burner:

![burnerwalletdemo](https://user-images.githubusercontent.com/2653167/48271785-5dcf5c80-e3fa-11e8-98fb-143de75df7aa.gif)

Here's Austin introducing the first version of Burner Wallet, and explaining why he built it and how it works:

[![burnerwalletscreencast](https://user-images.githubusercontent.com/2653167/48286964-83715b80-e424-11e8-9fc3-a1260bfb4a00.png)](https://youtu.be/KkOyrEvYqO8)

Here is a follow up video to show how to go from fiat to DAI to xDai and back:

[![onrampscreencast](https://user-images.githubusercontent.com/2653167/48295187-cb08df00-e446-11e8-9506-ff74a6d19604.png)](https://youtu.be/sbHIyDMpqyY)

## More Info

One mobile phone can send DAI to another in 5 seconds with a simple QR code scan without any wallet download, this works on web browsers. Users can even send value through messaging services like WhatsApp with a simple link!

The Burner Wallet runs on the xDai sidechain from POA. Since it is in DAI, a dApp can simply refer to amounts in USD. Plus, block times take 5 seconds and gas costs are virtually abstracted because they are so cheap and paid in DAI. Finally, the bridge between xDai and DAI/ETH is as simple as sending tokens to a specific address. 

A burner wallet is automatically generated upon visiting https://xdai.io and your private key is stored in a cookie so it will be there when you come back. However, you should sweep any value you hold to a cold wallet regularly and burn your ephemeral private key. A burner wallet is analogous to cash; you won't carry too much because it can be lost but it's astonishingly easy to exchange. 

This can also be very handy in everyday use even for the crypto-initiated. If you are share a Lyft or a pizza with a friend and want to split the cost, just shoot their QR code with your camera and it will open up a new burner wallet to exchange value with them. Just don't forget to sweep to cold storage and burn your key when you get home!

## Resources

* An intro to the Burner Wallet on the Settle Blog. [Link](https://settle.finance/blog/what-is-the-burner-wallet-and-whats-xdai/).
* Burner Wallet on EthHub. [Link](https://docs.ethhub.io/built-on-ethereum/open-finance/burner-wallet/).
* The xDai chain explorer. [Link](https://blockscout.com/poa/dai).

