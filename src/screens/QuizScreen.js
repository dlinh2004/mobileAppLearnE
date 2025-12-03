import React, { useEffect, useMemo, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WORDS } from '../data/words';
import { LanguageContext } from '../context/LanguageContext';

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuizScreen() {
  const { t } = useContext(LanguageContext);
  const [qIndex, setQIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const question = useMemo(() => WORDS[qIndex], [qIndex]);

  useEffect(() => {
    // Build 4 options: correct + 3 random others
    const others = WORDS.filter((w) => w.id !== question.id);
    const randomOthers = shuffle(others).slice(0, 3).map((w) => w.definition);
    const choices = shuffle([question.definition, ...randomOthers]);
    setOptions(choices);
    setSelected(null);
    setIsCorrect(null);
  }, [qIndex, question]);

  const onSelect = (opt) => {
    if (selected) return;
    setSelected(opt);
    setIsCorrect(opt === question.definition);
  };

  const next = () => {
    setQIndex((i) => (i + 1) % WORDS.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.term}>{question.term}</Text>
      <Text style={styles.subtitle}>{t.chooseDefinition}</Text>

      <View style={styles.options}>
        {options.map((opt) => {
          const picked = selected === opt;
          const correct = opt === question.definition;
          const bg = picked
            ? isCorrect
              ? '#10b981'
              : '#ef4444'
            : selected && correct
            ? '#10b981'
            : '#111827';
          return (
            <TouchableOpacity
              key={opt}
              style={[styles.option, { backgroundColor: bg }]}
              onPress={() => onSelect(opt)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selected && (
        <TouchableOpacity style={styles.nextButton} onPress={next}>
          <Text style={styles.nextButtonText}>{t.nextQuestion}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  term: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 16,
  },
  options: {
    gap: 12,
    marginTop: 8,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
