import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Zap, Activity, Cpu, Skull, Rocket, Star } from 'lucide-react'

const Pillars = () => {
  return (
    <div>      <section className="py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-10 bg-black text-white relative overflow-hidden">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#e72132 2px, transparent 2px), linear-gradient(90deg, #e72132 2px, transparent 2px)',
              backgroundSize: '60px 60px'
            }}/>
          </div>

          {/* Floating Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-[15%] w-40 h-40 bg-[#f9bb1a]/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-40 left-[10%] w-60 h-60 bg-[#1da89d]/20 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="mb-16 sm:mb-24 text-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-none mb-8 border-4 border-black shadow-[6px_6px_0px_0px_#e72132]"
              >
                <Trophy className="w-6 h-6 text-[#f9bb1a] fill-[#f9bb1a]" />
                <span className="text-sm font-black uppercase tracking-wider text-black">Foundation Built Different</span>
                <Trophy className="w-6 h-6 text-[#f9bb1a] fill-[#f9bb1a]" />
              </motion.div>
              
              {/* Main Title - Stacked */}
              <div className="space-y-2 mb-8">
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <h2 className="text-[18vw] sm:text-[14vw] md:text-[12vw] font-[950] leading-[0.75] uppercase -tracking-[0.08em] text-white">
                    THE
                  </h2>
                </motion.div>
                
                <motion.div 
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <h2 className="text-[18vw] sm:text-[14vw] md:text-[12vw] font-[950] leading-[0.75] uppercase -tracking-[0.08em] text-[#e72132]">
                    SIX
                  </h2>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="overflow-hidden"
                >
                  <h2 className="text-[18vw] sm:text-[14vw] md:text-[12vw] font-[950] leading-[0.75] uppercase -tracking-[0.08em] text-[#f9bb1a]">
                    PILLARS
                  </h2>
                </motion.div>
              </div>

              {/* Subtitle */}
              <motion.p 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
  viewport={{ once: true }}
  /* Changed "font-black" to "font-normal" */
  className="text-lg sm:text-xl md:text-2xl font-normal text-gray-400 max-w-3xl mx-auto uppercase tracking-wide"
>
  <span className="text-white">What holds us up when the world tries to tear us down.</span>
  <br className="hidden sm:block"/>
  <span className="text-[#1da89d]">Each pillar, a promise. Each promise, unbreakable.</span>
