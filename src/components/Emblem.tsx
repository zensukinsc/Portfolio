import { motion } from 'framer-motion';
export function Emblem({
  className = 'w-64 h-64',
  inView = true



}: {className?: string;inView?: boolean;}) {
  // Animation variants
  const drawLine = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: custom,
          type: 'spring',
          duration: 2,
          bounce: 0
        },
        opacity: {
          delay: custom,
          duration: 0.1
        }
      }
    })
  };
  const fadeScale = {
    hidden: {
      opacity: 0,
      scale: 0.5
    },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: custom,
        duration: 0.8,
        ease: 'easeOut'
      }
    })
  };
  const fadeIn = {
    hidden: {
      opacity: 0
    },
    visible: (custom: number) => ({
      opacity: 1,
      transition: {
        delay: custom,
        duration: 1
      }
    })
  };
  // Only animate if inView is true (useful for scroll-triggered animations)
  const animateState = inView ? 'visible' : 'hidden';
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full text-white overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round">
        
        {/* Outer Boundary Circle */}
        <motion.circle
          cx="250"
          cy="250"
          r="240"
          strokeWidth="1.5"
          strokeDasharray="1 6"
          variants={drawLine}
          custom={0.3}
          initial="hidden"
          animate={animateState} />
        

        {/* Rotating Orbital Rings Group */}
        <motion.g
          initial={{
            rotate: 0
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            originX: '250px',
            originY: '250px'
          }}>
          
          {/* Ring 1 (Inner) */}
          <motion.circle
            cx="250"
            cy="250"
            r="90"
            strokeWidth="0.8"
            strokeDasharray="1 8"
            variants={drawLine}
            custom={0.5}
            initial="hidden"
            animate={animateState} />
          
          {/* Ring 2 */}
          <motion.circle
            cx="250"
            cy="250"
            r="140"
            strokeWidth="0.8"
            strokeDasharray="1 8"
            variants={drawLine}
            custom={0.7}
            initial="hidden"
            animate={animateState} />
          
          {/* Ring 3 */}
          <motion.circle
            cx="250"
            cy="250"
            r="190"
            strokeWidth="0.8"
            strokeDasharray="1 8"
            variants={drawLine}
            custom={0.9}
            initial="hidden"
            animate={animateState} />
          
          {/* Ring 4 (Outer) */}
          <motion.circle
            cx="250"
            cy="250"
            r="230"
            strokeWidth="0.8"
            strokeDasharray="1 8"
            variants={drawLine}
            custom={1.1}
            initial="hidden"
            animate={animateState} />
          

          {/* Planets on Rings */}
          <motion.g
            variants={fadeScale}
            custom={1.2}
            initial="hidden"
            animate={animateState}>
            
            {/* Left large banded planet (on ring 3) */}
            <g transform="translate(60, 250)">
              <circle
                cx="0"
                cy="0"
                r="18"
                strokeWidth="1"
                strokeDasharray="1 3"
                fill="#0a0a0a" />
              
              <path
                d="M-16 -5 Q 0 -8 16 -5 M-18 0 L 18 0 M-16 5 Q 0 8 16 5"
                strokeWidth="0.5"
                strokeDasharray="1 2" />
              
            </g>
          </motion.g>

          <motion.g
            variants={fadeScale}
            custom={1.4}
            initial="hidden"
            animate={animateState}>
            
            {/* Top right Saturn-like (on ring 2) */}
            <g transform="translate(350, 150) rotate(-20)">
              <circle
                cx="0"
                cy="0"
                r="12"
                strokeWidth="1"
                strokeDasharray="1 3"
                fill="#0a0a0a" />
              
              <ellipse
                cx="0"
                cy="0"
                rx="22"
                ry="5"
                strokeWidth="1"
                strokeDasharray="1 2"
                fill="none" />
              
              <path
                d="M-12 0 A 12 12 0 0 0 12 0"
                strokeWidth="1"
                fill="#0a0a0a" />
              {' '}
              {/* Hide back of ring */}
              <ellipse
                cx="0"
                cy="0"
                rx="22"
                ry="5"
                strokeWidth="1"
                strokeDasharray="1 2"
                fill="none"
                strokeDashoffset="10" />
              {' '}
              {/* Front of ring */}
            </g>
          </motion.g>

          <motion.g
            variants={fadeScale}
            custom={1.8}
            initial="hidden"
            animate={animateState}>
            
            {/* Top small moon (on ring 1) */}
            <circle
              cx="250"
              cy="160"
              r="4"
              strokeWidth="1"
              strokeDasharray="1 2"
              fill="#0a0a0a" />
            
          </motion.g>

          <motion.g
            variants={fadeScale}
            custom={2.0}
            initial="hidden"
            animate={animateState}>
            
            {/* Right medium planet (on ring 4) */}
            <g transform="translate(470, 210)">
              <circle
                cx="0"
                cy="0"
                r="14"
                strokeWidth="1"
                strokeDasharray="1 3"
                fill="#0a0a0a" />
              
              <path
                d="M-10 -8 Q -5 0 -12 8 M 5 -12 Q 0 0 10 10 M -4 -13 Q 5 -5 -2 13"
                strokeWidth="0.5"
                strokeDasharray="1 2" />
              
            </g>
          </motion.g>

          <motion.g
            variants={fadeScale}
            custom={2.05}
            initial="hidden"
            animate={animateState}>
            {/* Extra planet (ring 1) */}
            <circle
              cx="340"
              cy="250"
              r="5"
              strokeWidth="1"
              strokeDasharray="1 2"
              fill="#0a0a0a" />
          </motion.g>

          <motion.g
            variants={fadeScale}
            custom={2.1}
            initial="hidden"
            animate={animateState}>
            {/* Extra planet (ring 2) */}
            <g transform="translate(250, 390)">
              <circle
                cx="0"
                cy="0"
                r="8"
                strokeWidth="1"
                strokeDasharray="1 2"
                fill="#0a0a0a" />
              <circle cx="-2.5" cy="-2" r="1.2" strokeWidth="0.5" strokeDasharray="1 1" />
            </g>
          </motion.g>

          <motion.g
            variants={fadeScale}
            custom={2.15}
            initial="hidden"
            animate={animateState}>
            {/* Extra planet (ring 3) */}
            <g transform="translate(190, 70)">
              <circle
                cx="0"
                cy="0"
                r="9"
                strokeWidth="1"
                strokeDasharray="1 2"
                fill="#0a0a0a" />
              <path d="M-7 -2 Q 0 -5 7 -2 M-7 2 Q 0 5 7 2" strokeWidth="0.5" strokeDasharray="1 2" />
            </g>
          </motion.g>

          <motion.g
            variants={fadeScale}
            custom={2.2}
            initial="hidden"
            animate={animateState}>
            {/* Extra planet (ring 4) */}
            <circle
              cx="250"
              cy="480"
              r="10"
              strokeWidth="1"
              strokeDasharray="1 2"
              fill="#0a0a0a" />
          </motion.g>

          {/* Tiny stars/dots */}
          <motion.g
            variants={fadeIn}
            custom={2.3}
            initial="hidden"
            animate={animateState}
            fill="white"
            stroke="none">
            
            <circle cx="120" cy="180" r="1.5" />
            <circle cx="380" cy="80" r="1" />
            <circle cx="300" cy="120" r="2" />
            <circle cx="200" cy="140" r="1" />
            <circle cx="420" cy="280" r="1.5" />
            <circle cx="90" cy="320" r="1" />
          </motion.g>
        </motion.g>

        {/* Static Landscape Group (Bottom Half) */}
        {/* Clip path to keep landscape inside the circle */}
        <defs>
          <clipPath id="circle-clip">
            <circle cx="250" cy="250" r="240" />
          </clipPath>
        </defs>

        <g clipPath="url(#circle-clip)">
          {/* Main Mountain Silhouette (fills lower half) */}
          <motion.path
            d="M 38 362 L 105 336 L 145 316 L 205 274 L 250 235 L 296 276 L 355 318 L 395 336 L 462 362 L 520 520 L -20 520 Z"
            fill="#0a0a0a"
            stroke="none"
            variants={fadeIn}
            custom={1.0}
            initial="hidden"
            animate={animateState} />
          

          {/* New mountain linework */}
          <motion.path
            d="M 38 362 L 105 336 L 145 316 L 205 274 L 250 235 L 296 276 L 355 318 L 395 336 L 462 362"
            strokeWidth="1.3"
            variants={drawLine}
            custom={1.1}
            initial="hidden"
            animate={animateState} />

          <motion.path
            d="M 250 235 L 232 264 L 244 257 L 256 270 L 269 259 L 250 235 Z"
            fill="white"
            stroke="none"
            variants={fadeIn}
            custom={1.35}
            initial="hidden"
            animate={animateState} />
        </g>
      </svg>

      {/* Center Text */}
      <motion.div
        className="absolute z-10 font-serif text-3xl font-bold tracking-wide text-white drop-shadow-lg"
        style={{
          top: 'calc(64% + 40px)',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        variants={fadeIn}
        custom={2.3}
        initial="hidden"
        animate={animateState}>
        
        Zensuki
      </motion.div>
    </div>);

}