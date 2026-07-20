import { Wifi, Coffee, BatteryCharging, Wind, Music, Users } from 'lucide-react';

const FACILITIES = [
  { icon: Wifi, label: 'Fast Wi-Fi', desc: 'Up to 100 Mbps' },
  { icon: BatteryCharging, label: 'Power Outlets', desc: 'Available at every seat' },
  { icon: Coffee, label: 'Specialty Coffee', desc: 'Locally roasted beans' },
  { icon: Wind, label: 'AC Indoor', desc: 'Cool & comfortable' },
  { icon: Music, label: 'Cozy Playlist', desc: 'Curated ambient music' },
  { icon: Users, label: 'Meeting Space', desc: 'Perfect for groups' },
];

export default function Facilities() {
  return (
    <section id="facilities" className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Fasilitas Terbaik</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Kami memastikan kenyamananmu, baik untuk nongkrong santai maupun bekerja produktif.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {FACILITIES.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                  <Icon className="w-8 h-8 text-accent group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-lg text-primary">{facility.label}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
