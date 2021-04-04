import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeNameInStorage = async (name: string) => {
  try {
    await AsyncStorage.setItem('@reaction_data_name', name)
  } catch (e) {
    console.error('Saving name to local storage failed.', e)
  }
}

export const getNameFromStorage = async () => {
  try {
    const name = await AsyncStorage.getItem('@reaction_data_name')
    return name
  } catch(e) {
    console.error(e)
    return null
  }
}
