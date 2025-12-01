'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function RevealSuccess({
    assignment,
}: {
    assignment: {
        year: number;
        giverName: string;
        receiverName: string;
    };
}) {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <main className="flex items-center justify-center p-4 overflow-hidden">
            <div
                className="w-full max-w-md text-center"
                style={{ perspective: "1000px" }}
            >
                <AnimatePresence mode="wait">
                    {!isRevealed ? (
                        <motion.div
                            key="box"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 1.5, opacity: 0, rotate: 10, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                            className="cursor-pointer group flex flex-col items-center justify-center"
                            onClick={() => setIsRevealed(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="text-[150px] leading-none mb-8 filter drop-shadow-2xl select-none"
                                animate={{
                                    rotate: [0, -5, 5, -5, 5, 0],
                                    y: [0, -10, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                            >
                                🎁
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
                            >
                                <p className="text-xl font-medium animate-pulse">
                                    ¡Clic para revelar!
                                </p>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            transition={{
                                type: "spring",
                                bounce: 0.5,
                                duration: 0.8
                            }}
                            className="p-8 rounded-2xl shadow-2xl border bg-background/95 backdrop-blur-sm relative overflow-hidden"
                        >
                            {/* Confetti effect background (simplified) */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-red-500 to-transparent" />

                            <div className="mb-6 relative z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <span className="text-3xl">🎁</span>
                                </motion.div>
                                <h1 className="text-2xl font-bold mb-2">
                                    Hola, {assignment.giverName}!
                                </h1>
                                <p className="text-muted-foreground">
                                    Tu amigo secreto para este {assignment.year} es...
                                </p>
                            </div>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.6, type: "spring" }}
                                className="py-8 bg-green-50 rounded-xl border border-green-100"
                            >
                                <p className="text-3xl font-bold text-green-700">
                                    {assignment.receiverName}
                                </p>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="mt-4 text-sm text-left text-red-500"
                            >
                                ⚠️ Solo se mostrará una vez. ¡Sácale pantallazo!
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
