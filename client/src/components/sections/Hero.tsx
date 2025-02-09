import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { fadeIn, slideIn } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      <div 
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 pt-20">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={slideIn}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={fadeIn}
          >
            Creating Digital Excellence
            <span className="text-primary"> with Indian Artistry</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            variants={fadeIn}
          >
            UI/UX Designer & Frontend Developer crafting beautiful, functional experiences
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeIn}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </motion.div>
    </section>
  );
}
