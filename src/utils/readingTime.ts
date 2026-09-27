import { Article } from '../data/pulsewireData';

export interface ReadingTimeAnalysis {
  bodyWordCount: number;
  findingsWordCount: number;
  leadWordCount: number;
  totalWordCount: number;
  paragraphCount: number;
  avgWordsPerParagraph: number;
  estimatedMinutes: number;
  bodyEstimatedMinutes: number;
  totalSeconds: number;
  formattedTime: string;
  formattedExact: string;
  wpm: number;
  audioEstimatedMinutes: number;
}

/**
 * Counts total words in a string, ignoring excess whitespace.
 */
export function countWords(text: string | null | undefined): number {
  if (!text) return 0;
  const cleaned = text.trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

/**
 * Analyzes article body content, key findings, and headline context
 * to calculate estimated reading time and word counts based on average reading speed.
 *
 * @param article The article object containing content paragraphs, title, subtitle, and key findings.
 * @param wpm Average reading speed in words per minute (standard average adult reading pace is 200-225 wpm).
 */
export function analyzeArticleReadingTime(
  article: Article | null,
  wpm: number = 200
): ReadingTimeAnalysis {
  if (!article) {
    return {
      bodyWordCount: 0,
      findingsWordCount: 0,
      leadWordCount: 0,
      totalWordCount: 0,
      paragraphCount: 0,
      avgWordsPerParagraph: 0,
      estimatedMinutes: 1,
      bodyEstimatedMinutes: 1,
      totalSeconds: 60,
      formattedTime: '1 min read',
      formattedExact: '1m 00s',
      wpm,
      audioEstimatedMinutes: 1
    };
  }

  // 1. Analyze the article body content specifically
  const bodyParagraphs = article.content || [];
  const paragraphCount = bodyParagraphs.length;
  let bodyWordCount = 0;
  bodyParagraphs.forEach((p) => {
    bodyWordCount += countWords(p);
  });

  const avgWordsPerParagraph = paragraphCount > 0 ? Math.round(bodyWordCount / paragraphCount) : 0;

  // 2. Analyze key findings
  const findings = article.keyFindings || [];
  let findingsWordCount = 0;
  findings.forEach((f) => {
    findingsWordCount += countWords(f);
  });

  // 3. Analyze lead context (title, subtitle, excerpt)
  const leadWordCount =
    countWords(article.title) +
    countWords(article.subtitle) +
    countWords(article.excerpt);

  // 4. Total readable corpus
  const totalWordCount = bodyWordCount + findingsWordCount + leadWordCount;

  // 5. Estimated reading time in minutes and seconds
  const totalMinutesFloat = totalWordCount / Math.max(1, wpm);
  const estimatedMinutes = Math.max(1, Math.ceil(totalMinutesFloat));

  const bodyMinutesFloat = bodyWordCount / Math.max(1, wpm);
  const bodyEstimatedMinutes = Math.max(1, Math.ceil(bodyMinutesFloat));

  const totalSeconds = Math.max(10, Math.round(totalMinutesFloat * 60));
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  const formattedExact =
    mins > 0 ? `${mins}m ${secs < 10 ? '0' : ''}${secs}s` : `${secs}s`;

  // Spoken audio reading time estimation (~140 wpm for natural speech narration)
  const audioEstimatedMinutes = Math.max(1, Math.ceil(totalWordCount / 140));

  return {
    bodyWordCount,
    findingsWordCount,
    leadWordCount,
    totalWordCount,
    paragraphCount,
    avgWordsPerParagraph,
    estimatedMinutes,
    bodyEstimatedMinutes,
    totalSeconds,
    formattedTime: `${estimatedMinutes} min read`,
    formattedExact,
    wpm,
    audioEstimatedMinutes
  };
}

/**
 * Quick helper to calculate and format reading time for an article directly.
 */
export function getEstimatedReadingTime(article: Article | null, wpm: number = 200): string {
  if (!article) return '1 min read';
  const analysis = analyzeArticleReadingTime(article, wpm);
  return analysis.formattedTime;
}

/**
 * Calculates remaining reading minutes based on scroll progress percentage.
 */
export function calculateRemainingReadingTime(
  estimatedMinutes: number,
  scrollProgressPercentage: number
): number {
  if (estimatedMinutes <= 0) return 1;
  const progressRatio = Math.min(1, Math.max(0, scrollProgressPercentage / 100));
  const remaining = Math.ceil(estimatedMinutes * (1 - progressRatio));
  return Math.max(0, remaining);
}
