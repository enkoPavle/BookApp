import {useEffect, useState} from "react"
import {MMKV, useMMKVObject} from "react-native-mmkv"

import {JsonData, JsonDataSchema} from "@/schemas/json-data"
import {getApp} from "@react-native-firebase/app"
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue
} from "@react-native-firebase/remote-config"

const storage = new MMKV()

export const useRemoteConfig = () => {
  const [data, setData] = useMMKVObject<JsonData>("json_data", storage)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)

      const app = getApp()
      const remoteConfig = getRemoteConfig(app)

      await fetchAndActivate(remoteConfig)
      const jsonString = getValue(remoteConfig, "json_data").asString()

      // Set the data
      setData(JsonDataSchema.parse(JSON.parse(jsonString)))
      setError(null)
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error
  }
}
