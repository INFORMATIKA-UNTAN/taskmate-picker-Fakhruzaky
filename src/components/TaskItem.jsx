import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colorOfName } from '../constants/categories';
import { colorOfPriority } from '../constants/priorities';

// util sisa hari / overdue
function diffDays(deadlineStr) {
  if (!deadlineStr) return null;
  const today = new Date();
  const d = new Date(deadlineStr);
  // Normalisasi ke tanggal (jam 00:00) supaya akurat
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const t1 = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const delta = Math.round((t1 - t0) / (1000 * 60 * 60 * 24));
  return delta; // negatif = lewat (overdue)
}

export default function TaskItem({ task, categories, onToggle, onDelete }) {
  const isDone = task.status === 'done';
  const catColor = colorOfName(task.category ?? 'Umum', categories);
  const prioColor = colorOfPriority(task.priority ?? 'Low');

  const days = diffDays(task.deadline);
  const isOverdue = typeof days === 'number' && days < 0;

  // Warna background card berdasarkan prioritas (High/Medium/Low)
  const prioBg = (task.priority === 'High')
    ? '#fee2e2'  // merah muda
    : (task.priority === 'Medium')
      ? '#fef3c7' // kuning muda
      : '#f1f5f9'; // abu-abu muda

  return (
    <View style={[
      styles.card,
      { backgroundColor: prioBg },
      isDone && styles.cardDone
    ]}>
      <TouchableOpacity onPress={() => onToggle?.(task)} style={{ flex: 1 }}>
        <Text style={[styles.title, isDone && styles.strike]}>{task.title}</Text>

        {!!task.deadline && (
          <Text style={styles.deadline}>
            Deadline: {task.deadline}{' '}
            {isOverdue
              ? <Text style={{ color:'#dc2626', fontWeight:'700' }}>• Overdue</Text>
              : (typeof days === 'number')
                ? <Text style={{ color:'#334155' }}>• Sisa {days} hari</Text>
                : null}
          </Text>
        )}

        {!!task.description && <Text style={styles.desc}>{task.description}</Text>}

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <View style={[styles.badge, { borderColor: catColor, backgroundColor: `${catColor}20` }]}>
            <Text style={[styles.badgeText, { color: catColor }]}>{task.category ?? 'Umum'}</Text>
          </View>
          <View style={[styles.badge, { borderColor: prioColor, backgroundColor: `${prioColor}20` }]}>
            <Text style={[styles.badgeText, { color: prioColor }]}>{task.priority ?? 'Low'}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Button title="🗑" onPress={() => onDelete?.(task)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14, borderRadius: 16, marginBottom: 12,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#e2e8f0',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardDone: { opacity: 0.75 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4, color: '#0f172a' },
  strike: { textDecorationLine: 'line-through', color: '#64748b' },
  deadline: { fontSize: 12, color: '#334155', marginBottom: 4 },
  desc: { color: '#475569' },
  badge: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999, borderWidth: 1 },
  badgeText: { fontSize: 12, fontWeight: '700' },
});
