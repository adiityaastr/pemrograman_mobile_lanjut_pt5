import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LoanFilter from '../components/LoanFilter';
import LoanForm from '../components/LoanForm';
import LoanList from '../components/LoanList';
import LoanSummary from '../components/LoanSummary';
import { useTheme } from '../contexts/ThemeContext';

export default function DashboardScreen() {
  const { colors, isDark, toggleTheme } = useTheme();

  // Bagian atas ditempatkan sebagai header FlatList agar seluruh halaman
  // dapat digulir tanpa menaruh FlatList di dalam ScrollView.
  const header = (
    <View>
      <View style={styles.header}>
        <View style={styles.heading}>
          <Text style={[styles.title, { color: colors.text }]}>
            Dashboard Perpustakaan
          </Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
            Kelola peminjaman dan pengembalian buku.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ganti tema"
          onPress={toggleTheme}
          style={[
            styles.themeButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={{ color: colors.text }}>
            {isDark ? '☀ Terang' : '☾ Gelap'}
          </Text>
        </Pressable>
      </View>

      <LoanSummary />
      <LoanForm />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Daftar peminjaman
      </Text>
      <LoanFilter />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LoanList header={header} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 22,
  },
  heading: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  themeButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
});
