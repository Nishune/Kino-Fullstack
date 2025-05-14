export default function AboutCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-neutral-800 p-8 rounded-lg border-[1px] border-neutral-600 mb-8">
      <h3 className="text-xl underline mb-3">{title}</h3>
      <p className="text-neutral-400 text-lg">{description}</p>
    </div>
  );
}
