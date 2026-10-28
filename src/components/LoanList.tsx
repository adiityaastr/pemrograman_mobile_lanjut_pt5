import React, { type ReactElement } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useLoanState } from '../contexts/LoanContext';
import { useTheme } from '../contexts/ThemeContext';
import LoanItem from './LoanItem';

type Props = {
  header?: ReactElement;
};

export default function LoanList({ header }: Props) {
  const { loans, filter } = useLoanState();
  const { colors } = useTheme();

  // Derived state: daftar yang tampil dihitung dari loans dan filter.
  const visibleLoans = loans.filter(loan => {
    if (filter === 'borrowed') {
      return !loan.returned;
    }

    if (filter === 'returned') {
      return loan.returned;
    }

    return true;
  });

  return (
    <FlatList
      data={visibleLoans}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <LoanItem loan={item} />}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View style={[styles.empty, { borderColor: colors.border }]}>
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
            Tidak ada data peminjaman pada filter ini.
          </Text>
        </View>
      }
      contentContainerStyle={styles.list}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 18,
    paddingBottom: 32,
  },
  empty: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 22,
  },
  emptyText: {
    textAlign: 'center',
  },
});
