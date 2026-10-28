import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useLoanDispatch,
  useLoanState,
} from '../contexts/LoanContext';
import { useTheme } from '../contexts/ThemeContext';
import type { LoanFilter as FilterType } from '../types/loan';

const options: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'borrowed', label: 'Belum dikembalikan' },
  { value: 'returned', label: 'Sudah dikembalikan' },
];

export default function LoanFilter() {
  const { filter } = useLoanState();
  const dispatch = useLoanDispatch();
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.row}>
      {options.map(option => {
        const selected = filter === option.value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() =>
              dispatch({
                type: 'filter/set',
                payload: { filter: option.value },
              })
            }
            style={[
              styles.chip,
              {
                backgroundColor: selected ? colors.primary : colors.surface,
                borderColor: selected ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color: selected
                    ? isDark ? '#101722' : '#FFFFFF'
                    : colors.text,
                },
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
