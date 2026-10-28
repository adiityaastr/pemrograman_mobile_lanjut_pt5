import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useLoanState } from '../contexts/LoanContext';
import { useTheme } from '../contexts/ThemeContext';

export default function LoanSummary() {
  const { loans } = useLoanState();
  const { colors } = useTheme();

  // Ringkasan dihitung langsung dari data utama (single source of truth).
  const total = loans.length;
  const returned = loans.filter(loan => loan.returned).length;
  const borrowed = total - returned;

  const items = [
    { label: 'Total peminjaman', value: total, color: colors.primary },
    { label: 'Belum dikembalikan', value: borrowed, color: colors.warning },
    { label: 'Sudah dikembalikan', value: returned, color: colors.success },
  ];

  return (
    <View style={styles.row}>
      {items.map(item => (
        <View
          key={item.label}
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.value, { color: item.color }]}>
            {item.value}
          </Text>
          <Text style={[styles.label, { color: colors.secondaryText }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
  },
});
