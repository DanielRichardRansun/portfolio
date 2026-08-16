"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState, useEffect } from "react";
import "./Stack.css"; // Pastikan path css ini benar

// --- KOMPONEN KARTU INDIVIDUAL ---
function CardRotate({
  children,
  onSendToBack,
  sensitivity,
}: {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mengubah gerakan X/Y menjadi Rotasi agar terasa 3D
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: any, info: PanInfo) {
    // Jika ditarik cukup jauh (melebihi sensitivity), pindahkan ke belakang
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      // Jika tidak, kembalikan ke tengah
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

// --- KOMPONEN UTAMA STACK ---
export default function Stack({
  cards = [],
  sensitivity = 100, // Jarak tarik pixel sebelum kartu pindah
}: {
  cards: React.ReactNode[];
  sensitivity?: number;
}) {
  const [stack, setStack] = useState<
    { id: number; content: React.ReactNode }[]
  >([]);

  // Inisialisasi kartu saat komponen dimuat
  useEffect(() => {
    setStack(cards.map((content, index) => ({ id: index, content })));
  }, [cards]);

  const sendToBack = (id: number) => {
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      // Ambil kartu yang ditarik
      const [card] = newStack.splice(index, 1);
      // Masukkan ke urutan paling awal (belakang tumpukan visual)
      newStack.unshift(card);
      return newStack;
    });
  };

  return (
    <div className="stack-container">
      {stack.map((card, index) => {
        // Semakin besar index (paling akhir di array), semakin di depan secara visual (Z-Index)
        const isTop = index === stack.length - 1;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="card"
              animate={{
                zIndex: index,
                scale: 1 + index * 0.05 - stack.length * 0.05,

                rotateZ: (stack.length - index - 1) * 2,

                transformOrigin: "90% 90%",

                x: (stack.length - index - 1) * 2,
                y: (stack.length - index - 1) * -6,
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
