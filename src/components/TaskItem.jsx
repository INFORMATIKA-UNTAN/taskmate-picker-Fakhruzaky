import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TaskItem({ task, onToggle }) {
  const isDone = task.status === 'done';

  const catBg = task.categoryBg || '#E5E7EB';
  const catText = task.categoryText || '#111827';

  return (
    <TouchableOpacity onPress={() => onToggle?.(task)} activeOpacity={0.7}>
      <View style={[styles.card, isDone && styles.cardDone]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, isDone && styles.strike]}>{task.title}</Text>

          <View style={[styles.catBadge, { backgroundColor: catBg }]}>
            <Text style={[styles.catText, { color: catText }]}>{task.category}</Text>
          </View>

          {!!task.description && <Text style={styles.desc}>{task.description}</Text>}
          {!!task.deadline && (
            <Text style={styles.meta}>Due {task.deadline}</Text>
          )}
        </View>

        <View style={[styles.badge, isDone ? styles.badgeDone : styles.badgePending]}>
          <Text style={styles.badgeText}>{isDone ? 'Done' : 'Todo'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14, borderRadius: 12, backgroundColor: '#fff',
    marginBottom: 10, flexDirection: 'row', alignItems: 'center',
    elevation: 1
  },
  cardDone: { backgroundColor: '#f1f5f9' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  strike: { textDecorationLine: 'line-through', color: '#64748b' },

  catBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginBottom: 6,
  },
  catText: { fontSize: 12, fontWeight: '700' },

  desc: { color: '#475569', marginBottom: 6 },
  meta: { fontSize: 12, color: '#64748b' },

  badge: {
    paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8,
    marginLeft: 12
  },
  badgePending: { backgroundColor: '#fee2e2' },
  badgeDone: { backgroundColor: '#dcfce7' },
  badgeText: { fontWeight: '700', fontSize: 12 },
});
