import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TASKMATE_TASKS';

export async function saveTasks(tasks) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Gagal menyimpan:', e);
  }
}

export async function loadTasks() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Gagal membaca:', e);
    return [];
  }
}
