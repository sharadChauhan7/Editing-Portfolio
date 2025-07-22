// components/FloatingParticles.js
import React, { useMemo } from 'react';

const FloatingParticles = ({ count = 20 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${3 + Math.random() * 5}s`,
      delay: `${Math.random() * 2}s`,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute w-full h-full overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full blur-sm animate-float"
            style={{
              top: p.top,
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(FloatingParticles);
