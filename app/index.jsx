import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TaskItem from '../src/components/TaskItem';
import { dummyTasks } from '../src/data/dummyTasks';

export default function HomeScreen() {
    const [tasks, setTasks] = useState(dummyTasks);
    const [filter, setFilter] = useState("all");

    const handleToggle = (task) => {
        setTasks(prev =>
            prev.map(t =>
                t.id === task.id
                    ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
                    : t
            )
        );
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "all") return true;
        if (filter === "todo") return task.status === "pending";
        if (filter === "done") return task.status === "done";
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, filter === "all" && styles.filterActive]}
                    onPress={() => setFilter("all")}
                >
                    <Text style={styles.filterText}>All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, filter === "todo" && styles.filterActive]}
                    onPress={() => setFilter("todo")}
                >
                    <Text style={styles.filterText}>Todo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, filter === "done" && styles.filterActive]}
                    onPress={() => setFilter("done")}
                >
                    <Text style={styles.filterText}>Done</Text>
                </TouchableOpacity>
            </View>

            {/* List */}
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <TaskItem task={item} onToggle={handleToggle} />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    header: { fontSize: 20, fontWeight: '700', padding: 16 },

    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 16,
    },

    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: "#e2e8f0",
    },
    filterActive: {
        backgroundColor: "#3b82f6",
    },
    filterText: {
        color: "#000",
        fontWeight: "600",
    },
});
