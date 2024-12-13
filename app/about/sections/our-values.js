const items = [
  {
    id: 1,
    title: "Customer delight",
    description: "Provide more than what customer expects",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Customer-feedback-amico-e1676913686472.png",
  },
  {
    id: 2,
    title: "Quality",
    description: "Whatever we do, we do it well",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Product-quality-pana-e1676907784256.png",
  },
  {
    id: 3,
    title: "Passion",
    description: "Commitment and love for our work",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Passionate-rafiki-e1676913559640.png",
  },
  {
    id: 4,
    title: "Integrity",
    description: "Do the right thing",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Software-integration-rafiki-e1676907629791.png",
  },
  {
    id: 5,
    title: "Growth mindset",
    description: "Think and act like an entrepreneur",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Holding-the-arrow-rafiki-e1676907319618.png",
  },
  {
    id: 6,
    title: "Teaming",
    description: "Collaborate and help each other",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Strategic-consulting-bro-e1676906974399.png",
  },
];

export default function OurValuesSection() {
  return (
    <section className="p-10 bg-gray-100">
      <div className="max-w-screen-lg mx-auto space-y-4">
        <h1 className="text-center text-4xl font-bold text-app">Our Values</h1>
      </div>
    </section>
  );
}
