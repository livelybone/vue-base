import { Storage } from '@livelybone/storage'
import { tokenKeyForStorage } from 'config/config'

export class StorageX extends Storage {
  constructor(useCookie) {
    super(useCookie, (err, [key, val], storageInstance) => {
      console.warn(err)

      // 如果缓存溢出报错，清空 Storage
      storageInstance.keys(k => {
        if (k !== tokenKeyForStorage) storageInstance.delete(k)
      })

      // 重新设置
      storageInstance.set(key, val)
    })
  }
}

export const storage = new StorageX(false)
