/*
 * 各ブロックのHashを計算するために"crypto"Moduleを使用
 */
import { createHash } from "crypto";

class BlockCrypto {
  // BlockChainのブロック全てのIndexを追跡する数字
  private index: number;

  // トランザクションが完了した時間を記録
  private currentTime: number;

  // ブロックに記録されるデータ
  private data: any;

  // チェーンで以前ブロックの「Hash Key」を示すデータ
  private prevHash: string;

  // ブロックが持ってる「Hash Key」
  private hash: string;

  constructor (index: number, currentTime: number, data: any, prevHash = "") {
    this.index = index;
    this.currentTime = currentTime;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.computeHash();
  }

  /*
   * prevHash, currentTime, dataを元にブロックの「Hash Key」を生成
   */
   public computeHash(): string {
     return createHash("sha256")
      .update(
        this.prevHash + this.currentTime + JSON.stringify(this.data).toString()
      )
      .digest("hex");
   }

   public getIndex(): number {
     return this.index;
   }

   public getCurrentTime(): number {
     return this.currentTime;
   }

   public getData(): any {
     return this.data;
   }

   public getPrevHash(): string {
     return this.prevHash;
   }

   public setPrevHash(prevHash: string): string {
     return (this.prevHash = prevHash);
   }

   public getHash(): string {
     return this.hash;
   }

   public setHash(hash: string): string {
    return (this.hash = hash);
  }
}

export default BlockCrypto;
