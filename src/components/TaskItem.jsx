import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TaskItem({ task, onToggle, onDelete }) {
  const isDone = task.status === 'done';

  return (
    <View style={[styles.card, isDone && styles.cardDone]}>
      <TouchableOpacity onPress={() => onToggle?.(task)} style={{ flex: 1 }}>
        <Text style={[styles.title, isDone && styles.strike]}>{task.title}</Text>
        {!!task.description && <Text style={styles.desc}>{task.description}</Text>}
        <Text style={styles.meta}>{task.category ?? 'Umum'}</Text>
      </TouchableOpacity>

      <Button title="🗑" onPress={() => onDelete?.(task)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardDone: { backgroundColor: '#f1f5f9' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#0f172a' },
  strike: { textDecorationLine: 'line-through', color: '#64748b' },
  desc: { color: '#475569', marginBottom: 6 },
  meta: { fontSize: 12, color: '#64748b' },
});
