import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import { loadTasks, saveTasks } from '../src/storage/taskStorage';

// Jika perlu, aktifkan baris ini (kalau uuid error di RN):
// import 'react-native-get-random-values';

export default function Add() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Judul tugas tidak boleh kosong!');
      return;
    }

    const tasks = await loadTasks();

    const newTask = {
      id: v4(),
      title,
      description: desc,
      category: 'Umum',
      deadline: '2025-09-30',
      status: 'pending',
    };

    const updated = [...tasks, newTask];
    await saveTasks(updated);

    setTitle('');
    setDesc('');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Tugas</Text>

      <Text style={styles.label}>Judul</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Contoh: Tugas Mobile"
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={desc}
        onChangeText={setDesc}
        placeholder="Deskripsi singkat"
        multiline
      />

      <Button title="Simpan Tugas" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  label: { marginTop: 12, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
});
