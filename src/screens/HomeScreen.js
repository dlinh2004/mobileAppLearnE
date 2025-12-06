import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';

export default function HomeScreen({ navigation }) {
  const { language, toggleLanguage, t } = useContext(LanguageContext);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greetingBox}>
          <Text style={styles.greetingText}>{t.greeting}</Text>
          <Text style={styles.userName}>{t.userName}</Text>
        </View>
        <TouchableOpacity 
          style={styles.languageToggle}
          onPress={toggleLanguage}
          activeOpacity={0.7}
        >
          <Text style={styles.flagEmoji}>{language === 'vi' ? '🇻🇳' : '🇺🇸'}</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>{t.words}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>{t.quizCompleted}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>{t.streakDays}</Text>
        </View>
      </View>

      {/* Feature Cards */}
      <View style={styles.cardsContainer}>
        {/* Flashcard Card */}
        <TouchableOpacity 
          style={[styles.card, styles.cardFlashcard]}
          onPress={() => navigation.navigate('Flashcard')}
          activeOpacity={0.85}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🧠</Text>
            <Text style={styles.cardLabel}>{t.learnFlashcard}</Text>
          </View>
          <Text style={styles.cardTitle}>{t.discoverVocabulary}</Text>
          <View style={styles.cardDecoration}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </TouchableOpacity>

        {/* Quiz Card */}
        <TouchableOpacity 
          style={[styles.card, styles.cardQuiz]}
          onPress={() => navigation.navigate('Quiz')}
          activeOpacity={0.85}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🎯</Text>
            <Text style={styles.cardLabel}>{t.doQuiz}</Text>
          </View>
          <Text style={styles.cardTitle}>{t.checkKnowledge}</Text>
          <View style={styles.questionMarks}>
            <Text style={styles.questionMark}>?</Text>
            <Text style={[styles.questionMark, styles.questionMarkOffset]}>?</Text>
          </View>
        </TouchableOpacity>

        {/* Chat with AI Card */}
        <TouchableOpacity 
          style={[styles.card, styles.cardChat]}
          onPress={() => navigation.navigate('Chat')}
          activeOpacity={0.85}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🤖</Text>
            <Text style={styles.cardLabel}>{t.aiChatbot}</Text>
          </View>
          <Text style={styles.cardTitle}>{t.chatWithAI}</Text>
          <View style={styles.chatBubbles}>
            <Text style={styles.bubble}>💬</Text>
            <Text style={[styles.bubble, styles.bubbleOffset]}>✨</Text>
          </View>
        </TouchableOpacity>

        {/* Stats Card */}
        <TouchableOpacity 
          style={[styles.card, styles.cardStats]}
          onPress={() => navigation.navigate('Statistics')}
          activeOpacity={0.85}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>📊</Text>
            <Text style={styles.cardLabel}>{t.stats}</Text>
          </View>
          <Text style={styles.cardTitle}>{t.trackProgress}</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Hint */}
      <View style={styles.bottomHint}>
        <Text style={styles.hintText}>{t.dailyTip}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greetingBox: {
    flex: 1,
  },
  greetingText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 2,
  },
  languageToggle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  flagEmoji: {
    fontSize: 28,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4f46e5',
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e2e8f0',
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    minHeight: 140,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardFlashcard: {
    backgroundColor: '#d1fae5',
  },
  cardQuiz: {
    backgroundColor: '#fce7f3',
  },
  cardStats: {
    backgroundColor: '#dbeafe',
  },
  cardChat: {
    backgroundColor: '#f3e8ff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 6,
  },
  cardDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  dot1: {
    opacity: 0.3,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 1,
  },
  questionMarks: {
    position: 'absolute',
    right: 20,
    bottom: 16,
  },
  questionMark: {
    fontSize: 32,
    color: '#ec4899',
    opacity: 0.3,
    fontWeight: '700',
  },
  questionMarkOffset: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    opacity: 0.15,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 12,
  },
  progressFill: {
    height: '100%',
    width: '65%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },
  chatBubbles: {
    position: 'absolute',
    right: 20,
    bottom: 16,
  },
  bubble: {
    fontSize: 28,
    opacity: 0.3,
    fontWeight: '700',
  },
  bubbleOffset: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    opacity: 0.15,
  },
  bottomHint: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  hintText: {
    fontSize: 13,
    color: '#92400e',
    fontWeight: '500',
  },
});
