"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowLoader(false);
        setInitialLoad(false);
      }, 500); 
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showLoader && initialLoad && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-background" 
          >
            <LogoLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent && !isLoading ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}

function LogoLoader() {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ 
        scale: 10,
        opacity: 0,
        transition: {
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay: 1
        }
      }}
      className="origin-center"
    >
      <motion.svg
        width="196"
        height="160"
        viewBox="0 0 49 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M37.3947 40C43.8275 39.8689 49 34.6073 49 28.1389C49 24.9931 47.7512 21.9762 45.5282 19.7518L25.7895 0V12.2771C25.7895 14.3303 26.6046 16.2995 28.0556 17.7514L32.6795 22.3784L32.6921 22.3907L40.4452 30.149C40.697 30.4009 40.697 30.8094 40.4452 31.0613C40.1935 31.3133 39.7852 31.3133 39.5335 31.0613L36.861 28.3871H12.139L9.46655 31.0613C9.21476 31.3133 8.80654 31.3133 8.55476 31.0613C8.30297 30.8094 8.30297 30.4009 8.55475 30.149L16.3079 22.3907L16.3205 22.3784L20.9444 17.7514C22.3954 16.2995 23.2105 14.3303 23.2105 12.2771V0L3.47175 19.7518C1.24882 21.9762 0 24.9931 0 28.1389C0 34.6073 5.17252 39.8689 11.6053 40H37.3947Z"
          fill="#FF0A0A"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{
            pathLength: 1,
            fillOpacity: 1,
          }}
          transition={{
            pathLength: { duration: 1, ease: "easeInOut" },
            fillOpacity: { duration: 0.4, delay: 0.9 }
          }}
          style={{
            stroke: "#FF0A0A",
            strokeWidth: 0.5,
          }}
        />
      </motion.svg>
    </motion.div>
  );
}
