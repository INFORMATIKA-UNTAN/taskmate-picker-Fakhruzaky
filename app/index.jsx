import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import TaskItem from '../src/components/TaskItem';
import { loadTasks, saveTasks } from '../src/storage/taskStorage';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await loadTasks();
      setTasks(data);
    })();
  }, [tasks]);

//   console.log(tasks)

  const handleToggle = async (task) => {
    const updated = tasks.map((t) =>
      t.id === task.id
        ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
        : t
    );
    setTasks(updated);
    await saveTasks(updated);
  };

  const handleDelete = async (task) => {
    const updated = tasks.filter((t) => t.id !== task.id);
    setTasks(updated);
    await saveTasks(updated);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Tidak ada tugas</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { fontSize: 20, fontWeight: '700', padding: 16 },
});
