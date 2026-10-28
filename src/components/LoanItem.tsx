import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useLoanDispatch } from '../contexts/LoanContext';
import { useTheme } from '../contexts/ThemeContext';
import type { Loan } from '../types/loan';
import { formatDate } from '../utils/date';

type Props = {
  loan: Loan;
};

export default function LoanItem({ loan }: Props) {
  const dispatch = useLoanDispatch();
  const { colors } = useTheme();

  const statusColor = loan.returned ? colors.success : colors.warning;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: loan.returned
            ? colors.returnedBackground
            : colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Text
          style={[styles.bookTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {loan.bookTitle}
        </Text>

        <View style={[styles.badge, { borderColor: statusColor }]}>
          <Text style={[styles.badgeText, { color: statusColor }]}>
            {loan.returned ? 'Sudah dikembalikan' : 'Dipinjam'}
          </Text>
        </View>
      </View>

      <Text style={[styles.meta, { color: colors.secondaryText }]}>
        Peminjam: {loan.borrowerName}
      </Text>
      <Text style={[styles.meta, { color: colors.secondaryText }]}>
        Tanggal pinjam: {formatDate(loan.borrowDate)}
      </Text>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            loan.returned
              ? `Tandai ${loan.bookTitle} belum dikembalikan`
              : `Tandai ${loan.bookTitle} sudah dikembalikan`
          }
          onPress={() =>
            dispatch({
              type: 'loan/toggleReturned',
              payload: { id: loan.id },
            })
          }
          style={[styles.actionButton, { borderColor: colors.primary }]}
        >
          <Text style={[styles.actionText, { color: colors.primary }]}>
            {loan.returned ? 'Tandai belum kembali' : 'Tandai sudah kembali'}
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Hapus peminjaman ${loan.bookTitle}`}
          onPress={() =>
            dispatch({
              type: 'loan/delete',
              payload: { id: loan.id },
            })
          }
          style={styles.deleteButton}
        >
          <Text style={[styles.actionText, { color: colors.danger }]}>
            Hapus
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 13,
    marginBottom: 10,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 2,
  },
  bookTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  badge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  meta: {
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  actionText: {
    fontWeight: '700',
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
});
