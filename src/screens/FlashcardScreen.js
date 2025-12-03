import React, { useMemo, useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { WORDS } from '../data/words';
import { LanguageContext } from '../context/LanguageContext';

export default function FlashcardScreen() {
  const { t } = useContext(LanguageContext);
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const card = useMemo(() => WORDS[index], [index]);

  const nextWord = () => {
    setIndex((prev) => (prev + 1) % WORDS.length);
    setShowBack(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={[styles.card, showBack && styles.cardBack]} onPress={() => setShowBack((s) => !s)}>
        {!showBack ? (
          <View>
            <Text style={styles.term}>{card.term}</Text>
            <Text style={styles.hint}>(chạm để xem nghĩa)</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.definition}>{card.definition}</Text>
            <Text style={styles.example}>{t.example}: {card.example}</Text>
          </View>
        )}
      </Pressable>

      <TouchableOpacity style={styles.nextButton} onPress={nextWord}>
        <Text style={styles.nextButtonText}>{t.nextWord}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: '100%',
    minHeight: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardBack: {
    backgroundColor: '#eef2ff',
  },
  term: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  hint: {
    marginTop: 8,
    color: '#6b7280',
    fontSize: 12,
  },
  definition: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  example: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
