export const STATISTICS = {
  totalWords: 30,
  learnedWords: 18,
  quizCompleted: 8,
  longestStreak: 12,
  currentStreak: 5,
  totalLearningTime: '12h 45m',
  lastLearningDate: '6 tháng 12, 2025',
  levelProgress: {
    A1: {
      total: 8,
      learned: 6,
    },
    A2: {
      total: 8,
      learned: 5,
    },
    B1: {
      total: 9,
      learned: 5,
    },
    B2: {
      total: 5,
      learned: 2,
    },
  },
  achievements: [
    {
      id: '1',
      title: 'Bắt đầu học',
      description: 'Học từ vựng đầu tiên',
      icon: '🌟',
      completed: true,
    },
    {
      id: '2',
      title: 'Học 10 từ',
      description: 'Học thành công 10 từ',
      icon: '🔟',
      completed: true,
    },
    {
      id: '3',
      title: 'Streak 7 ngày',
      description: 'Học liên tiếp 7 ngày',
      icon: '🔥',
      completed: false,
    },
    {
      id: '4',
      title: 'Quiz Master',
      description: 'Hoàn thành 10 quiz',
      icon: '🎯',
      completed: false,
    },
  ],
};

export default STATISTICS;
