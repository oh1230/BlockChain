import Blockchain from "./Blockchain";
import BlockCrypto from "./BlockCrypto";

const blockChain = new Blockchain();

console.log("ブロックチェーンを生成中......");

blockChain.addNewBlock(
  new BlockCrypto(1, Date.now(), {
    sender: "オサンミン",
    receives: "Uber",
    content: "吉野家　牛丼　1つ",
  })
)

blockChain.addNewBlock(
  new BlockCrypto(2, Date.now(), {
    sender: "Uber",
    receives: "吉野家",
    content: "牛丼　1つ",
  })
)

console.log(JSON.stringify(blockChain, null, 4));

if (blockChain.isValidChain()) {
  console.log("◎有効なブロックチェーンです。");
}
else {
  console.error("✖有効ではないブロックチェーンです。");
}
