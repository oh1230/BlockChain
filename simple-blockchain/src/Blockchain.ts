import BlockCrypto from "./BlockCrypto";

class Blockchain {
  private blockChain: BlockCrypto[];

  constructor() {
    this.blockChain = [this.initGenesisBlock()];
  }

  /*
   * ブロックチェーンの一番目のブロックを生成
   * @returns 一番目のブロック
   */
  private initGenesisBlock(): BlockCrypto {
    return new BlockCrypto(0, Date.now(), "First Blockchain", "0");
  }

  /*
   * ブロックチェーンに追加された最後のブロックを探す
   * @returns 最後に追加されたブロック
   */
  private obtainLatestBlock(): BlockCrypto {
    return this.blockChain[this.blockChain.length - 1];
  }

  /*
   * 新しいブロックをブロックチェーンに追加
   * 新しいブロックのprevHashにはブロックチェーンの最後のブロックのHashを設定
   * ブロックの変造を塞ぐ
   * @param newBlock ブロックチェーンに追加する新しいブロック
   */
  public addNewBlock(newBlock: BlockCrypto) {
    newBlock.setPrevHash(this.obtainLatestBlock().getHash());
    newBlock.setHash(newBlock.computeHash());
    this.blockChain.push(newBlock);
  }

  /*
   * ブロックチェーンの全てのブロックのprevHashとhashが互いを示すのかを確認して
   * Hashが変造されたのかを確認
   * @returns ブロックチェーンの無結成が損傷された場合falseをreturn
   */
  public isValidChain(): boolean {
    for (let index = 1; index < this.blockChain.length; index++) {
      const currentBlock = this.blockChain[index];
      const prevHash = this.blockChain[index - 1];
      if (currentBlock.getHash() !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.getPrevHash() !== prevHash.getHash()) {
        return false;
      }
    }
    return true;
  }
}

export default Blockchain;
