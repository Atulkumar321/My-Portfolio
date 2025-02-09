import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { fadeIn, staggerContainer } from "@/lib/animations";

const skills = [
  "UI/UX Design",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Figma",
  "User Research",
  "Prototyping"
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            About Me
          </motion.h2>

          <motion.div
            variants={fadeIn}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <Card>
                <CardContent className="p-6">
                  <img 
                    src="https://images.unsplash.com/photo-1523726491678-bf852e717f6a"
                    alt="Profile"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                I'm a passionate designer and developer with a unique perspective that
                blends modern design principles with traditional Indian aesthetics.
                With over 5 years of experience, I create digital experiences that
                are both beautiful and functional.
              </p>

              <div>
                <h3 className="text-xl font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