</motion.p>
            </motion.div>

            {/* Pillars Layout - 3x2 Grid with Visual Pillar Design */}
            <div className="relative">
              {/* Top "Roof" Element */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
                className="hidden lg:block absolute -top-12 left-0 right-0 h-8 bg-white border-4 border-black shadow-[0_8px_0px_0px_#e72132] z-20"
              >
                <motion.div 
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2"
                >
                  <Star className="w-12 h-12 fill-[#f9bb1a] text-black" strokeWidth={3} />
                </motion.div>
              </motion.div>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative">
                {[
                  { 
                    number: "01",
                    icon: <Zap size={48} />,
                    title: 'Operations',
                    subtitle: 'Speed That Shocks',
                    desc: 'Master execution — streamline processes,manage people, and scale your businessefficiently.',
                    color: '#f9bb1a',
                    accentColor: '#000'
                  },
                  { 
                    number: "02",
                    icon: <Activity size={48} />,
                    title: 'Technology',
                    subtitle: 'Never Stops, Never Quits',
                    desc: 'Understand how tech drives innovationand learn to leverage tools, automation,and AI to build smarter businesses..',
                    color: '#ef6925',
                    accentColor: '#fff'
                  },
                  { 
                    number: "03",
                    icon: <Cpu size={48} />,
                    title: 'Finance',
                    subtitle: 'Scale Without Limits',
                    desc: 'Get control of your numbers, budgeting,funding, investor pitches, and financialsustainability simplified for non-financefounders.',
                    color: '#1da89d',
                    accentColor: '#000'
                  },
                  { 
                    number: "04",
                    icon: <Skull size={48} />,
                    title: 'AUTHENTIC',
                    subtitle: 'Real Recognizes Real',
                    desc: 'No fake vibes. No cap. No BS. Just raw, unfiltered truth and execution.',
                    color: '#e72132',
                    accentColor: '#fff'
                  },
                  { 
                    number: "05",
                    icon: <Trophy size={48} />,
                    title: 'R&D RESEARCH &DEVELOPMENT',
                    subtitle: 'Only First Place Matters',
                    desc: 'Innovate continuously. Learn to adapt,test, and evolve your product to sta',
                    color: '#a5cb3a',
                    accentColor: '#000'
                  },
                  { 
                    number: "06",
                    icon: <Rocket size={48} />,
                    title: 'SALES',
                    subtitle: 'Always Moving Forward',
                    desc: 'Turn value into revenue learn customerconversion, negotiation, and scalingtechniques that close deals faster.',
                    color: '#43646b',
                    accentColor: '#fff'
                  }
                ].map((pillar, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: idx * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="relative group"
                  >
                    {/* Pillar Structure */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      {/* Pillar Top Capital */}
                      <div 
                        className="h-6 sm:h-8 border-4 border-black mb-2"
                        style={{ backgroundColor: pillar.color }}
                      >
                        <motion.div
                          animate={{ scaleX: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      </div>

                      {/* Main Pillar Body */}
                      <div 
                        className="min-h-[400px] sm:min-h-[450px] border-4 border-black p-6 sm:p-8 relative overflow-hidden"
                        style={{ backgroundColor: pillar.color }}
                      >
                        {/* Vertical Grooves - Pillar Effect */}
                        <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0.1, 0.3, 0.1] }}
                              transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                              className="w-1 h-full bg-black"
                            />
                          ))}
                        </div>

                        {/* Pillar Number Badge */}
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-black border-4 border-white flex items-center justify-center z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                        >
                          <span className="text-2xl sm:text-3xl font-[950] text-white">{pillar.number}</span>
                        </motion.div>

                        {/* Hover Glow Effect */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20 pointer-events-none"
                        />

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon with Circular BG */}
                          <motion.div
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6 inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)]"
                          >
                            <motion.div
                              animate={{ 
                                y: [0, -5, 0],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              style={{ color: pillar.color }}
                            >
                              {pillar.icon}
                            </motion.div>
                          </motion.div>

                          {/* Title */}
                          <motion.h3 
                            className="text-4xl sm:text-5xl font-[950] mb-2 uppercase -tracking-[0.05em] leading-none"
                            style={{ color: pillar.accentColor }}
                          >
                            {pillar.title}
                          </motion.h3>

                          {/* Subtitle */}
                          <motion.p 
                            className="text-lg sm:text-xl font-black uppercase mb-6 opacity-80"
                            style={{ color: pillar.accentColor }}
                          >
                            {pillar.subtitle}
                          </motion.p>

                          {/* Divider Line */}
                          <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ delay: idx * 0.15 + 0.5 }}
                            className="h-1 w-20 bg-black mb-6 origin-left"
                          />

                          {/* Description */}
                          <motion.p 
                            className="text-sm sm:text-base font-bold leading-relaxed"
                            style={{ color: pillar.accentColor === '#fff' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)' }}
                          >
                            {pillar.desc}
                          </motion.p>

                          {/* Bottom Accent */}
                          <motion.div
                            animate={{ 
                              scaleX: [1, 1.1, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute bottom-6 left-6 right-6 h-2 bg-black/20"
                          />
                        </div>

                        {/* Pillar Cracks/Details */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none opacity-10">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute bottom-0 bg-black"
                              style={{
                                left: `${20 + i * 30}%`,
                                width: '2px',
                                height: `${40 + i * 15}px`,
                                transform: `rotate(${-5 + i * 5}deg)`
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Pillar Base */}
                      <div 
                        className="h-4 sm:h-6 border-4 border-black mt-2 relative overflow-hidden"
                        style={{ backgroundColor: pillar.color }}
                      >
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </div>

                      {/* Shadow underneath */}
                      <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/40 blur-sm -z-10"/>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom "Foundation" Element */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                viewport={{ once: true }}
                className="hidden lg:block absolute -bottom-8 left-0 right-0 h-12 bg-black border-4 border-white z-20"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-white font-black text-xl uppercase tracking-widest"
                  >
                    UNSHAKEABLE FOUNDATION
                  </motion.span>
                </div>
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="mt-20 sm:mt-28 text-center"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(231,33,50,0.5)",
                  rotate: 2
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 sm:px-12 md:px-16 py-5 sm:py-6 md:py-8 bg-white text-black font-[950] text-xl sm:text-2xl md:text-3xl uppercase -tracking-[0.03em] border-4 border-black shadow-[10px_10px_0px_0px_#e72132] hover:shadow-[15px_15px_0px_0px_#e72132] transition-all overflow-hidden"
              >
                <motion.span className="relative z-10 flex items-center gap-3 sm:gap-4">
                  <Trophy className="w-7 h-7 sm:w-8 sm:h-8 fill-[#f9bb1a]" />
                  STAND ON THESE PILLARS
                  <Trophy className="w-7 h-7 sm:w-8 sm:h-8 fill-[#f9bb1a]" />
                </motion.span>
                
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-[#e72132]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6 text-gray-400 font-bold text-sm sm:text-base uppercase tracking-wide"
              >
                Built to last. Designed to dominate. Ready to rise.
              </motion.p>
            </motion.div>
          </div>
        </section></div>
  )
}

export default Pillars