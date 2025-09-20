import { StyleSheet, Text, View } from "react-native";
export default function AddTaskScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tambah Tugas</Text>
            <Text>(Form CRUD akan ditambahkan Minggu 2)</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 18, fontWeight: "700" },
});
