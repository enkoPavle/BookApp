import {useEffect, useState} from "react"
import {useMMKVObject} from "react-native-mmkv"

import {JsonData, JsonDataSchema} from "@/schemas/json-data"
import {storage} from "@/storage"
import {getApp} from "@react-native-firebase/app"
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue
} from "@react-native-firebase/remote-config"

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
