import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { STATISTICS } from '../data/statistics';
import { LanguageContext } from '../context/LanguageContext';

export default function StatisticsScreen({ navigation }) {
  const { t } = useContext(LanguageContext);

  const progressPercentage = Math.round(
    (STATISTICS.learnedWords / STATISTICS.totalWords) * 100
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t.statsTitle}</Text>
      </View>

      {/* Overall Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Tiến độ chung</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Từ vựng đã học:</Text>
            <Text style={styles.progressValue}>
              {STATISTICS.learnedWords}/{STATISTICS.totalWords}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${progressPercentage}%` },
              ]}
            />
          </View>
          <Text style={styles.progressPercent}>{progressPercentage}%</Text>
        </View>
      </View>

      {/* Activity Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Thống kê hoạt động</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={styles.statNumber}>{STATISTICS.quizCompleted}</Text>
            <Text style={styles.statLabel}>Quiz hoàn thành</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statNumber}>{STATISTICS.currentStreak}</Text>
            <Text style={styles.statLabel}>Ngày liên tiếp</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statNumber}>{STATISTICS.longestStreak}</Text>
            <Text style={styles.statLabel}>Streak cao nhất</Text>
          </View>
        </View>
      </View>

      {/* Learning Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Chi tiết học tập</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tổng thời gian học:</Text>
            <Text style={styles.detailValue}>{STATISTICS.totalLearningTime}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Lần học cuối cùng:</Text>
            <Text style={styles.detailValue}>{STATISTICS.lastLearningDate}</Text>
          </View>
        </View>
      </View>

      {/* Level Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📖 Tiến độ theo cấp độ</Text>
        {Object.entries(STATISTICS.levelProgress).map(([level, data]) => {
          const levelPercentage = Math.round((data.learned / data.total) * 100);
          return (
            <View key={level} style={styles.levelCard}>
              <View style={styles.levelHeader}>
                <Text style={styles.levelName}>{level}</Text>
                <Text style={styles.levelProgress}>
                  {data.learned}/{data.total}
                </Text>
              </View>
              <View style={styles.levelBarContainer}>
                <View
                  style={[
                    styles.levelBar,
                    { width: `${levelPercentage}%` },
                  ]}
                />
              </View>
              <Text style={styles.levelPercent}>{levelPercentage}%</Text>
            </View>
          );
        })}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏅 Thành tựu</Text>
        {STATISTICS.achievements.map((achievement) => (
          <View
            key={achievement.id}
            style={[
              styles.achievementCard,
              !achievement.completed && styles.achievementLocked,
            ]}
          >
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
            </View>
            <View
              style={[
                styles.achievementStatus,
                achievement.completed
                  ? styles.achievementUnlocked
                  : styles.achievementLocked,
              ]}
            >
              <Text style={styles.achievementStatusText}>
                {achievement.completed ? '✓' : '🔒'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Spacer */}
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 6,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  levelCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  levelProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  levelBarContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  levelBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  levelPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
    textAlign: 'right',
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  achievementStatus: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementUnlocked: {
    backgroundColor: '#10b981',
  },
  achievementStatusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  spacer: {
    height: 20,
  },
});
