import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Word } from "@/lib/wordle-types";

export const GameOverScreen = ({
  targetWord,
  resetGame,
}: {
  targetWord: Word | null;
  resetGame: () => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-sm"
        >
          <Card className="border border-slate-200/20 bg-white/90 backdrop-blur-md shadow-xl">
            <CardContent className="p-8 text-center space-y-6">
              {/* Target Word */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  The word was
                </div>
                <div className="font-mono text-4xl md:text-5xl font-bold text-slate-900 tracking-widest">
                  {targetWord?.word}
                </div>
              </motion.div>

              {/* Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-4"
              >
                Game Over
              </motion.div>

              {/* Word Description (placeholder) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-600 text-sm text-left leading-relaxed px-4 py-4 bg-slate-50 rounded-lg border border-slate-200 max-w-md mx-auto"
              >
                <p className="font-bold">Did you know?</p>
                <span className="w-full">{targetWord?.description}</span>
              </motion.div>

              {/* Reset Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={resetGame}
                  className="w-full h-12 text-base font-medium bg-slate-900 hover:bg-slate-800 text-white border border-slate-800/50 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Play className="w-4 h-4 mr-2" />
                  New Game
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
