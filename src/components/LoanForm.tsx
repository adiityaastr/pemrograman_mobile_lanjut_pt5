import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useLoanDispatch } from '../contexts/LoanContext';
import { useTheme } from '../contexts/ThemeContext';
import { isValidDate, todayString } from '../utils/date';

export default function LoanForm() {
  // State input bersifat lokal karena hanya dibutuhkan oleh formulir.
  const [borrowerName, setBorrowerName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [borrowDate, setBorrowDate] = useState(todayString());
  const [error, setError] = useState('');

  const dispatch = useLoanDispatch();
  const { colors, isDark } = useTheme();

  function handleAdd() {
    const cleanName = borrowerName.trim();
    const cleanTitle = bookTitle.trim();
    const cleanDate = borrowDate.trim();

    if (!cleanName || !cleanTitle) {
      setError('Nama peminjam dan judul buku wajib diisi.');
      return;
    }

    if (!isValidDate(cleanDate)) {
      setError('Tanggal harus berformat YYYY-MM-DD, contoh 2026-10-28.');
      return;
    }

    dispatch({
      type: 'loan/add',
      payload: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        borrowerName: cleanName,
        bookTitle: cleanTitle,
        borrowDate: cleanDate,
        returned: false,
        createdAt: Date.now(),
      },
    });

    setBorrowerName('');
    setBookTitle('');
    setBorrowDate(todayString());
    setError('');
  }

  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      backgroundColor: colors.inputBackground,
      borderColor: colors.border,
    },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.heading, { color: colors.text }]}>
        Tambah peminjaman
      </Text>

      <Text style={[styles.label, { color: colors.secondaryText }]}>
        Nama peminjam
      </Text>
      <TextInput
        accessibilityLabel="Nama peminjam"
        value={borrowerName}
        onChangeText={setBorrowerName}
        placeholder="Contoh: Andi Pratama"
        placeholderTextColor={colors.secondaryText}
        returnKeyType="next"
        style={inputStyle}
      />

      <Text style={[styles.label, { color: colors.secondaryText }]}>
        Judul buku
      </Text>
      <TextInput
        accessibilityLabel="Judul buku"
        value={bookTitle}
        onChangeText={setBookTitle}
        placeholder="Contoh: Laskar Pelangi"
        placeholderTextColor={colors.secondaryText}
        returnKeyType="next"
        style={inputStyle}
      />

      <Text style={[styles.label, { color: colors.secondaryText }]}>
        Tanggal peminjaman (YYYY-MM-DD)
      </Text>
      <TextInput
        accessibilityLabel="Tanggal peminjaman"
        value={borrowDate}
        onChangeText={setBorrowDate}
        placeholder="2026-10-28"
        placeholderTextColor={colors.secondaryText}
        keyboardType="numbers-and-punctuation"
        maxLength={10}
        returnKeyType="done"
        onSubmitEditing={handleAdd}
        style={inputStyle}
      />

      {error ? (
        <Text style={[styles.error, { color: colors.danger }]}>
          {error}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        onPress={handleAdd}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: isDark ? '#101722' : '#FFFFFF' },
          ]}
        >
          Simpan peminjaman
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 6,
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  error: {
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  buttonText: {
    fontWeight: '700',
  },
});
