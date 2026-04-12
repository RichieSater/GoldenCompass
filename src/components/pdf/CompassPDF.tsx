import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { COMPASS_FLOW, getAllScreens } from "@/lib/compass-flow";
import {
  getScreenListItems,
  serializeListItems,
} from "@/lib/list-answer-utils";
import type { CompassAnswers } from "@/types/compass";

// Register fonts - using standard PDF fonts as fallback
Font.register({
  family: "Serif",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtY.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd5unDXbtY.ttf",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Sans",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiA.ttf",
      fontWeight: 600,
    },
  ],
});

const colors = {
  deepBlack: "#0A0A0A",
  charcoal: "#1A1A1A",
  gold: "#C9A84C",
  cream: "#F5F5F0",
  creamMuted: "#B8B8B0",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.deepBlack,
    padding: 50,
    fontFamily: "Sans",
  },
  coverPage: {
    backgroundColor: colors.deepBlack,
    padding: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  coverTitle: {
    fontFamily: "Serif",
    fontSize: 36,
    color: colors.gold,
    letterSpacing: 4,
    marginBottom: 8,
  },
  coverSubtitle: {
    fontFamily: "Serif",
    fontSize: 14,
    color: colors.creamMuted,
    letterSpacing: 2,
    marginBottom: 40,
  },
  coverName: {
    fontFamily: "Serif",
    fontSize: 20,
    color: colors.cream,
    marginBottom: 8,
  },
  coverDate: {
    fontSize: 11,
    color: colors.creamMuted,
  },
  divider: {
    width: 60,
    height: 1,
    backgroundColor: colors.gold,
    marginVertical: 20,
    opacity: 0.5,
  },
  sectionHeader: {
    fontFamily: "Serif",
    fontSize: 24,
    color: colors.gold,
    marginBottom: 6,
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontFamily: "Serif",
    fontSize: 11,
    color: colors.creamMuted,
    fontStyle: "italic",
    marginBottom: 30,
  },
  questionBlock: {
    marginBottom: 18,
  },
  questionLabel: {
    fontSize: 9,
    color: colors.gold,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
    fontWeight: 600,
  },
  answerText: {
    fontSize: 11,
    color: colors.cream,
    lineHeight: 1.6,
  },
  answerBox: {
    backgroundColor: colors.charcoal,
    borderRadius: 4,
    padding: 12,
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 8,
    color: colors.creamMuted,
    opacity: 0.5,
  },
});

interface CompassPDFProps {
  userName: string;
  completedDate: string;
  answers: CompassAnswers;
}

export default function CompassPDF({
  userName,
  completedDate,
  answers,
}: CompassPDFProps) {
  const allScreens = getAllScreens();
  const screensById = new Map(allScreens.map((screen) => [screen.id, screen]));

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverTitle}>THE GOLDEN COMPASS</Text>
        <Text style={styles.coverSubtitle}>YOUR BEST YEAR EVER</Text>
        <View style={styles.divider} />
        <Text style={styles.coverName}>{userName}</Text>
        <Text style={styles.coverDate}>{completedDate}</Text>
      </Page>

      {/* Content Pages - one per section */}
      {COMPASS_FLOW.map((section) => {
        const sectionScreens = allScreens.filter(
          (s) => s.sectionKey === section.key
        );

        // Gather all Q&A pairs for this section
        const qaPairs: { question: string; answer: string }[] = [];

        for (const screen of sectionScreens) {
          let screenAnswers = answers[screen.id];

          if (!screenAnswers && screen.prefillFrom) {
            const sourceScreen = screensById.get(screen.prefillFrom);
            const sourceAnswers = answers[screen.prefillFrom];
            if (sourceScreen && sourceAnswers) {
              const items = getScreenListItems(sourceScreen, sourceAnswers);
              if (items.length > 0) {
                screenAnswers =
                  screen.type === "multi-input"
                    ? { items: serializeListItems(items) }
                    : { main: items.join("\n") };
              }
            }
          }

          if (!screenAnswers) continue;

          const question =
            screen.questionText || screen.headline || screen.id;

          if (
            screen.type === "textarea" ||
            screen.type === "short-text"
          ) {
            const val = screenAnswers.main;
            if (val) qaPairs.push({ question, answer: val });
          } else if (
            screen.type === "multi-short-text" ||
            screen.type === "multi-textarea"
          ) {
            const parts = (screen.inputs || [])
              .map((input) => {
                const val = screenAnswers[input.key];
                return val
                  ? `${input.label || input.key}: ${val}`
                  : null;
              })
              .filter(Boolean);
            if (parts.length > 0) {
              qaPairs.push({ question, answer: parts.join("\n") });
            }
          } else if (screen.type === "multi-input") {
            const items = getScreenListItems(screen, screenAnswers);
            if (items.length > 0) {
              qaPairs.push({
                question,
                answer: items
                  .map((item, i) => `${i + 1}. ${item}`)
                  .join("\n"),
              });
            }
          } else if (screen.type === "signature") {
            const name = screenAnswers.name;
            const date = screenAnswers.date;
            if (name) {
              qaPairs.push({
                question,
                answer: `Signed by: ${name}${date ? ` on ${date}` : ""}`,
              });
            }
          }
        }

        if (qaPairs.length === 0) return null;

        return (
          <Page key={section.key} size="A4" style={styles.page}>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>

            {qaPairs.map((qa, i) => (
              <View key={i} style={styles.questionBlock}>
                <Text style={styles.questionLabel}>{qa.question}</Text>
                <View style={styles.answerBox}>
                  <Text style={styles.answerText}>{qa.answer}</Text>
                </View>
              </View>
            ))}

            <View style={styles.footer}>
              <Text style={styles.footerText}>The Golden Compass</Text>
              <Text style={styles.footerText}>{section.title}</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
}
