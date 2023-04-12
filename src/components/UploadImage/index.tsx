import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react'
import { uploadImg } from '../../utils';
import {
  List,
  Icon,
  Action,
  ActionPanel,
  Clipboard,
  Toast,
  showHUD,
  showToast,
  LocalStorage
} from '@raycast/api'
import LoginDetail from '../LoginDetail';

const IMAGE_STORAGE = 'img-list'

interface ImageItem {
  path: string,
  url: string
}

interface UploadDetailProps {
  path: string

  store: ImageItem[]
}

const UploadImage = ({ isLogin }) => {
  const [path, setPath] = useState<string>('')
  const [store, setStore] = useState<ImageItem[]>([])

  const markdown = useMemo(() => {
    if (path) return `![](${path})`
    return '请复制图片到粘贴板'
  }, [path])

  const url = useMemo<string | undefined>(() => store.find(item => item.path === path)?.url, [path, store])

  const handleSubmit = async () => {
    if (!path) return

    await showToast({
      title: "上传中",
      style: Toast.Style.Animated
    })

    try {
      const { code, message, data } = await uploadImg(path)

      if (code === 0) {
        showToast({
          title: "上传成功",
          style: Toast.Style.Success
        })

        await Clipboard.copy(data.image_url)
        showHUD('复制成功')
        setStore(pre => [...pre, { path, url: data.image_url }])
      } else throw Error(message)
    } catch (e) {
      showToast({
        title: (e as Error).message || "上传失败",
        style: Toast.Style.Failure
      })
    }
  }

  const handleCopy = async () => {
    if (!url) return
    await Clipboard.copy(url)
    showHUD('复制成功')
  }

  useEffect(() => {
    (async () => {
      const { file } = await Clipboard.read()
      file && setPath(file)
    })()
  }, [])

  useEffect(() => {
    const loadStore = async () => {
      const store = await LocalStorage.getItem<string>(IMAGE_STORAGE)
      store && setStore(JSON.parse(store))
    }

    if (store.length) {
      LocalStorage.setItem(IMAGE_STORAGE, JSON.stringify(store))
    } else {
      loadStore()
    }
  }, [store])

  const UploadDetail: FC<UploadDetailProps> = () => (
    <List.Item.Detail markdown={markdown} metadata={
      path && <List.Item.Detail.Metadata>
        {
          url 
          ? <List.Item.Detail.Metadata.Label title="URL地址" text={url} />
          : <List.Item.Detail.Metadata.Label title="文件地址" text={path} />
        }
        <List.Item.Detail.Metadata.Label title="状态" text={url  ? '已上传' : '未上传'} />
      </List.Item.Detail.Metadata>
    } />
  )

  return (
    <List.Item
      title="图片上传"
      subtitle="获取粘贴板图片数据"
      icon={Icon.Upload}
      detail={ isLogin ? <UploadDetail path={path} store={store} /> : <LoginDetail />}
      actions={
        path && <ActionPanel title="操作">
          {
            url 
              ? <Action.SubmitForm onSubmit={handleCopy} title="复制链接" />
              : <Action.SubmitForm onSubmit={handleSubmit} title="图片上传" />
          }
        </ActionPanel>
      }
    />
  )
}

export default UploadImage
