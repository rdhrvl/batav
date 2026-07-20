import { getMenuItems } from '@/lib/menu';
import MenuInteractive from './MenuInteractive';

export default async function MenuSection() {
  const items = await getMenuItems();

  return (
    <section id="menu" className="py-20 bg-background text-foreground border-t border-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-primary text-center">Our Menu</h2>
        <div className="max-w-6xl mx-auto">
          <MenuInteractive initialItems={items} />
        </div>
      </div>
    </section>
  );
}
